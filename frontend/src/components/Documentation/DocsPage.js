import React from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  List,
  ListItem,
  Container,
  Input,
  InputGroup,
} from "@chakra-ui/react";
// import { CheckCircleIcon, SearchIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

const DocsPage = () => {
  return (
    <Box as="main" py={8}>
      <Container maxW="container.xl" px={4}>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box textAlign="center" mb={16}>
            <Heading as="h1" size="4xl" mb={6} fontWeight="bold" lineHeight="1.2">
              📚 Documentation
            </Heading>
            <Text fontSize="xl" mb={8} color="fg.muted">
              🚀 Find everything you need to get started with our platform
            </Text>
          </Box>
        </motion.div>

        {/* Optional Search Bar */}
        {/* 
        <Box mb={8}>
          <InputGroup maxW="600px" mx="auto">
            <Input
              placeholder="Search documentation..."
              borderRadius="full"
              focusBorderColor="teal.500"
              _placeholder={{ color: "fg.muted" }}
              leftElement={<SearchIcon color="gray.400" />}
            />
          </InputGroup>
        </Box>
        */}

        {/* Main Documentation Sections */}
        <VStack spacing={8} align="start">
          {/* INTRODUCTION */}
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
                Welcome to the Twitter Bots Agent documentation 📖. This guide
                helps you understand how to use the platform effectively.
              </Text>
            </Box>
          </motion.div>

          {/* GETTING STARTED */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Box>
              <Heading as="h2" size="lg" mb={2}>
                🚀 Getting Started
              </Heading>
              <Text>Follow these steps to get started with Twitter Bots Agent:</Text>
              <List spacing={3} mt={2}>
                <ListItem>📝 Sign up for an account.</ListItem>
                <ListItem>✉️ Verify your email address.</ListItem>
                <ListItem>🔑 Log in to your account.</ListItem>
                <ListItem>🤖 Create your first bot.</ListItem>
              </List>
            </Box>
          </motion.div>

          {/* FEATURES */}
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
                <ListItem>⏰ Automated tweet scheduling.</ListItem>
                <ListItem>📊 Real-time analytics.</ListItem>
                <ListItem>🔧 Customizable bot behaviors.</ListItem>
                <ListItem>🔄 Integration with third-party services.</ListItem>
              </List>
            </Box>
          </motion.div>

          {/* API REFERENCE */}
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
                  <Text as="span" fontWeight="bold">
                    GET /api/bots
                  </Text>{" "}
                  - 📥 Retrieve a list of your bots.
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    POST /api/bots
                  </Text>{" "}
                  - 📤 Create a new bot.
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    PUT /api/bots/:id
                  </Text>{" "}
                  - 🔧 Update an existing bot.
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    DELETE /api/bots/:id
                  </Text>{" "}
                  - 🗑️ Delete a bot.
                </ListItem>
              </List>
            </Box>
          </motion.div>

          {/* FAQS */}
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
                  <Text as="span" fontWeight="bold">
                    Q: How do I reset my password?
                  </Text>
                  <Text>
                    A: Click “Forgot Password” on the login page to reset your
                    password 🔑.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Q: How do I upgrade my subscription?
                  </Text>
                  <Text>
                    A: Go to the Pricing page in your account settings to upgrade
                    📈.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Q: How do I contact support?
                  </Text>
                  <Text>
                    A: You can contact us at support@twitterbotsagent.com 📧.
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
