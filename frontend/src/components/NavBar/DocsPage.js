import React from 'react';
import { Box, Heading, Text, VStack, Divider, List, ListItem, ListIcon } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

const DocsPage = () => {
  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>Documentation</Heading>
      
      <VStack spacing={8} align="start">
        <Box>
          <Heading as="h2" size="lg" mb={2}>Introduction</Heading>
          <Text>
            Welcome to the Twitter Bots Agent documentation. This guide will help you understand how to use the platform effectively.
          </Text>
        </Box>

        <Divider />

        <Box>
          <Heading as="h2" size="lg" mb={2}>Getting Started</Heading>
          <Text>
            Follow these steps to get started with Twitter Bots Agent:
          </Text>
          <List spacing={3} mt={2}>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              Sign up for an account.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              Verify your email address.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              Log in to your account.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              Create your first bot.
            </ListItem>
          </List>
        </Box>

        <Divider />

        <Box>
          <Heading as="h2" size="lg" mb={2}>Features</Heading>
          <Text>
            Twitter Bots Agent offers a variety of features to help you manage your bots:
          </Text>
          <List spacing={3} mt={2}>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              Automated tweet scheduling.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              Real-time analytics.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              Customizable bot behaviors.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              Integration with third-party services.
            </ListItem>
          </List>
        </Box>

        <Divider />

        <Box>
          <Heading as="h2" size="lg" mb={2}>API Reference</Heading>
          <Text>
            Our API allows you to interact with Twitter Bots Agent programmatically. Here are some key endpoints:
          </Text>
          <List spacing={3} mt={2}>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              <Text as="span" fontWeight="bold">GET /api/bots</Text> - Retrieve a list of your bots.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              <Text as="span" fontWeight="bold">POST /api/bots</Text> - Create a new bot.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              <Text as="span" fontWeight="bold">PUT /api/bots/:id</Text> - Update an existing bot.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              <Text as="span" fontWeight="bold">DELETE /api/bots/:id</Text> - Delete a bot.
            </ListItem>
          </List>
        </Box>

        <Divider />

        <Box>
          <Heading as="h2" size="lg" mb={2}>FAQs</Heading>
          <Text>
            Here are some frequently asked questions:
          </Text>
          <List spacing={3} mt={2}>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              <Text as="span" fontWeight="bold">Q: How do I reset my password?</Text>
              <Text>A: You can reset your password by clicking on the "Forgot Password" link on the login page.</Text>
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              <Text as="span" fontWeight="bold">Q: How do I upgrade my subscription?</Text>
              <Text>A: You can upgrade your subscription from the Pricing page in your account settings.</Text>
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              <Text as="span" fontWeight="bold">Q: How do I contact support?</Text>
              <Text>A: You can contact support by emailing support@twitterbotsagent.com.</Text>
            </ListItem>
          </List>
        </Box>
      </VStack>
    </Box>
  );
};

export default DocsPage;
