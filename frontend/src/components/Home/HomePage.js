import React from "react";
import {
  Container,
  Heading,
  Text,
  Box,
  Button,
  VStack,
  HStack,
  Icon,
  Stack,
} from "@chakra-ui/react";
import { FaRobot, FaChartLine, FaCogs, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Box as="main" py={8} bgGradient="linear(135deg, #f5f6fa 0%, #c3cfe2 100%)">
      <Container maxW="container.xl" px={4}>
        <Box textAlign="center" py={20} mb={16}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Heading
              as="h1"
              size="4xl"
              mb={6}
              fontWeight="bold"
              lineHeight="1.2"
            >
              <Box
                display="flex"
                flexDir="row"
                justifyContent="center"
                flexWrap="wrap"
              >
                <Box as="span" mr={2}>
                  Transform Your
                </Box>
                <Box as="span" color="teal.500" mr={2}>
                  Twitter
                </Box>
                <Box as="span"> Management</Box>
              </Box>
            </Heading>
            <Text fontSize="xl" mb={8} color="grey.solid">
              Automate, optimize, and scale your Twitter presence with our
              powerful AI-powered solution
            </Text>
            <HStack justify="center" spacing={4}>
              <Button
                colorPalette="teal"
                size="lg"
                px={8}
                py={4}
                leftIcon={<FaArrowRight />}
                as={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/login")}
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                colorScheme="gray"
                size="lg"
                px={8}
                py={4}
                as={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/docs")}
              >
                Docs
              </Button>
            </HStack>
          </motion.div>
        </Box>

        <Stack
          direction={["column", "row"]}
          spacing={8}
          justify="center"
          mb={16}
        >
          <VStack
            maxW="300px"
            p={6}
            borderRadius="lg"
            boxShadow="md"
            transition="transform 0.3s ease"
            _hover={{ transform: "translateY(-5px)" }}
          >
            <Icon as={FaRobot} w={12} h={12} color="teal.500" mb={4} />
            <Heading as="h3" size="lg" mb={2}>
              Create Agentic Workflows
            </Heading>
            <Text color="grey.solid">
              Design and implement workflows for your AI agents to automate
              tasks and processes.
            </Text>
          </VStack>

          <VStack
            maxW="300px"
            p={6}
            borderRadius="lg"
            boxShadow="md"
            transition="transform 0.3s ease"
            _hover={{ transform: "translateY(-15px)" }}
          >
            <Icon as={FaChartLine} w={12} h={12} color="teal.500" mb={4} />
            <Heading as="h3" size="lg" mb={2}>
              Monitor Bots in Real-Time
            </Heading>
            <Text color="grey.solid">
              Keep track of your bots' performance and activities with real-time
              monitoring tools.
            </Text>
          </VStack>

          <VStack
            maxW="300px"
            p={6}
            borderRadius="lg"
            boxShadow="md"
            transition="transform 0.3s ease"
            _hover={{ transform: "translateY(-5px)" }}
          >
            <Icon as={FaCogs} w={12} h={12} color="teal.500" mb={4} />
            <Heading as="h3" size="lg" mb={2}>
              RAG Support
            </Heading>
            <Text color="grey.solid">
              Utilize Retrieval-Augmented Generation (RAG) to improve the
              accuracy and relevance of your AI solutions.
            </Text>
          </VStack>
        </Stack>

        <Box mt={16}>
          <Text textAlign="center" color="gray.solid" fontSize="sm">
            © 2025 Twar. All rights reserved.
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
