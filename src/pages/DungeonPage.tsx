import React from "react";
import { useTranslation } from "react-i18next";
import styled, { keyframes } from "styled-components";
import Card from "../components/Card";
import { PageContentWrapper } from "../components/CommonLayout";
import Header from "../components/Header";
import image from "../assets/dungeon.png";

const StyledDungeonPage = styled(PageContentWrapper)`
  height: 70vh;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const CardContainer = styled.div`
  width: 50vw;
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
`;

const DungeonCard = styled.div`
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
`;

const Image = styled.img`
  height: 50vh;
`;

const DungeonPage: React.FC = () => {
  const [t] = useTranslation();

  return (
    <StyledDungeonPage>
      <Header text={t("headers.dungeon")} />
      <Content>
        <CardContainer>
          <Card
            text="Oh no... Many of our beloved waifus have been enslaved in the Dungeon! Be a hero and save your beloved Waifus by buying thier freedom for 0.7 ETH to get a random Waifu! Or burn a Waifu and pay 5,490 WET to free another random one from the Dungeon."
            buttonAction={() => alert("Not implemented yet")}
            buttonText="Buy Waifu"
            secondButtonAction={() => alert("Not implemented yet")}
            secondButtonText="Burn Waifu"
          />
        </CardContainer>
        <DropShadow>
          <DungeonCard>
            <Image src={image} />
          </DungeonCard>
        </DropShadow>
      </Content>
    </StyledDungeonPage>
  );
};

export default DungeonPage;
