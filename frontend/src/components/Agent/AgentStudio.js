import React, { useCallback, useState } from "react";
import { toaster } from "../utils/Toaster";
import "reactflow/dist/style.css";
import axios from "axios";
import FetchNode from "./Modals/FetchNode";
import BotMonitoringNode from "./Modals/BotMonitoringNode";
import HashtagNode from "./Modals/HashTagNode";
import StrategyNode from "./Modals/StrategyNode";
import SafeguardNode from "./Modals/SafeguardNode";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  MiniMap,
  MarkerType,
  Position,
} from "reactflow";
import {
  Box,
  Button,
  VStack,
  Flex,
  Dialog,
  Portal,
  Text,
} from "@chakra-ui/react";

const agentTypes = [
  { id: "1", label: "🤖 Bot Monitoring", showLabel: "Monitoring" },
  { id: "2", label: "#️⃣ Hashtag Agent", showLabel: "Hashtag " },
  { id: "3", label: "📥 Fetch Data", showLabel: "Fetch " },
  { id: "4", label: "💡 Strategy Agent", showLabel: "Strategy " },
  { id: "5", label: "🛡 Safeguard Agent", showLabel: "Safeguard " },
  { id: "6", label: "💬 Reply Data", showLabel: "Reply" },
  { id: "7", label: "🔚 End", showLabel: "End" },
];
const nodeDefaults = {
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
};

const initialNode = [
  {
    id: "0",
    type: "input",
    data: {
      label: "Start",
    },
    position: { x: 0, y: 0 },
    sourcePosition: Position.Right,
    style: {
      width: 80,
      height: 30,
      padding: 5,
    },
  },
];

const NODE_COMPONENTS = {
  Monitoring: BotMonitoringNode,
  Hashtag: HashtagNode,
  Fetch: FetchNode,
  Strategy: StrategyNode,
  Safeguard: SafeguardNode,
  Reply: FetchNode,
};

const AgentStudio = () => {
  const [colorMode, setColorMode] = useState("dark");
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNode);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [idCounter, setIdCounter] = useState(1);

  const [selectedNode, setSelectedNode] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const jwtToken = localStorage.getItem("token");
  const API_URL = "http://127.0.0.1:5000";

  const getPositioning = (type) => {
    if (type == 7) {
      return { type: "output", targetPosition: Position.Left };
    }
    return nodeDefaults;
  };

  const label = selectedNode?.data?.label?.split("(")[0] || "Node";

  const renderNodeComponent = () => {
    if (!selectedNode?.data?.label) return null;

    const type = Object.keys(NODE_COMPONENTS).find((key) =>
      selectedNode.data.label.startsWith(key)
    );

    const NodeComponent = NODE_COMPONENTS[type];
    if (!NodeComponent) return null;

    return (
      <NodeComponent
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    );
  };

  const handleNodeClick = (event, node) => {
    if (node.data.label !== "Start" && node.data.label !== "End") {
      setSelectedNode(node);
      setInputValue("");
      setIsOpen(true);
    }
  };

  const handleSave = () => {
    if (!selectedNode) return;
    const updatedNodes = nodes.map((n) =>
      n.id === selectedNode.id
        ? { ...n, data: { ...n.data, userInput: inputValue } }
        : n
    );
    setNodes(updatedNodes);
    setIsOpen(false);
  };

  const addNode = useCallback(
    (type) => {
      const newNode = {
        id: `${idCounter}`,
        position: {
          x: 220 - Math.random() * 440,
          y: 165 - Math.random() * 330,
        },
        data: {
          label: `${agentTypes.find((a) => a.id === type)?.showLabel || type}`,
        },
        style: {
          width: 80,
          height: 30,
          padding: 5,
        },
        ...getPositioning(type),
      };

      setIdCounter((id) => id + 1);
      setNodes((nds) => [...nds, newNode]);
    },
    [idCounter]
  );

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            markerEnd: { type: MarkerType.ArrowClosed },
            style: { strokeWidth: 2 },
            animated: true,
          },
          eds
        )
      ),
    []
  );

  const saveAgent = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/flow`,
        {
          edges,
          nodes,
        },
        {
          headers: {
            Authorization: jwtToken ? `Bearer ${jwtToken}` : undefined,
          },
        }
      );
      if (res.status === 200) {
        toaster.create({
          title: `Agent Created 🎉,  with id ${res.data.flow_id}`,
          description: `${res.data.message}`,
          type: "success",
        });
        setEdges([]);
        setNodes(initialNode);
      } else {
        toaster.create({
          title: "Error",
          description: "Could not create agent. Please try again.",
          type: "error",
        });
      }
    } catch (err) {
      toaster.create({
        title: "Network Error",
        description: err.message,
        tyoe: "error",
      });
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Flex height="90vh">
      <Box width="260px" p={4} borderRight="1px solid">
        <Text fontSize="lg" fontWeight="bold" mb={4} textAlign="left">
          Agents
        </Text>
        <VStack align="stretch" spacing={3}>
          {agentTypes.map((agent) => (
            <Button
              key={agent.id}
              onClick={() => addNode(agent.id)}
              colorPalette="blue"
              variant="outline"
              justifyContent="flex-start"
            >
              {agent.label}
            </Button>
          ))}
          <Button colorPalette="green" variant="outline" onClick={saveAgent}>
            {" "}
            Save Agent
          </Button>
        </VStack>
      </Box>

      <Dialog.Root open={isOpen} isCentered>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>
                  {selectedNode?.data?.label?.split("(")[0] || "Node"} Details
                </Dialog.Title>
              </Dialog.Header>

              <Dialog.Body>
                <Box>
                  {(() => {
                    if (!selectedNode?.data?.label) return null;
                    const type = Object.keys(NODE_COMPONENTS).find((key) =>
                      selectedNode.data.label.startsWith(key)
                    );
                    const NodeComponent = NODE_COMPONENTS[type];
                    return (
                      <NodeComponent
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                      />
                    );
                  })()}
                </Box>
              </Dialog.Body>
              <Dialog.Footer>
                <Box display="flex" justifyContent="flex-end">
                  <Button colorScheme="teal" mr={3} onClick={handleSave}>
                    Save
                  </Button>
                  <Button variant="ghost" onClick={closeModal}>
                    Cancel
                  </Button>
                </Box>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
      <Box flex="1" position="relative">
        <ReactFlow
          colorMode={colorMode}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={handleNodeClick}
          fitView
          style={{
            width: 80,
            height: 30,
            fontSize: 12,
            padding: 5,
          }}
        >
          <MiniMap nodeStrokeWidth={3} />
          <Controls />
          <Background color="#aaa" gap={8} />
        </ReactFlow>
      </Box>
    </Flex>
  );
};

export default AgentStudio;
