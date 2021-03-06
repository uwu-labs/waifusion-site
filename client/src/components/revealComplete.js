import React from "react";
import styled from "styled-components";
import Popup from "./popup";
import { BoxUpper, BoxContent, Header, Content } from "../styles/BoxContent";
import { Box, Button } from "rimble-ui";

const StyledRevealComplete = styled.div``;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RevealComplete = ({ show, close }) => {
  return (
    <StyledRevealComplete>
      <Popup
        show={show}
        close={close}
        content={
          <BoxContent>
            <Header>Select Amount to Buy</Header>
            <ButtonContainer>
              <Button.Outline
                className="waifu-card-buttons"
                onClick={() => {
                  console.log("we");
                }}
              >
                <span className="waifu-button-learnmore">Buy Waifus</span>
              </Button.Outline>
            </ButtonContainer>
          </BoxContent>
        }
      />
    </StyledRevealComplete>
  );
};

export default RevealComplete;
