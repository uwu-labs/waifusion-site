import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import { PageContentWrapper } from "../components/CommonLayout";
import Header from "../components/Header";
import waifuImage from "../assets/dungeon-waifu.png";
import barsImage from "../assets/bars.png";
import BuyWaifu from "../components/BuyWaifu";
import BurnWaifu from "../components/BurnWaifu";
import {
  selectBnbBurnPrice,
  selectBuyPrice,
  selectIsEth,
  selectWetBurnPrice,
} from "../state/reducers/globals";
import Head from "../components/Head";

const StyledDungeonPage = styled(PageContentWrapper)`
  height: 70vh;

  @media (max-width: 768px) {
    height: auto;
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 3rem;
  }
`;

const CardContainer = styled.div`
  width: 50vw;

  @media (max-width: 768px) {
    width: 90vw;
  }
`;

const rotate = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 150% 50%;
  }
`;

const DropShadow = styled.div`
  box-shadow: 0px 4px 20px 20px rgba(0, 0, 0, 0.04);
  border-radius: 1rem;

  @media (max-width: 768px) {
    width: 90vw;
    margin-top: 2rem;
  }
`;

const DungeonCard = styled.div`
  position: relative;
  filter: saturate(1.05);
  padding: 0 2rem;
  border-radius: 1rem;
  background-color: var(--plain);
  border: 2px solid var(--text-secondary);
  box-shadow: 0 0.3rem 0 0 var(--text-secondary);
  font-size: 1.4rem;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(
      90deg,
      var(--primary) 0%,
      var(--secondary) 25%,
      var(--highlight) 50%,
      var(--secondary) 75%,
      var(--primary) 100%
    )
    0% 0% / 300% 300%;
  animation: ${rotate} 10s linear 0s infinite;
  overflow: hidden;
`;

const shake = keyframes`
  0% {
    transform: translateX(0);
  }
  95% {
    transform: translateX(-2px);
  }
  96% {
    transform: translateX(2px);
  }
  97% {
    transform: translateX(-2px);
  }
  98% {
    transform: translateX(2px);
  }
  99% {
    transform: translateX(-2px);
  }
  100% {
    transform: translateX(2px);
  }
`;

const WaifuImage = styled.img`
  position: relative;
  height: 50vh;
  animation: ${shake} 4s linear 0s infinite;
  user-drag: none;
  user-select: none;
`;

const BarsImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  user-drag: none;
  user-select: none;
`;

const DungeonPage: React.FC = () => {
  const [t] = useTranslation();
  const [buying, setBuying] = useState(false);
  const [burning, setBurning] = useState(false);
  const buyPrice = useSelector(selectBuyPrice);
  const wetBurnPrice = useSelector(selectWetBurnPrice);
  const bnbBurnPrice = useSelector(selectBnbBurnPrice);
  const isEth = useSelector(selectIsEth);

  const dungeonBody = isEth
    ? t("dungeon.description")
        .replace("[[BUY_PRICE]]", buyPrice)
        .replace("[[WET_BURN_PRICE]]", wetBurnPrice)
    : t("dungeon.descriptionBsc")
        .replace("[[BUY_PRICE]]", buyPrice)
        .replace("[[WET_BURN_PRICE]]", wetBurnPrice)
        .replace("[[BNB_BURN_PRICE]]", bnbBurnPrice);

  return (
    <StyledDungeonPage>
      <Head title="Dungeon" />
      <Header text={t("headers.dungeon")} />
      <Content>
        <CardContainer>
          <Card
            text={dungeonBody}
            buttonAction={() => setBuying(true)}
            buttonText={t("buttons.buyWaifu")}
            secondButtonAction={() => setBurning(true)}
            secondButtonText={t("buttons.burnWaifu")}
          />
        </CardContainer>
        <DropShadow>
          <DungeonCard>
            <WaifuImage src={waifuImage} />
            <BarsImage src={barsImage} />
          </DungeonCard>
        </DropShadow>
      </Content>
      <BuyWaifu show={buying} close={() => setBuying(false)} />
      <BurnWaifu show={burning} close={() => setBurning(false)} />
    </StyledDungeonPage>
  );
};

export default DungeonPage;
