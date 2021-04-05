import React, { useState } from "react";
import styled from "styled-components";
import { ContractHelper } from "../services/contract";
import Popup from "./Popup";
import RevealComplete from "./RevealComplete";

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
        alert("Error: " + err.message);
      });
  };

  return (
    <>
      <Popup
        show={props.show && !revealed}
        close={() =>
          alert("Reveal Waifus before exiting or you can lose them forever")
        }
        header="Loading Purchase"
        body="When purchase is complete you must reveal immediately or risk losing your Waifus forever"
        buttonAction={() => {
          if (props.loading) return;
          reveal();
        }}
        buttonText={props.loading || loading ? "Loading" : "Reveal"}
      />
      <RevealComplete show={revealed} close={() => props.close()} />
    </>
  );
};

export default LoadingPurchase;
