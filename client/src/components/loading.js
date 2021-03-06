import React, { useState } from "react";
import styled from "styled-components";
import { BoxUpper, BoxContent, Header, Content } from "../styles/BoxContent";
import PendingButton from "../app/templates/PendingButton";
import Popup from "./popup";
import { getDungeonContract } from "../app/utils/contracthelper";
import BN from "bn.js";
import { web3 } from "../app/utils/contracthelper";
import RevealComplete from "./revealComplete";

const StyledLoading = styled.div``;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 80%;
`;

const Loading = ({ show, type, complete }) => {
  const [loading, setLoading] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const revealWaifus = async () => {
    const dungeonContract = await getDungeonContract();
    dungeonContract.methods
      .revealWaifus()
      .send()
      .on("transactionHash", (hash) => {
        setLoading(true);
      })
      .on("receipt", (receipt) => {
        setLoading(false);
        setRevealed(true);
        alert("Waifus received");
      })
      .on("error", (err) => {
        alert("Error: " + err.message);
      });
  };

  return (
    <StyledLoading>
      <Popup
        show={show && !revealed}
        content={
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
                isPending={!complete || loading}
                clickEvent={() => {
                  if (complete) revealWaifus();
                }}
                text="Reveal Waifus"
              />
            </ButtonContainer>
          </BoxContent>
        }
      />
      <RevealComplete show={show && revealed} />
    </StyledLoading>
  );
};

export default Loading;
