import React from "react";
import AllRoute from "./AllRoute";
import { Box } from "@chakra-ui/react";

const Wrapper = () => {
  return (
    <Box mt={{ base: "4", md: "8" }} mb={{ base: "4", md: "8" }}>
      <AllRoute />
    </Box>
  );
};

export default Wrapper;
