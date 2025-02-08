import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const Success = () => (
  <Box textAlign="center" p={10}>
    <Heading>🎉 Payment Successful!</Heading>
    <Text>Your subscription is now active.</Text>
  </Box>
);

export default Success;
