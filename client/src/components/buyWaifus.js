import React, { useState } from "react";
import styled from "styled-components";
import Popup from "./popup";
import { BoxUpper, BoxContent, Header, Content } from "../styles/BoxContent";
import { Box, Button } from "rimble-ui";
import Loading from "./loading";
import { getDungeonContract } from "../app/utils/contracthelper";
import BN from "bn.js";
import { web3 } from "../app/utils/contracthelper";

const StyledBuyWaifus = styled.div``;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  border: 2px solid
    rgba(24.000000469386578, 20.000000707805157, 37.00000159442425, 1) !important;
  text-align: center !important;
  font-family: VT323 !important;
  font-style: normal !important;
  font-weight: normal !important;
  font-size: 24px !important;
  line-height: 24px !important;
  height: 40px;
  width: 100px;
  margin-bottom: 30px;
`;

const BuyWaifus = ({ show, close }) => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");

  const validatePurchase = async () => {
    if (amount > 20) {
      alert("Maximum of 20 allowed");
      return false;
    }
    if (amount <= 0) {
      alert("Number of Waifus cannot be 0 or negative");
      return false;
    }

    const dungeonContract = await getDungeonContract();
    const estimatedGas = 200000 * amount;
    dungeonContract.methods
      .commitBuyWaifus(amount)
      .send({
        value: new BN(web3.utils.toWei("0.7")).mul(new BN(amount)),
        gas: estimatedGas,
      })
      .on("transactionHash", (hash) => {
        console.log("TransactionHash Call");
        console.log(hash);
        setLoading(true);
        // transactionStore.addPendingTransaction({
        //   txHash: hash,
        //   description: `Buy ${homeStore.purchaseQuantity} NFTs `,
        // });
        // closeBuyModal();
      })
      .on("receipt", (receipt) => {
        console.log("Receipt call");
        console.log(receipt);
        // homeStore.pendingBuy = false;
        // updatePriceAndSupply();
      })
      .on("error", (err) => {
        console.log("Error Call");
        console.log(err);
        // homeStore.validationResults = err.message;
        // homeStore.pendingBuy = false;
      });
  };

  return (
    <StyledBuyWaifus>
      <Popup
        show={show && !loading}
        close={() => {
          setAmount("");
          close();
        }}
        content={
          <BoxContent>
            <Header>Select Amount to Buy</Header>
            <Input
              type="number"
              value={amount}
              placeholder="0"
              onChange={(event) => setAmount(event.target.value)}
            ></Input>
            <ButtonContainer>
              <Button.Outline
                className="waifu-card-buttons"
                onClick={() => {
                  validatePurchase();
                }}
              >
                <span className="waifu-button-learnmore">Buy Waifus</span>
              </Button.Outline>
            </ButtonContainer>
          </BoxContent>
        }
      />
      <Loading type={"buying"} show={show && loading} />
    </StyledBuyWaifus>
  );
};

export default BuyWaifus;
