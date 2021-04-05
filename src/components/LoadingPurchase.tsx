import React, { useState } from "react";
import styled from "styled-components";
import { ContractHelper } from "../services/contract";
import Loading from "./Loading";
import Popup from "./Popup";
import RevealComplete from "./RevealComplete";

const LoadingContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
`;

type Props = {
  show: boolean;
  close: () => void;
  loading: boolean;
};

const LoadingPurchase: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const reveal = async () => {
    const contractHelper = new ContractHelper();
    await contractHelper.init();
    const dungeonContract = await contractHelper.getDungeonContract();
    dungeonContract.methods
      .revealWaifus()
      .send()
      .on("transactionHash", (hash: any) => {
        setLoading(true);
      })
      .on("receipt", (receipt: any) => {
        setLoading(false);
        setRevealed(true);
      })
      .on("error", (err: any) => {
        alert(`Error: ${err.message}`);
      });
  };

  return (
    <>
      <Popup
        show={props.show && !revealed}
        close={() =>
          alert("Reveal Waifus before exiting or you can lose them forever")
        }
        header={
          props.loading
            ? "Loading Purchase"
            : loading
            ? "Loading Reveal"
            : "Ready to Reveal"
        }
        body={
          props.loading
            ? "When purchase is complete you must reveal immediately or risk losing your Waifus forever"
            : loading
            ? ""
            : "Your Waifus have been purchased! Click Reveal below to see what you got"
        }
        content={
          props.loading || loading ? (
            <LoadingContainer>
              <Loading />
            </LoadingContainer>
          ) : undefined
        }
        buttonAction={() => {
          if (props.loading || loading) return;
          reveal();
        }}
        buttonText={props.loading || loading ? "Loading" : "Reveal"}
      />
      <RevealComplete show={revealed} close={() => props.close()} />
    </>
  );
};

export default LoadingPurchase;
