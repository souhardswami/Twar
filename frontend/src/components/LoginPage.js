import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  useToast,
} from '@chakra-ui/react';

const LoginPage = () => {


    console.log("LoginPage.js");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Perform login logic here (e.g., API call)
    // For demonstration, we'll just show a toast message
    toast({
      title: 'Login successful.',
      description: "You've successfully logged in.",
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
        maxW="md"
        w="full"
        bg="white"
        p={8}
        borderRadius="lg"
        boxShadow="lg"
      >
        <Heading as="h1" size="xl" textAlign="center" mb={6}>
          Company Login
        </Heading>
        <form onSubmit={handleLogin}>
          <VStack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" width="full">
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default LoginPage;
