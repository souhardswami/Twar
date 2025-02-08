import React from 'react';
import {
  Box,
  Button,
  Heading,
  VStack,
  Text,
  useToast,
} from '@chakra-ui/react';

const Subscription = ({ onSelectPlan }) => {
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
      const response = await fetch("http://127.0.0.1:5000/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });

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
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      p={4}
    >
      <Box
        // maxW="md"
        w="full"
        bg="white"
        p={8}
        borderRadius="lg"
        boxShadow="lg"
      >
        <Heading as="h1" size="xl" textAlign="center" mb={6}>
          Choose a Subscription Plan
        </Heading>
        <VStack spacing={4}>
          <Box p={4} borderWidth={1} borderRadius="lg" w="full">
            <Heading as="h2" size="md">Free Plan</Heading>
            <Text>Access to basic features.</Text>
            <Button mt={2} colorScheme="blue" onClick={() => handleSelectPlan('Free')}>
              Select Free Plan
            </Button>
          </Box>
          <Box p={4} borderWidth={1} borderRadius="lg" w="full">
            <Heading as="h2" size="md">$10/Month Plan</Heading>
            <Text>Access to premium features.</Text>
            <Button mt={2} colorScheme="blue" onClick={() => handleSelectPlan('$10/Month')}>
              Select $10/Month Plan
            </Button>
          </Box>
          <Box p={4} borderWidth={1} borderRadius="lg" w="full">
            <Heading as="h2" size="md">Enterprise Plan</Heading>
            <Text>Access to all features and priority support.</Text>
            <Button mt={2} colorScheme="blue" onClick={() => handleSelectPlan('Enterprise')}>
              Select Enterprise Plan
            </Button>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};

export default Subscription;
