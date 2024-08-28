import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: inter.style.fontFamily,
    body: inter.style.fontFamily,
  },
  colors: {
    brand: {
      50: "#e3f8ff",
      100: "#b3ecff",
      200: "#81defd",
      300: "#5ed0fa",
      400: "#40c3f7",
      500: "#2bb0ed",
      600: "#1992d4",
      700: "#127fbf",
      800: "#0b69a3",
      900: "#035388",
    },
    text: {
      light: "black",
      dark: "white",
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.800" : "white",
        color: props.colorMode === "dark" ? "whiteAlpha.900" : "black",
        fontFamily: inter.style.fontFamily,
      },
      h1: {
        color: props.colorMode === "dark" ? "text.dark" : "text.light",
      },
      h2: {
        color: props.colorMode === "dark" ? "text.dark" : "text.light",
      },
      p: {
        color: props.colorMode === "dark" ? "text.dark" : "text.light",
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
      },
      variants: {
        solid: (props: any) => ({
          bg: props.colorMode === "dark" ? "#0060DF" : "brand.500",
        }),
      },
    },
  },
});

export default theme;
