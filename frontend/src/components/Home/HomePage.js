import React from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  Stack,
  Image,
  SimpleGrid,
  Icon,
  VStack,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaRobot,
  FaChartLine,
  FaShieldAlt,
  FaBrain,
  FaArrowRight,
  FaTwitter,
  FaRocket,
} from "react-icons/fa";
// Import from local UI component for v3 support
import { useColorModeValue } from "../ui/color-mode";

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionStack = motion(Stack);

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const HomePage = () => {
  const navigate = useNavigate();
  // value for background gradient
  const bgGradient = useColorModeValue(
    "linear-gradient(to bottom right, var(--chakra-colors-gray-50), var(--chakra-colors-blue-50))",
    "linear-gradient(to bottom right, var(--chakra-colors-gray-900), var(--chakra-colors-gray-800))"
  );
  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <Box bg={bgGradient} minH="100vh" overflowX="hidden">
      {/* Hero Section */}
      <Container maxW="container.xl" pt={{ base: 20, md: 32 }} pb={20}>
        <Stack
          direction={{ base: "column", lg: "row" }}
          align="center"
          gap={{ base: 10, lg: 20 }}
        >
          {/* Hero Content */}
          <MotionStack
            flex={1}
            gap={6} // v3 uses gap instead of spacing in some contexts, but Stack supports both usually.
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <MotionBox variants={fadeInUp}>
              <Badge
                colorPalette="teal"
                fontSize="sm"
                px={3}
                py={1}
                borderRadius="full"
                mb={2}
              >
                🚀 The Future of Twitter Marketing
              </Badge>
            </MotionBox>

            <MotionHeading
              as="h1"
              size="4xl"
              fontWeight="extrabold"
              lineHeight="1.2"
              variants={fadeInUp}
            >
              Build Autonomous{" "}
              <Text as="span" color="teal.500">
                Agentic Workflows
              </Text>
            </MotionHeading>

            <MotionText
              fontSize="xl"
              color="gray.500"
              maxW="lg"
              variants={fadeInUp}
            >
              Scale your brand with AI-powered agents that monitor, analyze, and
              engage safely. No code required.
            </MotionText>

            <MotionStack direction="row" gap={4} variants={fadeInUp}>
              <Button
                size="lg"
                colorPalette="teal"
                onClick={() => navigate("/register")}
                px={8}
                fontSize="md"
                as={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started <FaArrowRight style={{ marginLeft: "8px" }} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                colorPalette="gray"
                onClick={() => navigate("/login")}
                fontSize="md"
                as={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Live Demo
              </Button>
            </MotionStack>
          </MotionStack>

          {/* Hero Image */}
          <MotionBox
            flex={1}
            display="flex"
            justifyContent="center"
          >
            <Box position="relative">
              {/* Blob 1: Rotate Clockwise */}
              <MotionBox
                position="absolute"
                top="-20%"
                right="-20%"
                w="300px"
                h="300px"
                bg="teal.200"
                filter="blur(70px)"
                opacity={0.4}
                zIndex={0}
              />

              {/* Blob 2: Rotate Counter-Clockwise */}
              <MotionBox
                position="absolute"
                bottom="-20%"
                left="-20%"
                w="200px"
                h="200px"
                bg="blue.200"
                filter="blur(70px)"
                opacity={0.4}
                zIndex={0}
              />

              <Image
                src="/agent6.png"
                alt="AI Agent"
                maxH="500px"
                objectFit="contain"
                className="agent-svg"
                zIndex={1}
                position="relative"
              />
            </Box>
          </MotionBox>
        </Stack>
      </Container>


      {/* Features Section */}
      <Box py={20} bg={useColorModeValue("white", "gray.900")}>
        <Container maxW="container.xl">
          <VStack gap={4} textAlign="center" mb={16}>
            <Badge colorPalette="purple">Features</Badge>
            <Heading size="2xl">Everything you need to scale</Heading>
            <Text fontSize="lg" color="gray.500" maxW="2xl">
              From intelligent monitoring to safe automated replies, Twar gives you
              superpowers.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={10}>
            {/* Feature 1 */}
            <FeatureCard
              icon={FaRobot}
              title="Agentic Workflows"
              desc="Drag-and-drop studio to chain monitoring, strategy, and action agents."
              color="teal.500"
              delay={0}
              cardBg={cardBg}
            />
            {/* Feature 2 */}
            <FeatureCard
              icon={FaBrain}
              title="RAG Knowledge"
              desc="Upload your docs. Agents answer questions using your specific company knowledge."
              color="purple.500"
              delay={0.1}
              cardBg={cardBg}
            />
            {/* Feature 3 */}
            <FeatureCard
              icon={FaShieldAlt}
              title="Safety First"
              desc="Built-in safeguard layers ensure no off-policy tweets ever get posted."
              color="green.500"
              delay={0.2}
              cardBg={cardBg}
            />
            {/* Feature 4 */}
            <FeatureCard
              icon={FaChartLine}
              title="Real-time Analytics"
              desc="Track engagement, bot performance, and ROI in a unified dashboard."
              color="orange.500"
              delay={0.3}
              cardBg={cardBg}
            />
          </SimpleGrid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box py={24} bg={bgGradient}>
        <Container maxW="container.xl">
          <Heading textAlign="center" mb={16} size="xl">
            How It Works
          </Heading>
          <Stack
            direction={{ base: "column", md: "row" }}
            gap={8}
            justify="center"
            align="start"
          >
            <Step
              number="1"
              title="Connect Account"
              desc="Securely link your Twitter accounts to the Twar platform."
            />
            <Step
              number="2"
              title="Design Flow"
              desc="Use Agent Studio to define how agents should behave and react."
            />
            <Step
              number="3"
              title="Launch & Relax"
              desc="Activate your bots and watch them engage with your audience 24/7."
            />
          </Stack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box py={20} textAlign="center">
        <Container maxW="container.md">
          <VStack gap={8} p={10} bg="teal.600" borderRadius="2xl" color="white" boxShadow="2xl">
            <Heading size="2xl">Ready to automate?</Heading>
            <Text fontSize="xl">
              Join the future of social media marketing today.
            </Text>
            <Button
              size="xl"
              bg="white"
              color="teal.600"
              px={10}
              py={4}
              fontSize="lg"
              _hover={{ bg: "gray.100" }}
              onClick={() => navigate("/register")}
            >
              Get Started for Free <FaRocket style={{ marginLeft: "8px" }} />
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* Footer */}
      <Box bg="gray.900" color="gray.400" py={10}>
        <Container maxW="container.xl">
          <Stack direction={{ base: "column", md: "row" }} justify="space-between" align="center">
            <HStack gap={2}>
              {/* <Icon as={FaTwitter} boxSize={6} color="white" /> */}
              <Image src="/logo.png" alt="Logo" boxSize="50px" objectFit="cover" />
              <Text color="white" fontWeight="bold" fontSize="lg">Twar</Text>
            </HStack>
            <Text>© 2026 Twar. All rights reserved.</Text>
            <HStack gap={6}>
              <Text as="a" href="#" _hover={{ color: "white" }}>Privacy</Text>
              <Text as="a" href="#" _hover={{ color: "white" }}>Terms</Text>
              <Text as="a" href="#" _hover={{ color: "white" }}>Contact</Text>
            </HStack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

const FeatureCard = ({ icon, title, desc, color, delay, cardBg }) => (
  <MotionBox
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    custom={delay}
    p={8}
    bg={cardBg}
    borderRadius="xl"
    boxShadow="lg"
    _hover={{ transform: "translateY(-8px)", boxShadow: "xl" }}
    transition="all 0.3s ease"
  >
    <Icon as={icon} w={10} h={10} color={color} mb={6} />
    <Heading size="md" mb={4}>
      {title}
    </Heading>
    <Text color="gray.500" lineHeight="tall">
      {desc}
    </Text>
  </MotionBox>
);

const Step = ({ number, title, desc }) => (
  <VStack
    gap={4}
    textAlign="center"
    maxW="300px"
    as={motion.div}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={fadeInUp}
  >
    <Box
      w="60px"
      h="60px"
      borderRadius="full"
      bg="teal.500"
      color="white"
      fontSize="2xl"
      fontWeight="bold"
      display="flex"
      alignItems="center"
      justifyContent="center"
      boxShadow="lg"
      mb={2}
    >
      {number}
    </Box>
    <Heading size="lg">{title}</Heading>
    <Text color="gray.500">{desc}</Text>
  </VStack>
);

export default HomePage;
