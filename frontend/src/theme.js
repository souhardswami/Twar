
import { extendTheme} from "@chakra-ui/react";

const theme = {
  fonts: {
    heading: "Inter, sans-serif",
    body: "Inter, sans-serif",
  },
  colors: {
    brand: {
      primary: "#2D3748",
      secondary: "#4A5568",
      accent: "#48BB78",
      success: "#3B82F6",
      warning: "#F6AD55",
      error: "#F56565",
      light: "#E2E8F0",
      dark: "#1A202C",
    },
  },
  components: {
    Button: {
      variants: {
        primary: {
          bg: "brand.accent",
          color: "white",
          _hover: { bg: "brand.accent.600" },
        },
        secondary: {
          bg: "brand.secondary",
          color: "white",
          _hover: { bg: "brand.secondary.600" },
        },
        outline: {
          borderColor: "brand.primary",
          color: "brand.primary",
        },
      },
    },
    Input: {
      variants: {
        outline: {
          borderColor: "#E2E8F0",
          _focus: {
            borderColor: "brand.accent",
          },
        },
      },
    },
  },
  breakpoints: {
    sm: "320px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
};

export default extendTheme(theme);
