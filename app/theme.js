import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Input: {
      defaultProps: {
        variant: "outline",
      },
    },
    Textarea: {
      defaultProps: {
        colorScheme: "teal",
      },
    },
  },
});

export default theme;
