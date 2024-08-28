"use client";

import React, { useEffect, useState } from "react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, ColorModeScript, CSSReset } from "@chakra-ui/react";
import theme from "./theme";

export function Providers({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      {isClient && (
        <CacheProvider>
          <ChakraProvider theme={theme}>
            <CSSReset />
            {children}
          </ChakraProvider>
        </CacheProvider>
      )}
    </>
  );
}
