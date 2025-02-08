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

  const handleSelectPlan = (plan) => {
    onSelectPlan(plan);
    toast({
      title: 'Plan selected.',
      description: `You've selected the ${plan} plan.`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
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
