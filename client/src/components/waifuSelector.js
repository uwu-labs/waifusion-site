import React from "react";
import styled from "styled-components";
import Popup from "./popup";
import { BoxUpper, BoxContent, Header, Content } from "../styles/BoxContent";

const StyledWaifuSelector = styled.div``;

const WaifuSelector = ({ show, close }) => {
  return (
    <StyledWaifuSelector>
      <Popup
        show={show}
        content={
          <BoxContent>
            <Header>Add Waifus to Burn</Header>
          </BoxContent>
        }
        close={() => close()}
      />
    </StyledWaifuSelector>
  );
};

export default WaifuSelector;
