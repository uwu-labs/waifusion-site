import React from "react";
import styled from "styled-components";
import { BoxUpper } from "../styles/BoxContent";
import { Box } from "rimble-ui";
import WaifuPinkBar from "../images/waifucard_pink_bar.png";

const StyledPopup = styled.div`
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

const Popup = ({ show, content, close }) => {
  if (!show) return null;

  return (
    <StyledPopup>
      <Box className="waifu-card-box">
        <BoxUpper>
          <button
          onClick={() => {
            if (close) close();
          }}          
          style={{ padding: '0 2px 0 0', borderWidth: 0, lineHeight: 1 }}
          >
            <img
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
