
import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Stack,
  Button,
  useToast,
} from "@chakra-ui/react";

const PricingPage = ({ selectedPlan, onSelectPlan }) => {
  const toast = useToast();

  const handleSelectPlan = async (plan) => {
        toast({
          title: "Redirecting to Stripe...",
          description: `You've selected the ${plan} plan.`,
          status: "info",
          duration: 3000,
          isClosable: true,
        });
    
        try {
          const response = await fetch(
            "http://127.0.0.1:5000/create-checkout-session",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ plan }),
            }
          );
    
          const data = await response.json();
    
          if (data.url) {
            window.location.href = data.url; // Redirect to Stripe Checkout
          } else {
            throw new Error("Failed to create Stripe session");
          }
        } catch (error) {
          toast({
            title: "Error",
            description: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      };

  return (
    <Box bg="gray.50" minH="100vh" py={10}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="center" mb={10}>
          <Heading as="h1" size="2xl" color="brand.600">
            Pricing Plans
          </Heading>
          <Text fontSize="lg" color="gray.600" textAlign="center" maxW="600px">
            Choose the plan that best fits your needs. Upgrade, downgrade, or cancel anytime.
          </Text>
        </VStack>

        <Stack direction={{ base: "column", md: "row" }} spacing={8} justify="center">
          <Box bg="white" p={6} rounded="lg" shadow="lg" maxW="sm">
            <Heading as="h3" size="lg" mb={4} color="brand.600">
              Basic Plan
            </Heading>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
              Free
            </Text>
            <VStack align="start" spacing={3} mb={6}>
              <Text>✔️ Feature 1</Text>
              <Text>✔️ Feature 2</Text>
              <Text>✔️ Feature 3</Text>
            </VStack>
            <Button colorScheme="teal" onClick={() => onSelectPlan("Free")}>
              Select Free Plan
            </Button>
          </Box>

          <Box bg="white" p={6} rounded="lg" shadow="lg" maxW="sm">
            <Heading as="h3" size="lg" mb={4} color="brand.600">
              Pro Plan
            </Heading>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
              $10/month
            </Text>
            <VStack align="start" spacing={3} mb={6}>
              <Text>✔️ Feature 1</Text>
              <Text>✔️ Feature 2</Text>
              <Text>✔️ Feature 3</Text>
              <Text>✔️ Feature 4</Text>
            </VStack>
            <Button colorScheme="teal" onClick={() => handleSelectPlan("$10/Month", 1000)}>
              Select Pro Plan
            </Button>
          </Box>

          <Box bg="white" p={6} rounded="lg" shadow="lg" maxW="sm">
            <Heading as="h3" size="lg" mb={4} color="brand.600">
              Enterprise Plan
            </Heading>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
              $50/month
            </Text>
            <VStack align="start" spacing={3} mb={6}>
              <Text>✔️ Feature 1</Text>
              <Text>✔️ Feature 2</Text>
              <Text>✔️ Feature 3</Text>
              <Text>✔️ Feature 4</Text>
              <Text>✔️ Feature 5</Text>
            </VStack>
            <Button colorScheme="teal" onClick={() => handleSelectPlan("Enterprise", 5000)}>
              Select Enterprise Plan
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default PricingPage;