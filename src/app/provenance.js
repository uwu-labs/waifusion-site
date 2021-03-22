// Frameworks
import React from "react";
import { Heading, Flex, Text, Box } from "rimble-ui";

// Main Route
const Provenance = () => {
  return (
    <>
      <Heading as={"h3"}>&nbsp;&nbsp;List</Heading>

      <Box mt={20}>
        <Flex>
          <Text>No items currently</Text>
        </Flex>
      </Box>
    </>
  );
};

export default Provenance;
