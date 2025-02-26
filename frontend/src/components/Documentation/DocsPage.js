import React from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Divider,
  List,
  ListItem,
  ListIcon,
  Container,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { CheckCircleIcon, SearchIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

const DocsPage = () => {
  const bg = useColorModeValue("gray.100");
  const color = useColorModeValue("black");

  return (
    <Box as="main" py={8} bg={bg} color={color}>
      <Container maxW="container.xl" px={4}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box textAlign="center"  mb={16}>
            <Heading
              as="h1"
              size="4xl"
              mb={6}
              fontWeight="bold"
              lineHeight="1.2"
            >
              📚 Documentation
            </Heading>
            <Text fontSize="xl" mb={8} color="gray.600">
              🚀 Find everything you need to get started with our platform
            </Text>
          </Box>
        </motion.div>

        <Box mb={8}>
          <InputGroup maxWidth="600px" mx="auto">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search documentation..."
              borderRadius="full"
              // py={3}
              // px={4}
              FocusBorderColor="teal.500"
              _placeholder={{ color: "gray.400" }}
            />
          </InputGroup>
        </Box>

        <VStack spacing={8} align="start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Box>
              <Heading as="h2" size="lg" mb={2}>
                🎮 Introduction
              </Heading>
              <Text>
                Welcome to the Twitter Bots Agent documentation 📖. This guide will
                help you understand how to use the platform effectively.
              </Text>
            </Box>
          </motion.div>

          <Divider mt={1} mb={1} />

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Box>
              <Heading as="h2" size="lg" mb={2}>
                🚀 Getting Started
              </Heading>
              <Text>
                Follow these steps to get started with Twitter Bots Agent:
              </Text>
              <List spacing={3} mt={2}>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="teal.500" />
                  📝 Sign up for an account.
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="teal.500" />
                  ✉️ Verify your email address.
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="teal.500" />
                  🔑 Log in to your account.
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="teal.500" />
                  🤖 Create your first bot.
                </ListItem>
              </List>
            </Box>
          </motion.div>

          <Divider mt={1} mb={1} />

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Box>
              <Heading as="h2" size="lg" mb={2}>
                🎯 Features
              </Heading>
              <Text>
                Twitter Bots Agent offers a variety of features to help you manage
                your bots:
              </Text>
              <List spacing={3} mt={2}>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="teal.500" />
                  ⏰ Automated tweet scheduling.
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="teal.500" />
                  📊 Real-time analytics.
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="teal.500" />
                  🔧 Customizable bot behaviors.
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="teal.500" />
                  🔄 Integration with third-party services.
                </ListItem>
              </List>
            </Box>
          </motion.div>

          <Divider mt={1} mb={1} />

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Box>
              <Heading as="h2" size="lg" mb={2}>
                📡 API Reference
              </Heading>
              <Text>
                Our API allows you to interact with Twitter Bots Agent
                programmatically. Here are some key endpoints:
              </Text>
              <List spacing={3} mt={2}>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="teal.500" />
                  <Text as="span" fontWeight="bold">
                    GET /api/bots
                  </Text>{" "}
                  - 📥 Retrieve a list of your bots.
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="teal.500" />
                  <Text as="span" fontWeight="bold">
                    POST /api/bots
                  </Text>{" "}
                  - 📤 Create a new bot.
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="teal.500" />
                  <Text as="span" fontWeight="bold">
                    PUT /api/bots/:id
                  </Text>{" "}
                  - 🔧 Update an existing bot.
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="teal.500" />
                  <Text as="span" fontWeight="bold">
                    DELETE /api/bots/:id
                  </Text>{" "}
                  - 🗑️ Delete a bot.
                </ListItem>
              </List>
            </Box>
          </motion.div>

          <Divider mt={1} mb={1} />

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
          >
            <Box>
              <Heading as="h2" size="lg" mb={2}>
                🤔 FAQs
              </Heading>
              <Text>Here are some frequently asked questions:</Text>
              <List spacing={3} mt={2}>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="teal.500" />
                  <Text as="span" fontWeight="bold">
                    Q: How do I reset my password?
                  </Text>
                  <Text>
                    A: You can reset your password by clicking on the "Forgot
                    Password" link on the login page 🔑.
                  </Text>
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="teal.500" />
                  <Text as="span" fontWeight="bold">
                    Q: How do I upgrade my subscription?
                  </Text>
                  <Text>
                    A: You can upgrade your subscription from the Pricing page in
                    your account settings 📈.
                  </Text>
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="teal.500" />
                  <Text as="span" fontWeight="bold">
                    Q: How do I contact support?
                  </Text>
                  <Text>
                    A: You can contact support by emailing
                    support@twitterbotsagent.com 📧.
                  </Text>
                </ListItem>
              </List>
            </Box>
          </motion.div>
        </VStack>
      </Container>
    </Box>
  );
};

export default DocsPage;
