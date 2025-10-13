// NodeComponents.jsx
import { Input, Textarea, VStack, Text } from "@chakra-ui/react";
const SafeguardNode = ({ value, onChange }) => (
    <VStack align="start" spacing={2}>
      <Text>Safeguard Rules</Text>
      <Textarea
        placeholder="Enter safeguard policies..."
        value={value}
        onChange={onChange}
      />
    </VStack>
  );

  export default SafeguardNode;