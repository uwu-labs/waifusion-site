// Frameworks
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Flex, Button, Text, Box, Modal, Input } from "../components/ui";
import { observer } from "mobx-react-lite";

import { getWaifuTraitsById } from "./utils/dbhelper";
import { revealedWaifuIndex } from "./utils/waifuDisplay";

import { GLOBALS } from "./utils/globals.js";

// Data Store
import { RootStoreContext } from "./stores/root.store";
import OverviewGreenBar from "../images/overview_green_bar.png";
import WaifuPinkBar from "../images/waifucard_pink_bar.png";
import WaifuDottedLine from "../images/waifu_dotted_line.png";
import FocusText from "../images/focus_waifu_card_text.png";
import BlurredText from "../images/blurred_text_crop.png";

// Main Route
const Detail = observer(() => {
  const { detailId } = useParams();
  const rootStore = useContext(RootStoreContext);
  const { walletStore, detailStore, WETStore } = rootStore;

  useEffect(() => {
    async function load() {
      detailStore.currentWaifu = await getWaifuTraitsById(
        revealedWaifuIndex(detailId)
      );
      detailStore.owner = walletStore.defaultAddress;
      detailStore.name =
        detailStore.currentWaifu?.name || "Demo Waifu";
      detailStore.accumulatedWET = "12.34";
      detailStore.wetBalance = "9000.00";
    }
    load();
    return () => {
      detailStore.currentWaifu = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailId]);

  const closeNCModal = () => {
    detailStore.isPendingNameChange = false;
    detailStore.isinsufficientBalance = false;
    detailStore.changedName = "";
  };

  const openNCModal = () => {
    detailStore.nameValidation = "";
    detailStore.isPendingNameChange = true;
  };

  const validateChangeName = () => {
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
      detailStore.changedName[detailStore.changedName.length - 1] === " "
    ) {
      detailStore.nameValidation =
        "Name cannot contain consecutive spaces, a trailing or a leading space";
      return false;
    }

    detailStore.name = detailStore.changedName;
    WETStore.updateOwnedItem({
      index: Number(detailId),
      name: detailStore.changedName,
    });
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
    return null;
  };

  const attrs = detailStore.currentWaifu?.attributes || [];

  return (
    <>
      <Box className="waifu-card-container">
        <Flex>
          <Box>
            <Box className="waifu-card-box waifu-pic-box  waifu-card wallet-waifu-card">
              <div className="box-upper">
                <img loading="lazy" decoding="async"
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
                    <img loading="lazy" decoding="async"
                      className="waifu-dotted-line"
                      alt="dotted line"
                      src={WaifuDottedLine}
                    />
                    <img loading="lazy" decoding="async"
                      className="waifu-focus-text"
                      alt="dotted line"
                      src={FocusText}
                    />
                    <img loading="lazy" decoding="async"
                      className="waifu-card-image"
                      alt=""
                      src={
                        GLOBALS.WAIFUS_VIEWABLE_URL === ""
                          ? GLOBALS.DEFAULT_WAIFU_IMAGE
                          : GLOBALS.WAIFUS_VIEWABLE_URL +
                            "/" +
                            revealedWaifuIndex(detailId) +
                            ".png"
                      }
                    />
                    <br />
                    <img loading="lazy" decoding="async"
                      className="waifu-blurred-text"
                      alt="blurred text"
                      src={BlurredText}
                    />
                    <br />
                    <img loading="lazy" decoding="async"
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
                        {detailId} / {GLOBALS.TOTAL_WAIFUS}
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
                <img loading="lazy" decoding="async"
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
                          {attrs.map((trait) => listTrait(trait))}
                        </Flex>
                      </Box>
                    )}
                    <Box>
                      <div style={{ marginTop: "55px" }}>
                        <Text className="waifu-detail-text">
                          Current WET: {detailStore.wetBalance}
                        </Text>
                        <Text className="waifu-detail-text">
                          Unclaimed WET: {detailStore.accumulatedWET}
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

      <Modal
        isOpen={detailStore.isPendingNameChange}
        onDismiss={closeNCModal}
      >
        <Box className="waifu-presale-container">
          <Box className="waifu-card-box">
            <div className="box-upper">
              <img loading="lazy" decoding="async"
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
      <Modal
        isOpen={detailStore.isinsufficientBalance}
        onDismiss={closeNCModal}
      >
        <Box className="waifu-presale-container">
          <Box className="waifu-card-box">
            <div className="box-upper">
              <img loading="lazy" decoding="async"
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
