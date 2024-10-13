"use client";

import React, { ReactNode } from "react";
import { ChakraProvider, CSSReset, ColorModeScript } from "@chakra-ui/react";
import theme from "../../styles/themes";

interface ThemeContainerProps {
  children: ReactNode;
}

const ThemeContainer: React.FC<ThemeContainerProps> = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <CSSReset />
      {children}
    </ChakraProvider>
  );
};

export default ThemeContainer;
