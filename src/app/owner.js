// Frameworks
import React, { useContext, useEffect } from "react";
import { Heading, Blockie, Flex, Text, Box } from "rimble-ui";
import { observer } from "mobx-react-lite";

// Wallet Interface
import { wetBalanceOf, toEthUnit } from "./utils/contracthelper.js";

// Data Store
import { RootStoreContext } from "./stores/root.store";

// Main Route
const Owner = observer((props) => {
  const rootStore = useContext(RootStoreContext);
  const { WETStore } = rootStore;

  useEffect(() => {
    async function updateWETS() {
      await updateWETState();
    }
    updateWETS();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateWETState = async () => {
    try {
      WETStore.wetBalance = Number(
        await toEthUnit(await wetBalanceOf(props.ownerId))
      ).toFixed(2);
    } catch (err) {
      console.log(err);
    }
    WETStore.totalAccumulatedLoading = false;
  };

  return (
    <>
      <Flex col-sm-12>
        <Box col-sm-8 width={1 / 2}>
          <Heading as={"h3"}>&nbsp;&nbsp;Owner</Heading>

          <Box mt={20}>
            <Flex>
              <Blockie seed={props.ownerId}></Blockie>
              <Text paddingLeft={"2"} paddingTop={"2"}>
                {props.ownerId}
              </Text>
            </Flex>
          </Box>
        </Box>
        <Box col-sm-4>
          <Text>Current WET: {WETStore.wetBalance}</Text>
          <Text>Accumulated WET: {WETStore.totalAccumulated}</Text>
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
//Need to update the Accumulated NCT field to be a pending one
export default Owner;
