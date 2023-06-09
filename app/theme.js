// theme.js
// from: https://chakra-ui.com/docs/styled-system/color-mode

// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";

// 2. Add your color mode config
const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const globals = {
  styles: {
    global: {
      
    },
  },
};

// 3. extend the theme
const theme = extendTheme({ config }, { globals });

export default theme;
