import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BoxContent, Header, Content } from "../styles/BoxContent";
import PendingButton from "../app/templates/pendingbutton";
import Popup from "./popup";
import RevealComplete from "./revealComplete";

/** Served from `public/waifus/gifs/` (Vite copies to dist root). */
const dungeonGif = (filename) =>
  `${import.meta.env.BASE_URL}waifus/gifs/${filename}`;

const StyledLoading = styled.div``;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorText = styled.div`
  font-family: VT323 !important;
  font-style: normal !important;
  font-weight: normal !important;
  font-size: 16px !important;
  line-height: 24px !important;
  color: red;
  margin-bottom: 30px;
`;

const Image = styled.img`
  width: 80%;
`;

const Loading = ({
  show,
  type,
  complete,
  demoMode,
  demoRevealedIds,
  onDemoFlowDone,
}) => {
  const [loading, setLoading] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!show) {
      setRevealed(false);
      setLoading(false);
    }
  }, [show]);

  const revealWaifus = async () => {
    setLoading(false);
    setRevealed(true);
  };

  const handlePopupClose = () => {
    if (!revealed) {
      if (typeof onDemoFlowDone === "function") onDemoFlowDone();
      return;
    }
    if (demoMode && onDemoFlowDone) {
      onDemoFlowDone();
      return;
    }
    window.location.href = "/";
  };

  return (
    <StyledLoading>
      <Popup
        show={show}
        close={handlePopupClose}
        content={
          !revealed ? (
            <BoxContent>
              <Header>
                {complete
                  ? "Reveal Waifus"
                  : type === "buying"
                  ? "Buying Waifus"
                  : "Burning Waifus"}
              </Header>
              {!complete && (
                <ErrorText>
                  {`After ${type}, you have 45 minutes to reveal or Waifus will be lost forever. If gas fees show as high, try again in 1 minute.`}
                </ErrorText>
              )}
              <Content>
                {complete ? (
                  <Image
                    src={dungeonGif("reveal.gif")}
                    alt="waifu reveal"
                  />
                ) : type === "buying" ? (
                  <Image src={dungeonGif("buying.gif")} alt="buying waifus" />
                ) : (
                  <Image src={dungeonGif("burning.gif")} alt="burning waifus" />
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
          ) : (
            <RevealComplete
              show={show}
              demoMode={demoMode}
              demoRevealedIds={demoRevealedIds}
              onDemoFlowDone={onDemoFlowDone}
            />
          )
        }
      />
    </StyledLoading>
  );
};

export default Loading;
