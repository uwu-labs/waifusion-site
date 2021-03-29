import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Header from "../components/Header";

const StyledDungeonPage = styled.div``;

const DungeonPage: React.FC = () => {
  const [t] = useTranslation();

  return (
    <StyledDungeonPage>
      <Header text={t("headers.dungeon")} />
    </StyledDungeonPage>
  );
};

export default DungeonPage;
