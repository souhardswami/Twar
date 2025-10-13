 // NodeComponents.jsx
import { Input, Textarea, VStack, Text } from "@chakra-ui/react";
const StrategyNode = ({ value, onChange }) => (
    <VStack align="start" spacing={2}>
      <Text>Marketing Strategy</Text>
      <Textarea
        placeholder="Describe your marketing strategy..."
        value={value}
        onChange={onChange}
      />
    </VStack>
);

export default StrategyNode;
  