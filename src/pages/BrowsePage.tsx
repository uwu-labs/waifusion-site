import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { PageContentWrapper } from "../components/CommonLayout";
import Header from "../components/Header";
import traits, { Trait } from "../data/traits";

const StyledBrowsePage = styled(PageContentWrapper)`
  display: flex;
  flex-direction: column;
`;

const Filters = styled.div`
  display: flex;
`;

const Filter = styled.div`
  margin: 0 3rem;
  display: flex;
  flex-direction: column;
`;

const Label = styled.p`
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px var(--shadow);
`;

const Select = styled.select`
  font-size: 1.4rem;
  color: black;
  text-shadow: 0 2px var(--highlight);
`;

const Option = styled.option``;

const BrowsePage: React.FC = () => {
  const [t] = useTranslation();

  return (
    <StyledBrowsePage>
      <Header text={t("headers.browse")} />
      <Filters>
        {traits.map((trait: Trait) => (
          <Filter key={trait.id}>
            <Label>{trait.id}</Label>
            <Select onChange={(event) => console.log(event.target.value)}>
              {trait.values.map((value: string) => (
                <Option value={value}>{value}</Option>
              ))}
            </Select>
          </Filter>
        ))}
      </Filters>
    </StyledBrowsePage>
  );
};

export default BrowsePage;
