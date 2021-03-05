import React, { useState } from "react";
import styled from "styled-components";
import { BoxUpper, BoxContent, Header, Content } from "../styles/BoxContent";
import { Box, Button } from "rimble-ui";
import WaifuPinkBar from "../images/waifucard_pink_bar.png";
import PendingButton from "../app/templates/PendingButton";
// import burning from "../assets/burning.gif";

const StyledLoading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 80%;
`;

const Loading = ({ type }) => {
  const [loading, setLoading] = useState(true);

  return (
    <StyledLoading>
      <Box className="waifu-card-box">
        <BoxUpper>
          <img src={WaifuPinkBar} className="waifu-card-box-pinkbar" />
          <BoxContent>
            <Header>
              {type === "buying" ? "Buying Waifus" : "Burning Waifus"}
            </Header>
            <Content>
              {type === "buying" ? (
                <Image
                  src={
                    "https://media1.tenor.com/images/40cdfd153b02a70564d7e8604186b48d/tenor.gif"
                  }
                  alt="waifu burning gif"
                />
              ) : (
                <Image
                  src={
                    "https://66.media.tumblr.com/311eed36611a97770bbd34ed7ddf7c51/tumblr_mzlz15oTCC1smhnwfo1_500.gif"
                  }
                  alt="waifu burning gif"
                />
              )}
            </Content>
            <ButtonContainer>
              <PendingButton
                isPending={loading}
                clickEvent={() => console.log("meow")}
                text="Reveal Waifus"
              />
            </ButtonContainer>
          </BoxContent>
        </BoxUpper>
      </Box>
    </StyledLoading>
  );
};

export default Loading;
