
// NodeComponents.jsx
import { Input, Textarea, VStack, Text } from "@chakra-ui/react";

const HashtagNode = ({ value, onChange }) => (
  <VStack align="start" spacing={2}>
    <Text>Enter Hashtags</Text>
    <Input
      placeholder="Enter hashtags"
      value={value}
      onChange={onChange}
    />
  </VStack>
);

export default HashtagNode;