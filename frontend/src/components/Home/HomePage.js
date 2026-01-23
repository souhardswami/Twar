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
  IconButton,
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
  FaGithub,
  FaLinkedin,
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
  // Alternating section backgrounds
  const sectionBg = useColorModeValue("white", "gray.900");
  const sectionBgAlt = useColorModeValue("gray.50", "gray.800");
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
            gap={6}
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
                filter="blur(70px)" // Slightly reduced blur for cleaner look
                opacity={0.3}
                zIndex={0}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Blob 2: Rotate Counter-Clockwise */}
              <MotionBox
                position="absolute"
                bottom="-20%"
                left="-20%"
                w="250px"
                h="250px"
                bg="blue.200"
                filter="blur(70px)"
                opacity={0.3}
                zIndex={0}
                animate={{
                  rotate: [0, -360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                }}
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
      <Box py={20} bg={sectionBg}>
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
            {/* Feature Cards with hover effects */}
            <FeatureCard
              icon={FaRobot}
              title="Agentic Workflows"
              desc="Drag-and-drop studio to chain monitoring, strategy, and action agents."
              color="teal.500"
              delay={0}
              cardBg={cardBg}
            />
            <FeatureCard
              icon={FaBrain}
              title="RAG Knowledge"
              desc="Upload your docs. Agents answer questions using your specific company knowledge."
              color="purple.500"
              delay={0.1}
              cardBg={cardBg}
            />
            <FeatureCard
              icon={FaShieldAlt}
              title="Safety First"
              desc="Built-in safeguard layers ensure no off-policy tweets ever get posted."
              color="green.500"
              delay={0.2}
              cardBg={cardBg}
            />
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
      <Box py={24} bg={sectionBgAlt} position="relative">
        <Container maxW="container.xl">
          <Heading textAlign="center" mb={16} size="xl">
            How It Works
          </Heading>

          <Stack
            direction={{ base: "column", md: "row" }}
            gap={8}
            justify="center"
            align="start"
            position="relative"
          >
            {/* Connector Line (Desktop) */}
            <Box
              display={{ base: "none", md: "block" }}
              position="absolute"
              top="30px"
              left="15%"
              right="15%"
              height="2px"
              borderTop="2px dashed"
              borderColor="gray.300"
              zIndex={0}
            />

            <Step
              number="1"
              title="Connect Account"
              desc="Securely link your Twitter accounts to the Twar platform."
              delay={0}
            />
            <Step
              number="2"
              title="Design Flow"
              desc="Use Agent Studio to define how agents should behave and react."
              delay={0.2}
            />
            <Step
              number="3"
              title="Launch & Relax"
              desc="Activate your bots and watch them engage with your audience 24/7."
              delay={0.4}
            />
          </Stack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box py={20} textAlign="center" bg={sectionBg}>
        <Container maxW="container.md">
          <VStack gap={8} p={12} bg="teal.600" borderRadius="3xl" color="white" boxShadow="2xl">
            <Heading size="2xl">Ready to automate?</Heading>
            <Text fontSize="xl" opacity={0.9}>
              Join the future of social media marketing today.
            </Text>
            <Button
              size="xl"
              bg="white"
              color="teal.600"
              px={12}
              py={6}
              fontSize="lg"
              fontWeight="bold"
              _hover={{ bg: "gray.100", transform: "scale(1.05)" }}
              as={motion.button}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/register")}
            >
              Get Started for Free <FaRocket style={{ marginLeft: "8px" }} />
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* Footer */}
      <Box bg="gray.900" color="gray.400" py={12} borderTop="1px solid" borderColor="gray.800">
        <Container maxW="container.xl">
          <Stack direction={{ base: "column", md: "row" }} justify="space-between" align="center" gap={6}>
            <HStack gap={3}>
              <Image src="/logo.png" alt="Logo" boxSize="40px" objectFit="contain" />
              <Text color="white" fontWeight="bold" fontSize="xl">Twar</Text>
            </HStack>

            <Text fontSize="sm">© {new Date().getFullYear()} Twar. All rights reserved.</Text>

            <HStack gap={4}>
              <IconButton
                aria-label="Twitter"
                // As FaXTwitter if available, but staying safe with FaTwitter
                icon={<FaTwitter />}
                variant="ghost"
                color="gray.400"
                _hover={{ color: "white", bg: "whiteAlpha.200" }}
              />
              <IconButton
                aria-label="GitHub"
                icon={<FaGithub />}
                variant="ghost"
                color="gray.400"
                _hover={{ color: "white", bg: "whiteAlpha.200" }}
              />
              <IconButton
                aria-label="LinkedIn"
                icon={<FaLinkedin />}
                variant="ghost"
                color="gray.400"
                _hover={{ color: "white", bg: "whiteAlpha.200" }}
              />
            </HStack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

// Updated Feature Card with hover outline
const FeatureCard = ({ icon, title, desc, color, delay, cardBg }) => (
  <MotionBox
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    custom={delay}
    p={8}
    bg={cardBg}
    borderRadius="2xl"
    boxShadow="xl"
    border="1px solid"
    borderColor="transparent"
    _hover={{
      transform: "translateY(-8px)",
      boxShadow: "2xl",
      borderColor: "teal.100"
    }}
    transition="all 0.3s ease"
  >
    <Box
      p={3}
      bg={`${color.split('.')[0]}.50`}
      display="inline-block"
      borderRadius="xl"
      mb={6}
    >
      <Icon as={icon} w={6} h={6} color={color} />
    </Box>
    <Heading size="md" mb={3}>
      {title}
    </Heading>
    <Text color="gray.500" lineHeight="tall">
      {desc}
    </Text>
  </MotionBox>
);

// Updated Step to have background behind number to hide connector line
const Step = ({ number, title, desc, delay }) => (
  <VStack
    gap={4}
    textAlign="center"
    maxW="300px"
    as={motion.div}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    custom={delay}
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { delay, duration: 0.5 } }
    }}
    zIndex={1} // Sit on top of the dashed line
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
      border="4px solid" // Border matches background to "cut" the line? 
      borderColor={useColorModeValue("white", "gray.800")} // Dynamic border color
      mb={2}
    >
      {number}
    </Box>
    <Heading size="lg">{title}</Heading>
    <Text color="gray.500">{desc}</Text>
  </VStack>
);

export default HomePage;
