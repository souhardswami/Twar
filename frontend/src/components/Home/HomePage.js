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
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaRobot, FaChartLine, FaCogs, FaArrowRight, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

function HomePage() {
  const bg = useColorModeValue("white", "gray.800");
  const color = useColorModeValue("gray.800", "white");

  return (
    <Box as="main" py={8} bgGradient="linear(135deg, #f5f6fa 0%, #c3cfe2 100%)">
      {/* Hero Section */}
      <Container maxW="container.xl" px={4}>
        <Box
          textAlign="center"
          py={20}
          mb={16}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Heading
              as="h1"
              size="4xl"
              mb={6}
              color={color}
              fontWeight="bold"
              lineHeight="1.2"
            >
              
              <Box display="flex" flexDir="row">
                <Box as="span" mr={2}>Transform Your</Box>
                <Box 
                  as="span" 
                  color="teal.300" 
                  mr={2}
                >
                  Twitter
                </Box>
                
                <Box as="span">
                   Management
                </Box>
              </Box>
            </Heading>
            <Text fontSize="xl" mb={8} color="gray.600">
              Automate, optimize, and scale your Twitter presence with our powerful AI-powered solution
            </Text>
            <HStack justify="center" spacing={4}>
              <Button
                colorScheme="teal"
                size="lg"
                px={8}
                py={4}
                leftIcon={<FaArrowRight />}
                as={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                colorScheme="gray"
                size="lg"
                px={8}
                py={4}
                as={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Demo
              </Button>
            </HStack>
          </motion.div>
        </Box>

        {/* Search Bar */}
        <Box mb={16} textAlign="center">
          <InputGroup maxW="600px" mx="auto">
            <InputLeftElement pointerEvents="none">
              <Icon as={FaSearch} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search Twitter accounts or keywords..."
              borderRadius="full"
              py={3}
              px={4}
              focusBorderColor="teal.500"
              _placeholder={{ color: "gray.400" }}
            />
          </InputGroup>
        </Box>

        {/* Features Section */}
        <Stack direction={["column", "row"]} spacing={8} justify="center" mb={16}>
          <VStack
            maxW="300px"
            p={6}
            bg={bg}
            borderRadius="lg"
            boxShadow="md"
            transition="transform 0.3s ease"
            _hover={{ transform: "translateY(-5px)" }}
          >
            <Icon as={FaRobot} w={12} h={12} color="teal.500" mb={4} />
            <Heading as="h3" size="lg" mb={2}>
              AI-Powered Automation
            </Heading>
            <Text color="gray.600">
              Automate your Twitter interactions with intelligent AI-powered bots that learn and adapt to your needs.
            </Text>
          </VStack>

          <VStack
            maxW="300px"
            p={6}
            bg={bg}
            borderRadius="lg"
            boxShadow="md"
            transition="transform 0.3s ease"
            _hover={{ transform: "translateY(-5px)" }}
          >
            <Icon as={FaChartLine} w={12} h={12} color="teal.500" mb={4} />
            <Heading as="h3" size="lg" mb={2}>
              Advanced Analytics
            </Heading>
            <Text color="gray.600">
              Get real-time insights into your account performance with our comprehensive analytics dashboard.
            </Text>
          </VStack>

          <VStack
            maxW="300px"
            p={6}
            bg={bg}
            borderRadius="lg"
            boxShadow="md"
            transition="transform 0.3s ease"
            _hover={{ transform: "translateY(-5px)" }}
          >
            <Icon as={FaCogs} w={12} h={12} color="teal.500" mb={4} />
            <Heading as="h3" size="lg" mb={2}>
              Customizable Workflows
            </Heading>
            <Text color="gray.600">
              Create custom workflows and bots that perfectly match your business requirements.
            </Text>
          </VStack>
        </Stack>

        {/* Testimonials Section */}
        <Box mb={16}>
          <Heading as="h2" size="xl" mb={8} textAlign="center">
            What Our Customers Say
          </Heading>
          <Stack direction={["column", "row"]} spacing={8} justify="center">
            <VStack
              maxW="300px"
              p={6}
              bg={bg}
              borderRadius="lg"
              boxShadow="md"
            >
              <Image
                src="https://via.placeholder.com/60"
                alt="User 1"
                borderRadius="full"
                mb={4}
              />
              <Text fontSize="lg" color="gray.600">
                "This tool has completely transformed how we manage our Twitter presence. The AI-powered automation is incredible!"
              </Text>
              <Heading as="h4" size="md" mt={2}>
                John Smith
              </Heading>
              <Text color="gray.400">CEO at Tech Corp</Text>
            </VStack>

            <VStack
              maxW="300px"
              p={6}
              bg={bg}
              borderRadius="lg"
              boxShadow="md"
            >
              <Image
                src="https://via.placeholder.com/60"
                alt="User 2"
                borderRadius="full"
                mb={4}
              />
              <Text fontSize="lg" color="gray.600">
                "The analytics and reporting features are top-notch. We've seen significant growth since implementing this solution."
              </Text>
              <Heading as="h4" size="md" mt={2}>
                Sarah Johnson
              </Heading>
              <Text color="gray.400">Marketing Director</Text>
            </VStack>
          </Stack>
        </Box>

        {/* CTA Section */}
        <Box
          textAlign="center"
          py={16}
          bg="teal.500"
          color="white"
          borderRadius="md"
        >
          <Heading as="h2" size="2xl" mb={4}>
            Ready to Transform Your Twitter Presence?
          </Heading>
          <Text mb={8} maxW="600px" mx="auto">
            Join thousands of satisfied customers who have already experienced the power of our AI-powered Twitter management solution.
          </Text>
          <Button
            colorScheme="white"
            size="lg"
            px={8}
            py={4}
            leftIcon={<FaArrowRight />}
            as={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Free Trial
          </Button>
        </Box>

        {/* Footer */}
        <Box mt={16}>
          <Heading as="h2" size="lg" mb={8} textAlign="center">
            Trusted by Leading Brands
          </Heading>
          <HStack justify="center" spacing={8} mb={12}>
            <Image src="logo1.png" alt="Brand 1" boxSize="100px" />
            <Image src="logo2.png" alt="Brand 2" boxSize="100px" />
            <Image src="logo3.png" alt="Brand 3" boxSize="100px" />
          </HStack>
          <Stack direction="row" spacing={8} justify="center" mb={8}>
            <Button variant="link" color="gray.600" href="/docs">
              Docs
            </Button>
            <Button variant="link" color="gray.600" href="/pricing">
              Pricing
            </Button>
            <Button variant="link" color="gray.600" href="/contact">
              Contact
            </Button>
            <Button variant="link" color="gray.600" href="/login">
              Login
            </Button>
          </Stack>
          <Text textAlign="center" color="gray.500" fontSize="sm">
            © 2023 Your Company Name. All rights reserved.
          </Text>
        </Box>
      </Container>
    </Box>
  );
}

export default HomePage;
