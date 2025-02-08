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
  Text,
  Link,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
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

  const handleSignUp = async (e) => {
    e.preventDefault();
    // Perform sign-up logic here (e.g., API call)
    // For demonstration, we'll just show a toast message
    toast({
      title: 'Sign-up successful.',
      description: "You've successfully signed up.",
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
          {isLogin ? 'Company Login' : 'Company Sign Up'}
        </Heading>
        <form onSubmit={isLogin ? handleLogin : handleSignUp}>
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
              {isLogin ? 'Login' : 'Sign Up'}
            </Button>
          </VStack>
        </form>
        <Text mt={4} textAlign="center">
          {isLogin ? (
            <>
              Don't have an account?{' '}
              <Link color="blue.500" onClick={() => setIsLogin(false)}>
                Sign Up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Link color="blue.500" onClick={() => setIsLogin(true)}>
                Login
              </Link>
            </>
          )}
        </Text>
      </Box>
    </Box>
  );
};

export default LoginPage;
