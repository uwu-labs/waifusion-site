import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Card from "../components/Card";
import { PageContentWrapper } from "../components/CommonLayout";
import Header from "../components/Header";

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
        <div>me</div>
      </Content>
    </StyledDungeonPage>
  );
};

export default DungeonPage;
