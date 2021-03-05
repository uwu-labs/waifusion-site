// Frameworks
import React, { useContext } from "react";
import { navigate } from "gatsby";
import {
  Heading,
  Blockie,
  Flex,
  EthAddress,
  Button,
  Text,
  Box,
} from "rimble-ui";

// Wallet Interface
import Wallet from "./wallets";

// Data Store
import { RootStoreContext } from "./stores/root.store";

// Main Route
const MaidCafe = (props) => {
  const rootStore = useContext(RootStoreContext);
  const { walletStore } = rootStore;

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

export default MaidCafe;
