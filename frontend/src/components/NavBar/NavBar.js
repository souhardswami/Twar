import { Box, Flex, Link, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
export default function NavBar() {
  return (
    <Box as="nav" py={4}>
      <Flex justify="space-between" maxW="1200px" mx="auto" px={4}>
        <Button variant="brand" size="lg" fontWeight="bold">
          Twitter Bots Agent
        </Button>
        <Flex gap={4}>
          <Link as={RouterLink} to="/home" _hover={{ textDecoration: "none" }}>
            <Button variant="ghost">Home</Button>
          </Link>
          
          <Link as={RouterLink} to="/docs" _hover={{ textDecoration: "none" }}>
            <Button variant="ghost">Docs</Button>
          </Link>
          <Link as={RouterLink} to="/pricing" _hover={{ textDecoration: "none" }}>
            <Button variant="ghost">Pricing</Button>
          </Link>
          <Link as={RouterLink} to="/workspace" _hover={{ textDecoration: "none" }}>
            <Button variant="ghost">Workspace</Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}
