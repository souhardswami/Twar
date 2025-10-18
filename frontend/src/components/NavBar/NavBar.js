import { Box, Flex, Link, Button, Image } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
export default function NavBar() {
  return (
    <Box as="nav" py={4}>
      <Flex justify="space-between" maxW="1200px" mx="auto" px={4}>
        <Button variant="brand" size="lg" fontWeight="bold">
          <Image src="/logo.png" alt="Logo" boxSize="50px" objectFit="cover" />
          Twar
        </Button>
        
        <Flex gap={4}>
          <Link as={RouterLink} to="/home" _hover={{ textDecoration: "none" }}>
            <Button variant="ghost">Home</Button>
          </Link>
          
          <Link as={RouterLink} to="/pricing" _hover={{ textDecoration: "none" }}>
            <Button variant="ghost">Pricing</Button>
          </Link>
          <Link as={RouterLink} to="/agent-studio" _hover={{ textDecoration: "none" }}>
            <Button variant="ghost">Agent Studio</Button>
          </Link>
          <Link as={RouterLink} to="/workspace" _hover={{ textDecoration: "none" }}>
            <Button variant="ghost">Workspace</Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}
