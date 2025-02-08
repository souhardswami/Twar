import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const Cancel = () => (
  <Box textAlign="center" p={10}>
    <Heading>❌ Payment Cancelled</Heading>
    <Text>No worries! You can try again anytime.</Text>
  </Box>
);

export default Cancel;
