import React, { useState } from "react";
import styled from "styled-components";
import Popup from "./popup";
import { BoxUpper, BoxContent, Header, Content } from "../styles/BoxContent";
import { Box, Button } from "rimble-ui";
import Loading from "./loading";

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

  return (
    <StyledBuyWaifus>
      <Popup
        show={show}
        close={close}
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
                  console.log("meow");
                }}
              >
                <span className="waifu-button-learnmore">Buy Waifus</span>
              </Button.Outline>
            </ButtonContainer>
          </BoxContent>
        }
      />
      <Loading type={"buying"} show={loading} />
    </StyledBuyWaifus>
  );
};

export default BuyWaifus;
