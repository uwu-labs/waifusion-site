import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { PageContentWrapper } from "../components/CommonLayout";
import Header from "../components/Header";
import WaifuCard from "../components/WaifuCard";
import Filter from "../components/Filter";
import traits, { Trait } from "../data/traits";
import { makeRequest } from "../services/api";
import { Waifu } from "../types/waifusion";
import PageSelector from "../components/PageSelector";
import Loading from "../components/Loading";

type FilterType = {
  id: string;
  value: string;
};

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

const LoadingContainer = styled.div`
  position: relative;
  flex: 1;
  height: 63.2vh;
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
  margin-right: 3rem;
`;

const BrowsePage: React.FC = () => {
  const [t] = useTranslation();
  const [loading, setLoading] = useState(true);
  const [waifus, setWaifus] = useState<Waifu[]>([]);
  const defaultFilters: FilterType[] = traits.map((trait: Trait) => {
    return {
      id: trait.id,
      value: "All",
    };
  });
  const [filters, setFilters] = useState<FilterType[]>(defaultFilters);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const loadWaifus = async () => {
    setLoading(true);
    const filterString = filters
      .filter((filter: FilterType) => filter.value !== "All")
      .map((filter: FilterType) => `&${filter.id}=${filter.value}`)
      .reduce((a: string, b: string) => a + b, "");
    const requestString = `waifus/filter?limit=50&page=${page}${filterString}`;
    const response = await makeRequest(requestString, {
      method: "GET",
      body: null,
    });
    if (!response.success) {
      console.log(response.error?.code);
      return;
    }
    setPages(response.data.maxPage);
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
        {loading && (
          <LoadingContainer>
            <Loading />
          </LoadingContainer>
        )}
        {!loading && (
          <Waifus>
            {waifus.map((waifu: Waifu) => (
              <WaifuCard waifu={waifu} key={waifu.id} />
            ))}
          </Waifus>
        )}
        <Filters>
          {traits.map((trait: Trait) => (
            <Filter
              key={trait}
              trait={trait}
              setValue={(value: string) => {
                const newFilters = [...filters];
                newFilters.filter(
                  (newFilter: FilterType) => newFilter.id === trait.id
                )[0].value = value;
                setFilters(newFilters);
                setPage(1);
                loadWaifus();
              }}
            />
          ))}
        </Filters>
      </Content>
      <PageSelector
        page={page}
        pages={pages}
        setPage={(number: number) => {
          setPage(number);
          loadWaifus();
        }}
      />
    </StyledBrowsePage>
  );
};

export default BrowsePage;
