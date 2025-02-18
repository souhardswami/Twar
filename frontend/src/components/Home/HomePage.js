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
  Image,
} from "@chakra-ui/react";
import { FaRobot, FaChartLine, FaCogs, FaArrowRight } from "react-icons/fa";

function HomePage() {
  return (
    <Container maxW="container.xl" p={4}>
      {/* Hero Section */}
      <Box textAlign="center" py={10} bg="blue.500" color="white" borderRadius="md" mb={8}>
        <Heading as="h1" size="2xl" mb={4}>
          Welcome to Twitter Bots Agent
        </Heading>
        <Text fontSize="lg">
          Automate your Twitter interactions with ease and efficiency.
        </Text>
        <Button colorScheme="teal" size="lg" mt={6}>
          Get Started
        </Button>
      </Box>

      {/* About Section */}
      <Box mb={8}>
        <Heading as="h2" size="xl" mb={4} textAlign="center">
          About Twitter Bots Agent
        </Heading>
        <Text fontSize="lg" textAlign="center">
          Twitter Bots Agent is a powerful tool designed to help you manage and automate your Twitter accounts. Whether you want to schedule tweets, analyze performance, or customize bot behaviors, we've got you covered.
        </Text>
      </Box>

      {/* Features Section */}
      <Box mb={8}>
        <Heading as="h2" size="xl" mb={4} textAlign="center">
          Features
        </Heading>
        <Stack direction={['column', 'row']} spacing={8} justify="center">
          <VStack>
            <Icon as={FaRobot} w={10} h={10} color="blue.500" />
            <Text fontSize="lg" fontWeight="bold">Automated Tweet Scheduling</Text>
            <Text textAlign="center">Schedule your tweets to be posted at the optimal times.</Text>
          </VStack>
          <VStack>
            <Icon as={FaChartLine} w={10} h={10} color="blue.500" />
            <Text fontSize="lg" fontWeight="bold">Real-Time Analytics</Text>
            <Text textAlign="center">Get real-time insights into your account's performance.</Text>
          </VStack>
          <VStack>
            <Icon as={FaCogs} w={10} h={10} color="blue.500" />
            <Text fontSize="lg" fontWeight="bold">Customizable Bot Behaviors</Text>
            <Text textAlign="center">Customize your bot's behavior to suit your needs.</Text>
          </VStack>
        </Stack>
      </Box>

      {/* How It Works Section */}
      <Box mb={8}>
        <Heading as="h2" size="xl" mb={4} textAlign="center">
          How It Works
        </Heading>
        <Stack direction={['column', 'row']} spacing={8} justify="center">
          <VStack>
            <Image src="/images/step1.png" alt="Step 1" boxSize="100px" />
            <Text fontSize="lg" fontWeight="bold">Step 1: Sign Up</Text>
            <Text textAlign="center">Create an account to get started.</Text>
          </VStack>
          <VStack>
            <Image src="/images/step2.png" alt="Step 2" boxSize="100px" />
            <Text fontSize="lg" fontWeight="bold">Step 2: Add Accounts</Text>
            <Text textAlign="center">Connect your Twitter accounts to the platform.</Text>
          </VStack>
          <VStack>
            <Image src="/images/step3.png" alt="Step 3" boxSize="100px" />
            <Text fontSize="lg" fontWeight="bold">Step 3: Automate</Text>
            <Text textAlign="center">Set up your bots and start automating.</Text>
          </VStack>
        </Stack>
      </Box>

      {/* Call to Action */}
      <Box textAlign="center" py={10} bg="gray.100" borderRadius="md" mb={8}>
        <Heading as="h2" size="xl" mb={4}>
          Ready to Get Started?
        </Heading>
        <Text fontSize="lg" mb={6}>
          Sign up today and take your Twitter management to the next level.
        </Text>
        <Button colorScheme="teal" size="lg" rightIcon={<FaArrowRight />}>
          Sign Up Now
        </Button>
      </Box>

      {/* Footer */}
      <Box textAlign="center" py={4} borderTop="1px" borderColor="gray.200">
        <HStack spacing={8} justify="center">
          <Button variant="link" colorScheme="blue">
            Docs
          </Button>
          <Button variant="link" colorScheme="blue">
            Pricing
          </Button>
          <Button variant="link" colorScheme="blue">
            Contact
          </Button>
        </HStack>
        <Text fontSize="sm" color="gray.500" mt={4}>
          &copy; {new Date().getFullYear()} Twitter Bots Agent. All rights reserved.
        </Text>
      </Box>
    </Container>
  );
}

export default HomePage;
