import React, { useContext, useEffect, useState } from "react";
import { observer } from 'mobx-react-lite';

import styled, { keyframes } from "styled-components";
import { BoxContent, Header } from "../styles/BoxContent";
import { Button } from "./ui";
import WaifuCard from "./waifuCard";

import { RootStoreContext } from "../app/stores/root.store";

const RevealWaifusContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
`;

const RevealWaifuThumb = styled.div`
  display: inline-block;
  text-align: center;
  & img {
    max-height: 300px;
    width: auto;
    max-width: 100%;
    object-fit: contain;
    vertical-align: top;
  }
`;

const revealWaifuSkel = keyframes`
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
`;

const RevealPlaceholderSlot = styled.div`
  display: inline-block;
  flex: 0 0 auto;
`;

const RevealWaifuSkeleton = styled.div`
  width: min(200px, 72vw);
  height: min(280px, 55vh);
  max-height: 300px;
  box-sizing: border-box;
  border: 2px solid rgba(24, 20, 37, 0.5);
  background: linear-gradient(
    110deg,
    #2a2638 0%,
    #2a2638 40%,
    #3f3a52 50%,
    #2a2638 60%,
    #2a2638 100%
  );
  background-size: 200% 100%;
  animation: ${revealWaifuSkel} 1.15s ease-in-out infinite;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const getRevealedWaifus = async (WETStore) => {
  const oldWaifuIds = WETStore.ownedItems.map(item => item.id);
  await WETStore.syncOwnedItems();
  const newWaifuIds = WETStore.ownedItems.map(item => item.id);
  return newWaifuIds.filter(newId => !oldWaifuIds.includes(newId));
}

const RevealComplete = observer(
  ({ show, demoMode, demoRevealedIds, onDemoFlowDone }) => {
  const rootStore = useContext(RootStoreContext);
  const { WETStore } = rootStore;
  const [revealedWaifuIds, setRevealedWaifuIds] = useState([]);
  const [loading, setLoading] = useState(false);

  const demoIdsKey = demoRevealedIds?.join(",") ?? "";

  useEffect(() => {
    if (!show) {
      setLoading(false);
      setRevealedWaifuIds([]);
      return;
    }
    if (demoMode) {
      setLoading(true);
      setRevealedWaifuIds([]);
      const ids =
        demoRevealedIds?.length > 0
          ? demoRevealedIds.map((id) => Number(id))
          : [1337];
      const t = window.setTimeout(() => {
        setRevealedWaifuIds(ids);
        setLoading(false);
      }, 650);
      return () => window.clearTimeout(t);
    }
    setLoading(true);
    setRevealedWaifuIds([]);
    getRevealedWaifus(WETStore)
      .then((value) => {
        setRevealedWaifuIds(value);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [show, demoMode, demoIdsKey, WETStore]);

  const skeletonCount = loading
    ? demoMode
      ? Math.min(Math.max(demoRevealedIds?.length || 1, 1), 3)
      : 3
    : 0;

  return (
    <BoxContent>
      <Header>
        {loading
          ? "Revealing…"
          : `${revealedWaifuIds.length} Waifu${
              revealedWaifuIds.length > 1 ? "s" : ""
            } Revealed!!!`}
      </Header>
      <RevealWaifusContainer>
        {loading
          ? Array.from({ length: skeletonCount }).map((_, i) => (
              <RevealPlaceholderSlot key={i}>
                <RevealWaifuSkeleton aria-hidden />
              </RevealPlaceholderSlot>
            ))
          : show &&
            revealedWaifuIds
              .map((id) => (
                <RevealWaifuThumb key={id}>
                  <WaifuCard cardIndex={id} />
                </RevealWaifuThumb>
              ))
              .slice(0, 3)}
      </RevealWaifusContainer>
      <ButtonContainer>
        {loading ? (
          <Button.Outline
            className="waifu-card-buttons"
            disabled
            style={{ visibility: "hidden", pointerEvents: "none" }}
            aria-hidden
          >
            <span className="waifu-button-learnmore">View Waifus</span>
          </Button.Outline>
        ) : (
          <Button.Outline
            className="waifu-card-buttons"
            onClick={() => {
              if (demoMode && onDemoFlowDone) {
                onDemoFlowDone();
                return;
              }
              window.location.href = "/";
            }}
          >
            <span className="waifu-button-learnmore">
              {demoMode && onDemoFlowDone ? "Close" : "View Waifus"}
            </span>
          </Button.Outline>
        )}
      </ButtonContainer>
    </BoxContent>
  );
}
);

export default RevealComplete;
