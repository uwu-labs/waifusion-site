import React, { useContext, useEffect } from "react";
import { observer } from 'mobx-react-lite';

import styled from "styled-components";
import Popup from "./popup";
import { BoxContent, Header } from "../styles/BoxContent";
import { Button } from "rimble-ui";
import WaifuCard from "./waifuCard.js";

import { RootStoreContext } from "../app/stores/root.store";

const StyledRevealComplete = styled.div``;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const getRevealedWaifus = async (WETStore) => {
  const oldWaifuIds = WETStore.ownedItems.map(item => item.id);
  await WETStore.syncOwnedItems();
  const newWaifus = WETStore.ownedItems;
  return newWaifus.filter(waifu => !oldWaifuIds.includes(waifu.id));
}

const RevealComplete = observer(({ show }) => {
  const rootStore = useContext(RootStoreContext);
  const { WETStore } = rootStore;
  const [revealedWaifus, setRevealedWaifus] = useState([])
  
  useEffect(() => {
    if (show) {
      getRevealedWaifus(WETStore).then((value) => {
        setRevealedWaifus(value);
      })
    }
  })

  return (
    <StyledRevealComplete>
      <Popup
        show={show}
        content={
          <BoxContent>
            <Header>Waifu Revealed!!!</Header>
            {
              show && (
                revealedWaifus.map((item) => {
                  return <WaifuCard cardIndex={item.id} />
                })
              )
            }
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
          </BoxContent>
        }
      />
    </StyledRevealComplete>
  );
});

export default RevealComplete;
