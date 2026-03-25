// Frameworks
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Heading, Blockie, Flex, Text, Box } from "../components/ui";
import { observer } from "mobx-react-lite";

// Data Store
import { RootStoreContext } from "./stores/root.store";

// Main Route
const Owner = observer(() => {
  const { ownerId } = useParams();
  const rootStore = useContext(RootStoreContext);
  const { WETStore } = rootStore;

  useEffect(() => {
    WETStore.wetBalance = "42.00";
    WETStore.totalAccumulatedLoading = false;
  }, [WETStore]);

  return (
    <>
      <Flex col-sm-12>
        <Box col-sm-8 width={1 / 2}>
          <Heading as={"h3"}>&nbsp;&nbsp;Owner</Heading>

          <Box mt={20}>
            <Flex>
              <Blockie seed={ownerId}></Blockie>
              <Text paddingLeft={"2"} paddingTop={"2"}>
                {ownerId}
              </Text>
            </Flex>
          </Box>
        </Box>
        <Box col-sm-4>
          <Text>Current WET: {WETStore.wetBalance}</Text>
          <Text>Unclaimed WET: {WETStore.totalAccumulated}</Text>
        </Box>
      </Flex>
      <Flex>
        <Box>
          <Heading as={"h3"}>
            &nbsp;&nbsp;Owned Waifusions {WETStore.items.length}
          </Heading>
          <Text>Owned</Text>
        </Box>
      </Flex>
    </>
  );
});

export default Owner;
