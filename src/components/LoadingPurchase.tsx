import React, { useState } from "react";
import { useTranslation } from "react-i18next";
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
  isNftx?: boolean;
  nftxCount?: number;
};

const LoadingPurchase: React.FC<Props> = (props) => {
  const [t] = useTranslation();

  const [loading, setLoading] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const revealDungeon = async () => {
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
        alert(`${t("prefixes.error")}${err.message}`);
      });
  };

  const revealWrapper = async () => {
    const contractHelper = new ContractHelper();
    await contractHelper.init();
    const wrapperContract = await contractHelper.getWrapperContract();
    const estimatedGas = 350_000 * (props.nftxCount || 1);
    wrapperContract.methods
      .revealWaifusWithNFTX()
      .send({ gas: estimatedGas })
      .on("transactionHash", (hash: any) => {
        setLoading(true);
      })
      .on("receipt", (receipt: any) => {
        setLoading(false);
        setRevealed(true);
      })
      .on("error", (err: any) => {
        alert(`${t("prefixes.error")}${err.message}`);
      });
  };

  return (
    <>
      <Popup
        show={props.show && !revealed}
        close={() => alert(t("dungeon.exitWarning"))}
        header={
          props.loading
            ? t("dungeon.headers.loadingPurchase")
            : loading
            ? t("dungeon.headers.loadingReveal")
            : t("dungeon.headers.revealReady")
        }
        body={
          props.loading
            ? t("dungeon.bodys.loadingPurchase")
            : loading
            ? ""
            : t("dungeon.bodys.revealReady")
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
          if (props.isNftx) revealWrapper();
          else revealDungeon();
        }}
        buttonText={
          props.loading || loading ? t("buttons.loading") : t("buttons.reveal")
        }
      />
      <RevealComplete show={revealed} close={() => props.close()} />
    </>
  );
};

export default LoadingPurchase;
