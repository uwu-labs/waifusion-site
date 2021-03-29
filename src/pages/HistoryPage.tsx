import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Header from "../components/Header";

const StyledHistoryPage = styled.div``;

const HistoryPage = () => {
  const [t] = useTranslation();

  return (
    <StyledHistoryPage>
      <Header text={t("headers.history")} />
    </StyledHistoryPage>
  );
};

export default HistoryPage;
