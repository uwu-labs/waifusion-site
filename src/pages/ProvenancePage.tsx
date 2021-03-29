import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Header from "../components/Header";

const StyledProvenancePage = styled.div``;

const ProvenancePage = () => {
  const [t] = useTranslation();

  return (
    <StyledProvenancePage>
      <Header text={t('headers.provenance')} />
    </StyledProvenancePage>
  );
};

export default ProvenancePage;
