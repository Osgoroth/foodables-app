"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, LightMode } from "@chakra-ui/react";

export function Providers({ children }) {
  return (
    <CacheProvider>
      <ChakraProvider>
        <LightMode>{children}</LightMode>
      </ChakraProvider>
    </CacheProvider>
  );
}
