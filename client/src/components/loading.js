import React from "react";
import styled from "styled-components";
import { BoxUpper, BoxContent, Header, Content } from "../styles/BoxContent";
import { Box, Button } from "rimble-ui";

const StyledLoading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = () => {
  return (
    <StyledLoading>
      <Box className="waifu-card-box">
        <BoxUpper>
          <img src={WaifuPinkBar} className="waifu-card-box-pinkbar" />
          <BoxContent>
            <Header>Buy Waifus</Header>
            <Content>
              Buy a new Waifu from the Maid Cafe for 0.7 ETH. You will recieve a
              random Waifu from the Cafe.
            </Content>
            <ButtonContainer>
              <Button.Outline
                className="waifu-card-buttons"
                onClick={() => console.log("meow")}
              >
                <span className="waifu-button-learnmore">Buy WAIFU</span>
              </Button.Outline>
            </ButtonContainer>
          </BoxContent>
        </BoxUpper>
      </Box>
    </StyledLoading>
  );
};
