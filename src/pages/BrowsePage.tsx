import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { PageContentWrapper } from "../components/CommonLayout";
import Header from "../components/Header";
import WaifuCard from "../components/WaifuCard";
import traits, { Trait } from "../data/traits";
import { makeRequest } from "../services/api";
import { Waifu } from "../types/waifusion";

const StyledBrowsePage = styled(PageContentWrapper)`
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  margin: 3rem auto;
  justify-content: space-between;
`;

const Waifus = styled.div`
  position: relative;
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-row-gap: 2rem;
  margin: 0 3rem;
`;

const Filters = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
`;

const Filter = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
`;

const Select = styled.select`
  font-size: 1.4rem;
  color: var(--text-secondary);
`;

const Option = styled.option``;

const BrowsePage: React.FC = () => {
  const [t] = useTranslation();
  const [loading, setLoading] = useState(true);
  const [waifus, setWaifus] = useState<Waifu[]>([]);

  const loadWaifus = async () => {
    setLoading(true);
    const response = await makeRequest(
      "waifus/filter?limit=50&page=1&Top=catgirl",
      {
        method: "GET",
        body: null,
      }
    );
    if (!response.success) {
      alert(response.error?.code);
      return;
    }
    const _waifus: Waifu[] = response.data.results;
    setWaifus(_waifus);
    setLoading(false);
  };

  useEffect(() => {
    loadWaifus();
  }, []);

  return (
    <StyledBrowsePage>
      <Header text={t("headers.browse")} />
      <Content>
        {loading && <p>loading</p>}
        {!loading && (
          <Waifus>
            {waifus.map((waifu: Waifu) => (
              <WaifuCard waifu={waifu} key={waifu.id} />
            ))}
          </Waifus>
        )}
        <Filters>
          {traits.map((trait: Trait) => (
            <Filter key={trait.id}>
              <Select onChange={(event) => console.log(event.target.value)}>
                <Option value="">{trait.id}</Option>
                {trait.values.map((value: string) => (
                  <Option value={value}>{value}</Option>
                ))}
              </Select>
            </Filter>
          ))}
        </Filters>
      </Content>
    </StyledBrowsePage>
  );
};

export default BrowsePage;
