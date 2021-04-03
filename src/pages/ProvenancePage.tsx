import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Header from "../components/Header";
import bscProvenance from "../assets/bsc_provenance.json";
import ethProvenance from "../assets/eth_provenance.json";
import GLOBALS from "../services/globals";

type ProvenanceType = {
  hash: string;
  link: string;
  index: number;
};

const StyledProvenancePage = styled.div``;

const ProvenancePage: React.FC = () => {
  const [t] = useTranslation();
  const provenance: ProvenanceType[] =
    GLOBALS.WAIFU_VERSION === "bsc" ? bscProvenance : ethProvenance;

  return (
    <StyledProvenancePage>
      <Header text={t("headers.provenance")} />
      {provenance.map((prov: ProvenanceType) => (
        <p>{prov.index}</p>
      ))}
    </StyledProvenancePage>
  );
};

export default ProvenancePage;
