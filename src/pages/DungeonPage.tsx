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
            text="Oh no! Many of your beloved waifus are enslaved in the Dungeon! Be a hero and save your beloved by buying her freedom, or be the villain and burn one of your current Waifus with WET in exchange for a new one from the dungeon."
            buttonAction={() => alert("Not implemented yet")}
            buttonText="Rescue Waifu"
          />
        </CardContainer>
        <div>me</div>
      </Content>
    </StyledDungeonPage>
  );
};

export default DungeonPage;
