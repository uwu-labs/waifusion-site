import React from "react";
import styled from "styled-components";
import { BoxUpper } from "../styles/BoxContent";
import { Box } from "./ui";
import WaifuPinkBar from "../images/waifucard_pink_bar.png";

const StyledPopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20000;
  isolation: isolate;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Popup = ({ show, content, close }) => {
  if (!show) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && typeof close === "function") {
      close();
    }
  };

  return (
    <StyledPopup
      className="waifu-popup-overlay"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <Box className="waifu-card-box">
        <BoxUpper>
          <button
          onClick={() => {
            if (close) close();
          }}          
          style={{ padding: '0 2px 0 0', borderWidth: 0, lineHeight: 1 }}
          >
            <img loading="lazy" decoding="async"
              src={WaifuPinkBar}
              className="waifu-card-box-pinkbar"
              alt="pink nav bar"
            />
          </button>
          {content}
        </BoxUpper>
      </Box>
    </StyledPopup>
  );
};

export default Popup;
