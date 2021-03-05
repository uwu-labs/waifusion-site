import React, { useState } from "react";
import styled from "styled-components";
import Popup from "./popup";
import { BoxUpper, BoxContent, Header, Content } from "../styles/BoxContent";
import { Box, Button } from "rimble-ui";

const StyledWaifuSelector = styled.div``;

const SelectedWaifus = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SelectedWaifu = styled.div`
  font-family: VT323 !important;
  font-style: normal !important;
  font-weight: normal !important;
  font-size: 24px !important;
  line-height: 24px !important;
`;

const AddContainer = styled.div`
  display: flex;
  margin-top: 30px;
`;

const AddInput = styled.input`
  border: 2px solid
    rgba(24.000000469386578, 20.000000707805157, 37.00000159442425, 1) !important;
  text-align: center !important;
  font-family: VT323 !important;
  font-style: normal !important;
  font-weight: normal !important;
  font-size: 24px !important;
  line-height: 24px !important;
  height: 40px;
`;

const AddButton = styled.button`
  background-color: #fb74c6;
  width: 40px;
  height: 40px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-style: normal !important;
  font-weight: normal !important;
  font-size: 24px !important;
  line-height: 24px !important;
  color: #181525;
  border: none;
  outline: none;
  cursor: pointer;
  margin-left: 20px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
`;

const WaifuSelector = ({ show, close }) => {
  const [waifus, setWaifus] = useState([]);
  const [waifuName, setWaifuName] = useState("");

  const AddWaifu = () => {
    if (waifuName === "") {
      alert("Must enter a name");
      return;
    }
    const matching = waifus.filter((waifu) => waifu.name === waifuName);
    if (matching.length > 0) {
      alert("Waifu already added");
      return;
    }

    //TODO: find the id and save it
    const newWaifus = [...waifus];
    newWaifus.push({ name: waifuName, id: "123123" });
    setWaifus(newWaifus);
    setWaifuName("");
  };

  if (!show) return null;

  return (
    <StyledWaifuSelector>
      <Popup
        show={show}
        content={
          <BoxContent>
            <Header>Add Waifus to Burn</Header>
            <SelectedWaifus>
              {waifus.map((waifu) => (
                <SelectedWaifu>{waifu.name}</SelectedWaifu>
              ))}
            </SelectedWaifus>
            {waifus.length < 3 && (
              <AddContainer>
                <AddInput
                  value={waifuName}
                  placeholder="Waifu name"
                  onChange={(event) => setWaifuName(event.target.value)}
                ></AddInput>
                <AddButton onClick={() => AddWaifu()}>+</AddButton>
              </AddContainer>
            )}
            {waifus.length >= 1 && (
              <ButtonContainer>
                <Button.Outline
                  className="waifu-card-buttons"
                  onClick={() => {
                    console.log("meow");
                  }}
                >
                  <span className="waifu-button-learnmore">Burn Waifus</span>
                </Button.Outline>
              </ButtonContainer>
            )}
          </BoxContent>
        }
        close={() => {
          setWaifus([]);
          setWaifuName("");
          close();
        }}
      />
    </StyledWaifuSelector>
  );
};

export default WaifuSelector;
