// Frameworks
import React, { useContext, useEffect } from "react";
import { Flex, Button, Text, Box, Modal, Input } from "rimble-ui";
import { observer } from "mobx-react-lite";
import BN from "bn.js";

import {
  getAllowance,
  ethEnabled,
  getWETOwner,
  accumulatedForIndex,
  toEthUnit,
  getWETName,
  getWETContract,
  wetBalanceOf,
  getWaifuContract,
  isNameReserved,
} from "./utils/contracthelper";

import { getWaifuTraitsById } from "./utils/dbhelper";

import { GLOBALS } from "./utils/globals.js";

// Data Store
import { RootStoreContext } from "./stores/root.store";
import OverviewGreenBar from "../images/overview_green_bar.png";
import WaifuPinkBar from "../images/waifucard_pink_bar.png";
import WaifuDottedLine from "../images/waifu_dotted_line.png";
import FocusText from "../images/focus_waifu_card_text.png";
import BlurredText from "../images/blurred_text_crop.png";

// Main Route
const Detail = observer((props) => {
  const rootStore = useContext(RootStoreContext);
  const { walletStore, detailStore, transactionStore, WETStore } = rootStore;

  useEffect(() => {
    async function getWaifuDetails() {
      await updateWaifuState();
    }
    async function updateDetailWETS() {
      await updateDetailWETState();
    }
    updateDetailWETS();
    getWaifuDetails();

    return () => {
      detailStore.currentWaifu = null;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateWaifuState = async () => {
    detailStore.currentWaifu = await getWaifuTraitsById(props.detailId);
  };

  const updateDetailWETState = async () => {
    const accumulated = new BN(await accumulatedForIndex(props.detailId));
    detailStore.owner = await getWETOwner(props.detailId);
    detailStore.name = (await getWETName(props.detailId)) || "Unnamed";
    detailStore.accumulatedWET = Number(await toEthUnit(accumulated)).toFixed(
      2
    );
    detailStore.wetBalance = Number(
      await toEthUnit(await wetBalanceOf())
    ).toFixed(2);
  };

  const revealedWaifuIndex = (waifuIndex) => {
    return (Number(waifuIndex) + GLOBALS.STARTING_INDEX) % 16384;
  };

  const approveAccount = async () => {
    const ownerAddress = await getWETOwner(props.detailId);
    const defaultAddress = await ethEnabled();
    if (defaultAddress === ownerAddress) {
      const currentAllowance = await getAllowance();
      if (currentAllowance > 0) {
        detailStore.isApproved = true;
      } else {
        const wetContract = await getWETContract();
        wetContract.methods
          .approve(
            GLOBALS.WAIFU_CONTRACT_ADDRESS,
            new BN(GLOBALS.APPROVE_AMOUNT)
          )
          .send()
          .on("transactionHash", (hash) => {
            transactionStore.addPendingTransaction({
              txHash: hash,
              description: "Approval",
            });
          })
          .on("receipt", (receipt) => {
            console.log(receipt);
            detailStore.isPendingApproval = false;
            detailStore.isApproved = true;
          })
          .on("error", (err) => {
            console.log(err);
            detailStore.isPendingApproval = false;
          }); // If a out of gas error, the second parameter is the receipt.
      }
    }
  };

  const closeNCModal = () => {
    detailStore.isPendingNameChange = false;
    detailStore.isinsufficientBalance = false;
    detailStore.changedName = "";
  };

  const openNCModal = async () => {
    await approveAccount();
    detailStore.nameValidation = "";
    const wetBalance = await wetBalanceOf();
    const currentAllowance = await getAllowance();
    if (wetBalance >= GLOBALS.NAME_CHANGE_PRICE && currentAllowance > 0) {
      detailStore.isPendingNameChange = true;
    } else {
      detailStore.isinsufficientBalance = true;
    }
  };

  const validateChangeName = async () => {
    const regex = RegExp("^[a-zA-Z0-9 ]*$");
    if (
      !regex.test(detailStore.changedName) ||
      detailStore.changedName.length > 25 ||
      detailStore.changedName.length < 1
    ) {
      detailStore.nameValidation =
        "Name can only be alphanumeric and cannot be longer than 25 characters";
      return false;
    }

    if (
      /\s{2,}/.test(detailStore.changedName) ||
      detailStore.changedName[0] === " " ||
      detailStore.changedName[-1] === " "
    ) {
      detailStore.nameValidation =
        "Name cannot contain consecutive spaces, a trailing or a leading space";
      return false;
    }
    const isNewNameReserved = await isNameReserved(detailStore.changedName);
    if (isNewNameReserved === true) {
      detailStore.nameValidation =
        "This name has already been reserved. Please choose a new name";
      return false;
    }

    detailStore.changeNamePending = false;
    const waifuContract = await getWaifuContract();
    const name = detailStore.changedName;
    waifuContract.methods
      .changeName(props.detailId, detailStore.changedName)
      .send()
      .on("transactionHash", (hash) => {
        transactionStore.addPendingTransaction({
          txHash: hash,
          description: `Change Name for # ${props.detailId} NFTs `,
        });
      })
      // eslint-disable-next-line no-unused-vars
      .on("receipt", (receipt) => {
        detailStore.changeNamePending = true;
        updateDetailWETState();
        const index = props.detailId;

        WETStore.updateOwnedItem({ index, name });
      })
      .on("error", (err) => {
        console.log(err);
        detailStore.changeNamePending = true;
      }); // If a out of gas error, the second parameter is the receipt.
    closeNCModal();
  };

  const listTrait = (trait) => {
    if (trait.value) {
      return (
        <Button.Outline
          key={trait.trait_type}
          className="trait-buttons"
          title={trait.trait_type}
          disabled={true}
        >
          {trait.value}
        </Button.Outline>
      );
    }
  };

  return (
    <>
      <Box className="waifu-card-container">
        <Flex>
          <Box>
            <Box className="waifu-card-box waifu-pic-box  waifu-card wallet-waifu-card">
              <div className="box-upper">
                <img
                  src={WaifuPinkBar}
                  alt="pink nav bar"
                  className="waifu-card-box-pinkbar"
                />
                <Box
                  className="waifu-card-box-pink-sub waifu-pic-box waifu-card-sub-black"
                  color="white"
                  style={{ maxWidth: 1424, marginBottom: 1 }}
                >
                  <center className="waifu-pic-box-center waifu-card-pink-center">
                    <span className="card-box-center-pink-text test-margin">
                      <span className="waifu-box-number">Waifu Name: </span>
                      <span className="waifu-box-number">
                        {detailStore.name}
                      </span>
                    </span>
                    <img
                      className="waifu-dotted-line"
                      alt="dotted line"
                      src={WaifuDottedLine}
                    />
                    <img
                      className="waifu-focus-text"
                      alt="dotted line"
                      src={FocusText}
                    />
                    <img
                      className="waifu-card-image"
                      alt=""
                      src={
                        GLOBALS.WAIFUS_VIEWABLE_URL === ""
                          ? GLOBALS.DEFAULT_WAIFU_IMAGE
                          : GLOBALS.WAIFUS_VIEWABLE_URL +
                            "/" +
                            revealedWaifuIndex(props.detailId) +
                            ".png"
                      }
                    />
                    <br />
                    <img
                      className="waifu-blurred-text"
                      alt="blurred text"
                      src={BlurredText}
                    />
                    <br />
                    <img
                      className="waifu-dotted-line"
                      alt="dotted line"
                      style={{ paddingTop: "0px" }}
                      src={WaifuDottedLine}
                    />
                    <br />
                    <span className="card-box-center-pink-text test-margin">
                      <span className="waifu-box-number">No: </span>
                      <span className="waifu-box-number">
                        {" "}
                        {props.detailId} / {GLOBALS.TOTAL_WAIFUS}
                      </span>
                    </span>
                  </center>
                </Box>
              </div>
            </Box>
          </Box>
          <Box>
            <Box className="waifu-card-box waifu-card waifu-detail-box-sub waifu-detail-box-sub-container">
              <div className="box-upper waifu-detail-box-sub">
                <img
                  src={OverviewGreenBar}
                  className="waifu-card-box-greenbar"
                  alt="green nav bar"
                />
                <Box
                  className="waifu-card-box-sub waifu-detail-box-sub waifu-detail-box-sub"
                  color="white"
                >
                  <center className="waifu-card-box-center">
                    {detailStore.currentWaifu != null && (
                      <Box>
                        <Flex
                          className="waifu-wet-rules"
                          flexWrap="wrap"
                          style={{ maxwidth: "590px" }}
                        >
                          {detailStore.currentWaifu.attributes.map((trait) =>
                            listTrait(trait)
                          )}
                        </Flex>
                      </Box>
                    )}
                    <Box>
                      <div style={{ marginTop: "55px" }}>
                        <Text className="waifu-detail-text">
                          Current WET: {detailStore.wetBalance}
                        </Text>
                        <Text className="waifu-detail-text">
                          Accumulated WET: {detailStore.accumulatedWET}
                        </Text>
                        <Flex className="wallet-button-container">
                          {walletStore.defaultAddress === detailStore.owner && (
                            <Flex>
                              <Box>
                                <center>
                                  <Box className="wallet-buttons">
                                    <Button.Outline
                                      className="waifu-card-buttons"
                                      onClick={openNCModal}
                                    >
                                      <span className="waifu-button-learnmore">
                                        {" "}
                                        Change Name
                                      </span>{" "}
                                    </Button.Outline>
                                  </Box>
                                </center>
                              </Box>
                            </Flex>
                          )}
                        </Flex>
                      </div>
                    </Box>
                  </center>
                </Box>
              </div>
            </Box>
          </Box>
        </Flex>
      </Box>

      {/* CHANGE NAME MODAL */}
      <Modal isOpen={detailStore.isPendingNameChange}>
        <Box className="waifu-presale-container">
          <Box className="waifu-card-box">
            <div className="box-upper">
              <img
                src={OverviewGreenBar}
                alt="green nav bar"
                className="waifu-card-box-greenbar"
              />
              <Box
                className="waifu-card-box-presale-sub"
                color="white"
                style={{ maxWidth: 1000, marginBottom: 1 }}
              >
                <center className="waifu-card-box-center">
                  <div className="modal-header-text">
                    Please enter a new name
                  </div>
                  <Input
                    className="waifu-input waifu-input-name"
                    type="text"
                    placeholder="Please enter a new name"
                    value={detailStore.changedName}
                    onChange={(event) => {
                      detailStore.updateChangedName(event.target.value);
                    }}
                  ></Input>
                  <Text className="modal-error-text">
                    {detailStore.nameValidation}
                  </Text>
                  <br />
                  <Box className="modal-button-container">
                    <Button.Outline
                      className="modal-buttons"
                      onClick={closeNCModal}
                    >
                      <span className="waifu-button-learnmore"> Cancel</span>{" "}
                    </Button.Outline>
                    <Button.Outline
                      className="modal-buttons"
                      onClick={validateChangeName}
                    >
                      <span className="waifu-button-learnmore">
                        {" "}
                        Change Name
                      </span>{" "}
                    </Button.Outline>
                  </Box>
                </center>
              </Box>
            </div>
          </Box>
        </Box>
      </Modal>
      {/*INSUFFICIENT BALANCE MODAL */}
      <Modal isOpen={detailStore.isinsufficientBalance}>
        <Box className="waifu-presale-container">
          <Box className="waifu-card-box">
            <div className="box-upper">
              <img
                src={OverviewGreenBar}
                alt="green nav bar"
                className="waifu-card-box-greenbar"
              />
              <Box
                className="waifu-card-box-presale-sub"
                color="white"
                style={{ maxWidth: 1000, marginBottom: 1 }}
              >
                <center className="waifu-card-box-center">
                  <div className="modal-header-text">
                    Insufficient Balance or Allowance
                  </div>
                  <Text className="modal-main-text">
                    The balance is below the required amount for a name change
                    or there is not enough allowance/approval
                  </Text>
                  <br />
                  <Box className="modal-button-container">
                    <Button.Outline
                      className="modal-buttons"
                      onClick={closeNCModal}
                    >
                      <span className="waifu-button-learnmore"> Cancel</span>{" "}
                    </Button.Outline>
                  </Box>
                </center>
              </Box>
            </div>
          </Box>
        </Box>
      </Modal>
    </>
  );
});

export default Detail;
