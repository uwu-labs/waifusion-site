import React, { useContext, useEffect, useState } from "react";
import { observer } from 'mobx-react-lite';

import styled from "styled-components";
import Popup from "./popup";
import { BoxContent, Header } from "../styles/BoxContent";
import { Button, Loader } from "rimble-ui";
import WaifuCard from "./waifuCard.js";

import { RootStoreContext } from "../app/stores/root.store";

const StyledRevealComplete = styled.div``;

const RevealWaifusContainer = styled.div`
  display: flex;
  flex-direction: row;
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
  const newWaifus = WETStore.ownedItems;
  return newWaifus.filter(waifu => !oldWaifuIds.includes(waifu.id));
  return newWaifuIds.filter(newId => !oldWaifuIds.includes(newId));
}

const RevealComplete = observer(({ show }) => {
  const rootStore = useContext(RootStoreContext);
  const { WETStore } = rootStore;
  const [revealedWaifuIds, setRevealedWaifuIds] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(
    () => {
      if (show) {
        setLoading(true);
        getRevealedWaifus(WETStore)
        .then((value) => {
          setRevealedWaifuIds(value);
          setLoading(false);
        }).catch((err) => {
          setLoading(false);
        });
      }
    },
    [show, WETStore]
  )

  return (
    <StyledRevealComplete>
      <Popup
        show={show}
        content={
          <BoxContent>
            {
              loading 
                ? 
                  <Loader
                    className="wallet-waifu-loader"
                    color="#FBE55F"
                    size="80px"
                  />
                :
              <>
                <Header>{revealedWaifuIds.length} Waifu{revealedWaifuIds.length > 1 && 's'} Revealed!!!</Header>
                <RevealWaifusContainer>
                  {
                    show && (
                      revealedWaifuIds.map((id) => {
                        return <WaifuCard cardIndex={id} key={id} />
                      }).slice(0, 3)
                    )
                  }
                </RevealWaifusContainer>
                <ButtonContainer>
                  <Button.Outline
                    className="waifu-card-buttons"
                    onClick={() => {
                      window.location.href = "/app";
                    }}
                  >
                    <span className="waifu-button-learnmore">View Waifus</span>
                  </Button.Outline>
                </ButtonContainer>
              </>
            }
          </BoxContent>
        }
      />
    </StyledRevealComplete>
  );
});

export default RevealComplete;
