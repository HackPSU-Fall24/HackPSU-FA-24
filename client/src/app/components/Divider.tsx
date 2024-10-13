import React from "react";
import { Divider as ChakraDivider, Grid } from "@chakra-ui/react";

interface DividerProps {
  color?: string;
}

const Divider: React.FC<DividerProps> = ({ color = "gray.200" }) => {
  return (
    <Grid gridTemplateColumns="1fr 1fr" columnGap={12} opacity={0.4}>
      <ChakraDivider marginY={6} borderColor={color} />
      <ChakraDivider marginY={6} borderColor={color} />
    </Grid>
  );
};

export default Divider;
