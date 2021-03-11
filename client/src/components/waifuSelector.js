import React, { useState } from "react";
import styled from "styled-components";
import Popup from "./popup";
import { BoxContent, Header } from "../styles/BoxContent";
import { getDungeonContract } from "../app/utils/contracthelper";
import { Button } from "rimble-ui";
import BN from "bn.js";
import { web3 } from "../app/utils/contracthelper";
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
  margin-left: 10px;
`;

const ErrorText = styled.div`
  font-family: VT323 !important;
  font-style: normal !important;
  font-weight: normal !important;
  font-size: 16px !important;
  line-height: 24px !important;
  color: red;
`;

const SelectedWaifuContainer = styled.div`
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
  const [commitComplete, setCommitComplete] = useState(false);
  const [error, setError] = useState("");

  const AddWaifu = () => {
    if (!Number.isInteger(parseFloat(waifuId))) {
      setError("Must enter an ID");
      return;
    }
    if (waifuId < 0 || waifuId > 16384) {
      setError("Must enter an ID between 0 and 16384");
      return;
    }
    const matching = waifus.filter((waifu) => waifu.id === waifuId);
    if (matching.length > 0) {
      setError("Waifu already added");
      return;
    }

    //TODO: find the id and save it
    const newWaifus = [...waifus];
    newWaifus.push({ id: waifuId });
    setWaifus(newWaifus);
    setWaifuId("");
  };

  const removeWaifu = (id) => {
    const newWaifus = waifus.filter((waifu) => waifu.id !== id);
    setWaifus(newWaifus);
  };

  const doBurnWaifus = async () => {
    const dungeonContract = await getDungeonContract();
    const waifuIds = waifus.map((w) => w.id);
    const numToBurn = waifuIds.length;
    const estimatedGas = 200000 * numToBurn;
    dungeonContract.methods
      .commitSwapWaifus(waifuIds)
      .send({
        value: new BN(web3.utils.toWei("0.25")).mul(new BN(numToBurn)),
        gas: estimatedGas,
      })
      .on("transactionHash", (hash) => {
        setLoading(true);
        setCommitComplete(false);
      })
      .on("receipt", (receipt) => {
        setCommitComplete(true);
      })
      .on("error", (err) => {
        setLoading(false);
        console.log("error: ", err.message);
        setError("Error: Contract failure");
      });
  };

  if (!show) return null;

  return (
    <StyledWaifuSelector>
      <Popup
        show={show && !loading}
        content={
          <BoxContent>
            <Header>Add Waifus to Burn</Header>
            <SelectedWaifus>
              {waifus.map((waifu) => (
                <SelectedWaifuContainer key={waifu.id}>
                  <AddButton onClick={() => removeWaifu(waifu.id)}>-</AddButton>
                  <SelectedWaifu>{waifu.id}</SelectedWaifu>
                </SelectedWaifuContainer>
              ))}
            </SelectedWaifus>
            {waifus.length < 3 && (
              <>
                <AddContainer>
                  <AddInput
                    value={waifuId}
                    placeholder="Waifu ID"
                    onChange={(event) => {
                      setError("");
                      const val = event.target.value.replace(/[^0-9]/g, "");
                      setWaifuId(val);
                    }}
                  />
                  <AddButton onClick={() => AddWaifu()}>+</AddButton>
                </AddContainer>
                <ErrorText>{error}</ErrorText>
              </>
            )}
            {waifus.length >= 1 && (
              <Cost>{`Cost: ${waifus.length * 5490} WET`}</Cost>
            )}
            {waifus.length >= 1 && (
              <ButtonContainer>
                <Button.Outline
                  className="waifu-card-buttons"
                  onClick={() => {
                    doBurnWaifus();
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
      <Loading
        type={"burning"}
        show={show && loading}
        complete={commitComplete}
      />
    </StyledWaifuSelector>
  );
};

export default WaifuSelector;
