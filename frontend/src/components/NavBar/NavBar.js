import React from 'react';
import { Box, Flex, Link, Button, Heading } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <Box bg="blue.500" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Heading as="h1" size="lg" color="white">
          Twitter Bots Agent
        </Heading>
        <Flex alignItems="center">
          <Link as={RouterLink} to="/home" px={2} py={1} rounded="md" _hover={{ textDecoration: 'none', bg: 'blue.700' }} color="white">
            Home
          </Link>
          <Link as={RouterLink} to="/pricing" px={2} py={1} rounded="md" _hover={{ textDecoration: 'none', bg: 'blue.700' }} color="white">
            Pricing
          </Link>
          <Link as={RouterLink} to="/docs" px={2} py={1} rounded="md" _hover={{ textDecoration: 'none', bg: 'blue.700' }} color="white">
            Docs
          </Link>
          <Link as={RouterLink} to="/workspace" px={2} py={1} rounded="md" _hover={{ textDecoration: 'none', bg: 'blue.700' }} color="white">
            Workspace
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
