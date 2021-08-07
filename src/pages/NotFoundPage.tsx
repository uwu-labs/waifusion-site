import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Head from "../components/Head";
import Header from "../components/Header";

const StyledNotFoundPage = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledNotFoundText = styled.h1`
  background: linear-gradient(
      45deg,
      var(--primary) 0%,
      var(--secondary) 25%,
      var(--highlight) 50%,
      var(--secondary) 75%,
      var(--primary) 100%
    )
    0% 0% / 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-animation: ZMLIY 3s linear 0s infinite;
  animation: ZMLIY 3s linear 0s infinite;
`;

const NotFoundPage: React.FC = () => {
  const [t] = useTranslation();

  return (
    <StyledNotFoundPage>
      <Head title={t("headers.notFound")} />
      <StyledNotFoundText>{t("headers.notFound")}</StyledNotFoundText>
    </StyledNotFoundPage>
  );
};

export default NotFoundPage;
