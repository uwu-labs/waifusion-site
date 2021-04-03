import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Header from "../components/Header";
import bscProvenance from "../assets/bsc_provenance.json";
import ethProvenance from "../assets/eth_provenance.json";
import GLOBALS from "../services/globals";
import { PageContentWrapper } from "../components/CommonLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import PageSelector from "../components/PageSelector";

const PROVENANCE_PER_PAGE = 20;

type ProvenanceType = {
  hash: string;
  link: string;
  index: number;
};

const StyledProvenancePage = styled(PageContentWrapper)`
  display: flex;
  flex-direction: column;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 3rem auto 0 auto;

  * {
    margin: 0 1rem;
  }
`;

const Items = styled.div`
  width: 1200px;
  margin: 3rem auto 1rem auto;
`;

const Item = styled.a`
  width: 100%;
  border-radius: 1rem;
  border: 2px solid var(--plain-shadow);
  box-shadow: 0 0.2rem 0 0 var(--plain-shadow);
  padding: 1rem 2rem;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  :hover {
    box-shadow: 0 0.3rem 0 0 var(--plain-shadow);
    transform: translateY(-0.1rem);
  }

  :active {
    box-shadow: 0 0 0 0 var(--plain-shadow);
    transform: translateY(0.2rem);
  }
`;

const Text = styled.div`
  font-size: 15pt;
  font-weight: 500;
  color: var(--text-secondary);
`;

const ProvenancePage: React.FC = () => {
  const [t] = useTranslation();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<number | null>(null);
  const provenance: ProvenanceType[] =
    GLOBALS.WAIFU_VERSION === "bsc" ? bscProvenance : ethProvenance;

  return (
    <StyledProvenancePage>
      <Header text={t("headers.provenance")} />

      <SearchContainer>
        <Input
          placeholder={t("provenance.placeholder")}
          onChange={(event) => setSearch(Number(event.target.value))}
        />
      </SearchContainer>
      <Items>
        {provenance
          .filter((prov: ProvenanceType) => {
            if (search) return prov.index === search;
            if (prov.index < (page - 1) * PROVENANCE_PER_PAGE) return false;
            if (prov.index > page * PROVENANCE_PER_PAGE) return false;
            return true;
          })
          .map((prov: ProvenanceType) => (
            <Item href={prov.link} target="_blank" key={prov.index}>
              <Text>{`${t("provenance.id")} ${prov.index}`}</Text>
              <Text>{`${t("provenance.hash")} ${prov.hash}`}</Text>
            </Item>
          ))}
      </Items>
      {!search && (
        <PageSelector
          page={page}
          setPage={(number: number) => setPage(number)}
          pages={Math.ceil(provenance.length / PROVENANCE_PER_PAGE)}
        />
      )}
    </StyledProvenancePage>
  );
};

export default ProvenancePage;
