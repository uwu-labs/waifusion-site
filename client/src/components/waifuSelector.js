import React, { useState } from "react";
import styled from "styled-components";
import Popup from "./popup";
import { BoxUpper, BoxContent, Header, Content } from "../styles/BoxContent";
import { Box, Button } from "rimble-ui";
import Loading from "./loading";

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

const Cost = styled.p`
  width: 100%;
  text-align: center !important;
  font-family: VT323 !important;
  font-style: normal !important;
  font-weight: 400 !important;
  font-size: 32px !important;
  line-height: 42px !important;
  margin-top: 60px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WaifuSelector = ({ show, close }) => {
  const [waifus, setWaifus] = useState([]);
  const [waifuId, setWaifuId] = useState("");
  const [loading, setLoading] = useState(false);

  const AddWaifu = () => {
    if (waifuId === "") {
      alert("Must enter an ID");
      return;
    }
    const matching = waifus.filter((waifu) => waifu.id === waifuId);
    if (matching.length > 0) {
      alert("Waifu already added");
      return;
    }

    //TODO: find the id and save it
    const newWaifus = [...waifus];
    newWaifus.push({ id: waifuId });
    setWaifus(newWaifus);
    setWaifuId("");
  };

  return (
    <StyledWaifuSelector>
      <Popup
        show={show}
        content={
          <BoxContent>
            <Header>Add Waifus to Burn</Header>
            <SelectedWaifus>
              {waifus.map((waifu) => (
                <SelectedWaifu>{waifu.id}</SelectedWaifu>
              ))}
            </SelectedWaifus>
            {waifus.length < 3 && (
              <AddContainer>
                <AddInput
                  value={waifuId}
                  placeholder="Waifu ID"
                  onChange={(event) => setWaifuId(event.target.value)}
                ></AddInput>
                <AddButton onClick={() => AddWaifu()}>+</AddButton>
              </AddContainer>
            )}
            {waifus.length >= 1 && (
              <Cost>{`Cost: ${waifus.length * 5490} WET`}</Cost>
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
          setWaifuId("");
          close();
        }}
      />
      <Loading type={"burning"} show={loading} />
    </StyledWaifuSelector>
  );
};

export default WaifuSelector;
