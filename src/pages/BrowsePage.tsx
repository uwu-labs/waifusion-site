import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { PageContentWrapper } from "../components/CommonLayout";
import Header from "../components/Header";
import WaifuCard from "../components/WaifuCard";
import WaifuCardSkeleton from "../components/WaifuCardSkeleton";
import Filter from "../components/Filter";
import traits, { Trait } from "../data/traits";
import { makeRequest } from "../services/api";
import { Waifu } from "../types/waifusion";
import PageSelector from "../components/PageSelector";
import { getGlobals } from "../services/globals";
import Head from "../components/Head";

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

const Waifus = styled.div`
  position: relative;
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-row-gap: 2rem;
  margin: 0 3rem;

  @media (max-width: 768px) {
    margin: auto;
    align-items: center;
    justify-items: center;
  }
`;

const Filters = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 3rem;

  @media (max-width: 768px) {
    display: none;
  }
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

  const loadWaifus = useCallback(async (page: number) => {
    const globals = await getGlobals();

    setLoading(true);
    const filterString = filters
      .filter((filter: FilterType) => filter.value !== "All")
      .map((filter: FilterType) => `&${filter.id}=${filter.value}`)
      .reduce((a: string, b: string) => a + b, "");
    const requestString = `${globals.waifuApi}/filter?limit=50&page=${page}${filterString}`;
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
  }, []);

  useEffect(() => {
    loadWaifus(1);
  }, []);

  return (
    <StyledBrowsePage>
      <Head title="Browse" />
      <Header text={t("headers.browse")} />
      <Content>
        {loading && (
          <Waifus>
            {Array.from({ length: 50 }, (_, i) => (
              <WaifuCardSkeleton key={i} />
            ))}
          </Waifus>
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
              key={trait.id}
              trait={trait}
              setValue={(value: string) => {
                const newFilters = [...filters];
                newFilters.filter(
                  (newFilter: FilterType) => newFilter.id === trait.id
                )[0].value = value;
                setFilters(newFilters);
                setPage(1);
                loadWaifus(1);
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
          loadWaifus(number);
        }}
      />
    </StyledBrowsePage>
  );
};

export default BrowsePage;
