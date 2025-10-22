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
        self.max_steps = 10
        
    def _safe_memory_snapshot(self, max_chars: int = 2000):
    
        try:
            mem_str = json.dumps(self.memory, default=str, indent=2)
        except Exception:
            mem_str = str(self.memory)
        
        return mem_str

    def _build_prompt(self):
        
        tool_list = "\n".join([f"- {k}: {v}" for k, v in self.operations.items()])
        memory_snapshot = self._safe_memory_snapshot()

        prompt = f"""
        You are an **autonomous marketing operations agent**.

        Your mission:
        Promote the company **{self.goal}** on Twitter by finding relevant tweets, creating thoughtful replies, and posting them using approved bot accounts — while following safety guidelines.

        Available tools:
        {tool_list}

        Current state (memory):
        {memory_snapshot}

        Rules:
        1. You may call one tool at a time.
        2. Only call tools that make sense given the current memory state.
        3. If the next step logically completes the workflow, return `{{ "action": "END", "input": "" }}`.
        4. Always use valid JSON output. No markdown, no extra text.

        Thinking steps:
        - Observe the memory (see what’s already done).
        - Decide the single next best tool to progress the campaign safely.
        - Provide minimal necessary input for that tool.

        Example outputs:
        {{ "action": "Bot Monitoring", "input": {{ "flow_id": <flow_id> }} }}
        {{ "action": "Hashtag", "input": {{ "flow_id": <flow_id> }} }}
        {{ "action": "Fetch Data", "input": {{ "hashtags": <hashtags> }} }}
        {{ "action": "Rag Retrieval Data", "input": {{ "query": <query>, "user_id": <company_name> }} }}
        {{ "action": "Strategy Agent", "input": {{ "tweets": [...], "documents": [...] }} }}
        {{ "action": "Safeguard Agent", "input": {{ "replies": [...] }} }}
        {{ "action": "Reply Data", "input": {{ "tweet_id": "12345", "text": "Our product aligns with your idea!" }} }}
        {{ "action": "END", "input": "" }}

        Output ONLY JSON. No explanations, no natural text.
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
            print(f"LLM thinking (attempt {attempt + 1}...)" )
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
    def run(self):
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
                self.memory[f"{action}_error"] = str(e)
                break

            # update memory with result (store under tool name)
            try:
                # If result is JSON-serializable, store it; else store string repr
                json.dumps(result)  # quick check
                self.memory[action] = result
            except Exception:
                self.memory[action] = str(result)

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
