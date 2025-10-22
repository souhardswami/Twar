import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
  theme: {
    semanticTokens: {
      colors: {
        grey: {
          solid: {
            value: { _light: "{colors.grey.500}", _dark: "{colors.grey.300}" },
          },
        },
      },
    },
  },
});