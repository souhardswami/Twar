import React, { useState } from "react";
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
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const bg = useColorModeValue("white", "gray.800");
  const color = useColorModeValue("gray.800", "white");
  const API_URL = "http://127.0.0.1:5000";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/user-login`, 
        { 
          email: email,
          password: password
        }
      );
      localStorage.setItem('myData', res.data.token);
    toast({
      title: "Login successful.",
        description: "You've successfully Login.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    } catch (error) {
      console.error("Error while logging user ", error);

      toast({
        title: "Login Failure.",
        description: `Id/Password is not correct.`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

  };

  return (
    <Box minH="100vh" bgGradient="linear(135deg, #f5f6fa 0%, #c3cfe2 100%)" py={8}>
      <Flex align="center" justify="center" h="100%">
        <Box
          maxW="xl"
          w="90%"
          bg={useColorModeValue("white", "gray.800")}
          p={8}
          borderRadius="2xl"
          boxShadow="0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
          pos="relative"
          overflow="hidden"
        >
          <Box pos="absolute" top={0} left={0} w="100%" h="100%">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              bg="rgba(255, 255, 255, 0.1)"
              borderRadius="50%"
              size="2xl"
              pos="absolute"
              top={-100}
              left={-100}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              bg="rgba(255, 255, 255, 0.1)"
              borderRadius="50%"
              size="2xl"
              pos="absolute"
              top={-100}
              right={-100}
            />
          </Box>

          <Box textAlign="center" mb={8}>
            <Heading
              as="h1"
              size="3xl"
              fontWeight="bold"
              color={color}
              mb={4}
            >
              Welcome Back
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Please enter your credentials to access your account
            </Text>
          </Box>

          <form onSubmit={handleLogin}>
            <VStack spacing={6}>
              <FormControl id="email" isRequired>
                <FormLabel
                  htmlFor="email"
                  fontSize="md"
                  fontWeight="medium"
                  color={color}
                >
                  Email address
                </FormLabel>
                <Input
                  as={motion.input}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  _focus={{
                    boxShadow: "0 0 0 3px rgba(81, 180, 194, 0.5)",
                    border: "none",
                  }}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel
                  htmlFor="password"
                  fontSize="md"
                  fontWeight="medium"
                  color={color}
                >
                  Password
                </FormLabel>
                <Input
                  as={motion.input}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  _focus={{
                    boxShadow: "0 0 0 3px rgba(81, 180, 194, 0.5)",
                    border: "none",
                  }}
                />
              </FormControl>
              <Button
                as={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                colorScheme="teal"
                width="full"
                py={3}
                fontSize="md"
                fontWeight="medium"
                textTransform="uppercase"
              >
                Sign In
              </Button>
            </VStack>
          </form>

          <Text mt={8} textAlign="center" fontSize="md" color="gray.600">
            Don't have an account?{" "}
            <Link
              // as={motion.link}
              whileHover={{ scale: 1.05 }}
              color="teal.500"
              as={RouterLink}
              to="/register"
            >
              <Button variant="plain">Sign Up</Button>
            </Link>
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default LoginPage;
