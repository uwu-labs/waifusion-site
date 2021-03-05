import React, { useState } from "react";
import styled from "styled-components";
import { BoxUpper, BoxContent, Header, Content } from "../styles/BoxContent";
import PendingButton from "../app/templates/PendingButton";
import Popup from "./popup";

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

const Loading = ({ show, type }) => {
  const [loading, setLoading] = useState(true);

  return (
    <StyledLoading>
      <Popup
        show={show}
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
                isPending={loading}
                clickEvent={() => console.log("meow")}
                text="Reveal Waifus"
              />
            </ButtonContainer>
          </BoxContent>
        }
      />
    </StyledLoading>
  );
};

export default Loading;
