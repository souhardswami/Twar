import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Stack,
  Button,
  // useToast,
} from "@chakra-ui/react";
import { toaster } from "../utils/Toaster";

import axios from "axios";

const PricingPage = ({ selectedPlan, onSelectPlan }) => {
  const [plans, setPlans] = useState([]);
  // const toast = useToast();

  const jwtToken = localStorage.getItem("token");
  

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/get_plans", {headers : { Authorization : jwtToken ? `Bearer ${jwtToken}` : undefined}});
        setPlans(response.data);
      } catch (error) {
        console.error("Error fetching plans:", error);
        toaster.create({
          title: "Error",
          description: "Failed to fetch subscription plans",
          type: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchPlans();
  }, []);

  const handleSelectPlan = async (planName) => {
    try {
      toaster.create({
        title: "Redirecting to Stripe...",
        description: `You've selected the ${planName} plan.`,
        type: "info",
        duration: 3000,
        isClosable: true,
      });

      const response = await axios.post(
        "http://127.0.0.1:5000/create-checkout-session", 
        {planName},
        {headers: { Authorization: `Bearer ${jwtToken}` }},
       )
      
      const data = await response.data;
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Failed to create Stripe session");
      }
    } catch (error) {
      toaster.create({
        title: "Error",
        description: error.message,
        type: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bgGradient="linear(135deg, #f5f6fa 0%, #c3cfe2 100%)" minH="100vh" py={10}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="center" mb={10}>
          <Heading as="h1" size="2xl" color="brand.600">
            Pricing Plans
          </Heading>
          
          <Text fontSize="lg" color="gray.200" textAlign="center" maxW="600px">
            Choose the plan that best fits your needs. Upgrade, downgrade, or cancel anytime.
          </Text>
        </VStack>

        <Stack direction={{ base: "column", md: "row" }} spacing={8} justify="center">
          {plans.map((plan) => (
             <Box 
             opacity={plan.is_subscribed ? 0.3 : 1}
             key={plan.id} 
            //  bg="white" 
             p={plan.is_subscribed ? 8 : 6} 
             rounded="lg" 
             shadow={plan.is_subscribed ? "xl" : "lg"} 
             maxW="lg"
             border={plan.is_subscribed ? "2px solid white" : "none"}
           ><Heading as="h3" size="lg" mb={4} >
           {plan.name}
           {plan.is_subscribed && (
             <Text fontSize="sm" color="teal.500" ml={2}>
               (Current Plan)
             </Text>
           )}
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
                colorPalette="teal"
                onClick={() => handleSelectPlan(plan.name)}
                isDisabled={plan.is_subscribed}
              >
                {plan.is_subscribed ? "Activated" : `Select ${plan.name} Plan`}
              </Button>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default PricingPage;
