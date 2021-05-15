import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Head from "../components/Head";
import Header from "../components/Header";

const StyledNotFoundPage = styled.div``;

const NotFoundPage: React.FC = () => {
  const [t] = useTranslation();

  return (
    <StyledNotFoundPage>
      <Head title={t("headers.notFound")} />
      <Header text={t("headers.notFound")} />
    </StyledNotFoundPage>
  );
};

export default NotFoundPage;
