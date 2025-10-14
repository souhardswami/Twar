import React, { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  MiniMap,
  MarkerType,
  Position
} from "reactflow";
import {
  Box,
  VStack,
  Button,
  Flex,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  Textarea,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import "reactflow/dist/style.css";

import FetchNode from "./Components/FetchNode";
import BotMonitoringNode from "./Components/BotMonitoringNode";
import HashtagNode from "./Components/HashTagNode";
import StrategyNode from "./Components/StrategyNode";
import SafeguardNode from "./Components/SafeguardNode";

const agentTypes = [
  { id: "1", label: "🤖 Bot Monitoring", showLabel: 'Monitoring' },
  { id: "2", label: "#️⃣ Hashtag Agent", showLabel: 'Hashtag ' },
  { id: "3", label: "📥 Fetch Data", showLabel: 'Fetch ' },
  { id: "4", label: "💡 Strategy Agent", showLabel: 'Strategy ' },
  { id: "5", label: "🛡 Safeguard Agent", showLabel: "Safeguard "},
  { id: "6", label: "💬 Reply Data", showLabel: 'Reply' },
  { id: "7", label: "🔚 End", showLabel: 'End' },
];
const nodeDefaults = {
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
};

const initialNode = [
  {
    id: '0',
    type: 'input',
    data: {
      label: 'Start'
    },
    position: { x: 0, y: 0 },
    sourcePosition: Position.Right,
    style: {
      width: 80,
      height: 30,
      padding: 5,
    },
  }
]

const NODE_COMPONENTS = {
  Monitoring: BotMonitoringNode,
  Hashtag: HashtagNode,
  Fetch: FetchNode,
  Strategy: StrategyNode,
  Safeguard: SafeguardNode,
  Reply: FetchNode, 

};

const AgentStudio = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNode);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [idCounter, setIdCounter] = useState(1);

  const [selectedNode, setSelectedNode] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const getPositioning = (type) => {
    if (type == 7) {
      return { type: 'output', targetPosition: Position.Left}
    }
    return nodeDefaults;
  }

  const handleNodeClick = (event, node) => {
    console.log(node)
    if (node.data.label !== 'Start' && node.data.label !== 'End') {
      setSelectedNode(node);
      setInputValue("");
      onOpen();
    }
    
  };

  const handleSave = () => {
    if (!selectedNode) return;
    const updatedNodes = nodes.map((n) =>
      n.id === selectedNode.id
        ? { ...n, data: { ...n.data, value: inputValue, label: `${n.data.label}: ${inputValue}` } }
        : n
    );
    setNodes(updatedNodes);

    // Auto-add next node based on current type
    if (selectedNode.data.label.startsWith("Start")) {
      addNode("hashtag", "Hashtag Node (Click to setup)", 250);
      setEdges((eds) => [...eds, { id: "e1", source: selectedNode.id, target: "hashtag-1" }]);
    } else if (selectedNode.data.label.startsWith("Hashtag")) {
      addNode("strategy", "Strategy Node (Click to setup)", 400);
    } else if (selectedNode.data.label.startsWith("Strategy")) {
      addNode("safeguard", "Safeguard Node (Click to setup)", 550);
    }

    onClose();
  };


  // Create node dynamically
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
        ...getPositioning(type)
      };

      setIdCounter((id) => id + 1);
      setNodes((nds) => [...nds, newNode]);
    },
    [idCounter]
  );

  // Connect nodes with animated arrow
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

  return (
    <Flex height="90vh" bg={bgColor}>
      {/* Left Sidebar */}
      <Box
        width="260px"
        bg={useColorModeValue("gray.100", "gray.800")}
        p={4}
        borderRight="1px solid"
        borderColor={useColorModeValue("gray.300", "gray.700")}
      >
        <Text fontSize="lg" fontWeight="bold" mb={4} textAlign="center">
          🧩 Agent Types
        </Text>
        <VStack align="stretch" spacing={3}>
          {agentTypes.map((agent) => (
            <Button
              key={agent.id}
              onClick={() => addNode(agent.id)}
              colorScheme="blue"
              variant="outline"
              justifyContent="flex-start"
            >
              {agent.label}
            </Button>
          ))}
        </VStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedNode?.data?.label?.split("(")[0] || "Node"} Details
          </ModalHeader>
          <ModalBody>
            {(() => {
              if (!selectedNode?.data?.label) return null;

              const type = Object.keys(NODE_COMPONENTS).find((key) =>
                selectedNode.data.label.startsWith(key)
              );

              const NodeComponent = NODE_COMPONENTS[type];

              return <NodeComponent value={inputValue} onChange={(e) => setInputValue(e.target.value)} />;
            })()}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Canvas */}
      <Box flex="1" position="relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={handleNodeClick}
          fitView
          style={{ 
            background: useColorModeValue("#f5f6f8", "#1a202c"), 
            width: 80,
            height: 30,
            fontSize: 12,
            padding: 5 }}
        >
          <MiniMap nodeStrokeWidth={3} />
          <Controls />
          <Background color="#aaa" gap={8} />
        </ReactFlow>
      </Box>
    </Flex>
  );
}


export default AgentStudio;