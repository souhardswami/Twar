// NodeComponents.jsx
import { Input, Textarea, VStack, Text } from "@chakra-ui/react"; 
const StartNode = ({ value, onChange }) => (
    <VStack align="start" spacing={2}>
      <Text>Specify data Api</Text>
      <Input placeholder="Enter Api" value={value} onChange={onChange} disabled/>
    </VStack>
  );
export default StartNode;
  