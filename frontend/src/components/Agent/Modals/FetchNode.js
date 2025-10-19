import { Heading, Highlight, VStack } from "@chakra-ui/react";
const StartNode = ({ value, onChange }) => (
  <VStack align="start" spacing={2}>
    <VStack align="start" spacing={2}>
      <Heading lineHeight="tall">
        <Highlight
          query={["MCP", "serve", "Option"]}
          styles={{ px: "0.5", bg: "teal.muted" }}
        >
          It will Use Fetch Twitter MCP server, Currently you cant change any
          Options here.
        </Highlight>
      </Heading>
    </VStack>
  </VStack>
);
export default StartNode;
