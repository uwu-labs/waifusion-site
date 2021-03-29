import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Header from "../components/Header";

const StyledBrowsePage = styled.div``;

const BrowsePage: React.FC = () => {
  const [t] = useTranslation();

  return (
    <StyledBrowsePage>
      <Header text={t("headers.browse")} />
    </StyledBrowsePage>
  );
};

export default BrowsePage;
