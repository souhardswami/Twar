import { Input, Textarea, VStack, Text } from "@chakra-ui/react";

const BotMonitoringNode = ({ value, onChange }) => (
  <VStack align="start" spacing={2}>
    <Text>Enter Bot Id</Text>
    <Input
      placeholder="Enter Bot Id"
      value={value}
      onChange={onChange}
    />
  </VStack>
);

export default BotMonitoringNode;