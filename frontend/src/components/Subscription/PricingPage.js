import React, { useState, useEffect } from "react";
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
import axios from "axios";

const PricingPage = ({ selectedPlan, onSelectPlan }) => {
  const [plans, setPlans] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/get_plans");
        setPlans(response.data);
      } catch (error) {
        console.error("Error fetching plans:", error);
        toast({
          title: "Error",
          description: "Failed to fetch subscription plans",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchPlans();
  }, []);

  const handleSelectPlan = async (planId) => {
    try {
      toast({
        title: "Redirecting to Stripe...",
        description: `You've selected the ${planId} plan.`,
        status: "info",
        duration: 3000,
        isClosable: true,
      });

      const response = await axios.post(
        "http://127.0.0.1:5000/create-checkout-session",
        { planId }
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
          {plans.map((plan) => (
            <Box key={plan.id} bg="white" p={6} rounded="lg" shadow="lg" maxW="sm">
              <Heading as="h3" size="lg" mb={4} color="brand.600">
                {plan.name}
              </Heading>
              <Text fontSize="2xl" fontWeight="bold" mb={4}>
                ${plan.price}/month
              </Text>
              <VStack align="start" spacing={3} mb={6}>
                {plan.features.split(", ").map((feature, index) => (
                  <Text key={index}>✔️ {feature}</Text>
                ))}
              </VStack>
              <Button
                colorScheme="teal"
                onClick={() => handleSelectPlan(plan.id)}
              >
                Select {plan.name} Plan
              </Button>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default PricingPage;
