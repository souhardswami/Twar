import React, { useState } from "react";
import { toaster } from "../utils/Toaster";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Input,
  Heading,
  VStack,
  Text,
  Link,
  Field,
  Flex,
} from "@chakra-ui/react";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const API_URL = "http://127.0.0.1:5000";

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/auth/register`, {
        username: username,
        email: email,
        password: password,
      });

      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      toaster.create({
        title: "Registration successful.",
        description: "You've successfully registered.",
        type: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error while registering user ", error);

      toaster.create({
        title: "Registration Failure.",
        description: `Error while registering user ${error}`,
        type: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      minH="100vh"
      bgGradient="linear(135deg, #f5f6fa 0%, #c3cfe2 100%)"
      py={8}
    >
      <Flex align="center" justify="center" h="100%">
        <Box
          maxW="xl"
          w="90%"
          p={8}
          borderRadius="2xl"
          boxShadow="0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
          pos="relative"
          overflow="hidden"
        >
          <Box textAlign="center" mb={8}>
            <Heading as="h1" size="3xl" fontWeight="bold" mb={4}>
              Create Account
            </Heading>
            <Text fontSize="lg" color="grey.solid">
              Please enter your details to create a new account
            </Text>
          </Box>

          <form onSubmit={handleRegister}>
            <VStack spacing={6}>
              <Field.Root required>
                <Field.Label
                  htmlFor="username"
                  fontSize="md"
                  fontWeight="medium"
                >
                  Username
                </Field.Label>
                <Input
                  as={motion.input}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  _focus={{
                    boxShadow: "0 0 0 3px rgba(81, 180, 194, 0.5)",
                    border: "none",
                  }}
                />
              </Field.Root>

              <Field.Root required mt={4}>
                <Field.Label htmlFor="email" fontSize="md" fontWeight="medium">
                  Email address
                </Field.Label>
                <Input
                  as={motion.input}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  _focus={{
                    boxShadow: "0 0 0 3px rgba(81, 180, 194, 0.5)",
                    border: "none",
                  }}
                />
              </Field.Root>

              <Field.Root required mt={4}>
                <Field.Label
                  htmlFor="password"
                  fontSize="md"
                  fontWeight="medium"
                >
                  Password
                </Field.Label>
                <Input
                  as={motion.input}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  _focus={{
                    boxShadow: "0 0 0 3px rgba(81, 180, 194, 0.5)",
                    border: "none",
                  }}
                />
              </Field.Root>

              {/* 4. Confirm Password Field */}
              <Field.Root required mt={4}>
                <Field.Label
                  htmlFor="confirmPassword"
                  fontSize="md"
                  fontWeight="medium"
                >
                  Confirm Password
                </Field.Label>
                <Input
                  as={motion.input}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  _focus={{
                    boxShadow: "0 0 0 3px rgba(81, 180, 194, 0.5)",
                    border: "none",
                  }}
                />
              </Field.Root>

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
                Register
              </Button>
            </VStack>
          </form>

          <Text mt={8} textAlign="center" fontSize="md" color="gray.600">
            Already have an account?{" "}
            <Link
              as={motion.link}
              whileHover={{ scale: 1.05 }}
              color="teal.500"
              as={RouterLink}
              to="/login"
            >
              <Button variant="plain">Sign In</Button>
            </Link>
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default RegisterPage;
