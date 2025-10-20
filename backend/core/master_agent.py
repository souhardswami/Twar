import json
import logging
import time
from typing import Dict, Any, Tuple, Optional

from ollama import chat  

class MasterAgent:
    def __init__( self, goal, operations, tools):
        self.goal = goal
        self.operations = operations
        self.tools = tools
        self.model = "llama3.2:1b"
        self.memory= {}
        self.sleep_between_retries = 1
        self.json_retries = 1
        
    def _safe_memory_snapshot(self, max_chars: int = 2000):
    
        try:
            mem_str = json.dumps(self.memory, default=str, indent=2)
        except Exception:
            mem_str = str(self.memory)
        if len(mem_str) > max_chars:
            return mem_str[: max_chars - 200] + "\n...truncated..."
        return mem_str

    def _build_prompt(self):
        
        tool_list = "\n".join([f"- {k}: {v}" for k, v in self.operations.items()])
        memory_snapshot = self._safe_memory_snapshot()

        prompt = f"""
                You are an autonomous executive agent whose goal is:
                {self.goal}

                Available tools (name: description):
                {tool_list}

                Current memory (may be empty):
                {memory_snapshot}

                Instructions:
                1) Choose ONE tool from the available tools that best advances the goal given the current memory.
                2) Provide the required input for the tool as a single string or JSON object.
                3) Respond ONLY with a JSON object and NOTHING else. Format:

                {{ "action": "<tool_name>", "input": <string-or-json> }}

                Examples (valid JSON):
                {{ "action": "Hashtag", "input": "#AI,#ML" }}
                {{ "action": "Strategy Agent", "input": {{ "company": "Acme Inc", "tone": "friendly" }} }}
                {{ "action": "END", "input": "" }}

                If you think the workflow should stop, return action = "END".

                Be concise and deterministic.
                """
        return prompt.strip()

    def _call_llm(self, prompt):
        resp = chat(model=self.model, messages=[{"role": "user", "content": prompt}])
        content = resp["message"]["content"]
        return content.strip()

    def _parse_json_response(self, content):
        # Attempt direct parse
        try:
            return json.loads(content)
        except json.JSONDecodeError:
            # Try to extract a JSON block inside text
            start = content.find("{")
            end = content.rfind("}")
            if start != -1 and end != -1 and end > start:
                snippet = content[start : end + 1]
                try:
                    return json.loads(snippet)
                except json.JSONDecodeError:
                    return None
            return None

    def think(self):
        prompt = self._build_prompt()
        last_exception = None

        for attempt in range(self.json_retries + 1):
            print(f"LLM thinking (attempt {attempt + 1}..." )
            raw = self._call_llm(prompt)
            print(f"LLM raw response:\n {raw}")
            parsed = self._parse_json_response(raw)
            print(parsed)
            if parsed and "action" in parsed and "input" in parsed:
                # Normalize action
                parsed["action"] = str(parsed["action"]).strip()
                return parsed
            last_exception = RuntimeError("LLM returned non-JSON or missing keys")
            print("Could not parse LLM output as valid plan. Retrying...")
            time.sleep(self.sleep_between_retries)

        # If we get here, parsing failed
        raise ValueError("Failed to parse LLM plan after retries") from last_exception

    def reflect(self):
        mem = self._safe_memory_snapshot(1200)
        prompt = f"Summarize in 1-2 sentences what has been done so far and the current next-best-step.\nMemory:\n{mem}"
        try:
            resp = self._call_llm(prompt)
            self.memory["reflection"] = resp
            print("Reflection saved.")
            return resp
        except Exception as e:
            print("Reflection failed: %s", e)
            return ""

    # ---------- Main run loop ----------
    def run(self, verbose: bool = True):
        print(f"Starting MasterAgent run. Goal: {self.goal}")
        steps = 0

        while steps < 10:
            steps += 1
            try:
                plan = self.think()
            except Exception as exc:
                print("Thinking failed: %s", exc)
                break

            action = plan.get("action")
            action_upper = str(action).strip().upper()
            input_data = plan.get("input")

            print(f"Step {steps} - Action: {action} ; Input: {input_data}")

            if action_upper == "END":
                print("Received END action. Workflow completed.")
                break

            tool = self.tools.get(action)
            if not tool:
                print(f"Tool {action} not found. Aborting.")
                break

            try:
                result = tool.run(input_data, self.memory)
                print(f"Tool {action} completed. Result type: {type(result).__name__}" )
            except Exception as e:
                print(f"Tool '{action}' raised exception: {e}")
                # store failure marker and continue or break depending on desired policy
                self.memory[f"{action}_error"] = str(e)
                break

            # update memory with result (store under tool name)
            try:
                # If result is JSON-serializable, store it; else store string repr
                json.dumps(result)  # quick check
                self.memory[action] = result
            except Exception:
                self.memory[action] = str(result)

            # optional reflection each few steps
            if steps % 3 == 0:
                try:
                    reflection = self.reflect()
                    print(f"Reflection: {reflection}")
                except Exception:
                    pass

        else:
            print(f"Max steps {self.max_steps} reached. Stopping." )

        print(f"Run finished. Memory keys: {list(self.memory.keys())}" )
        return self.memory
