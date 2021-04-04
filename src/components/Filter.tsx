import React from "react";
import styled from "styled-components";
import { Trait } from "../data/traits";

const StyledFilter = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.3rem;
`;

const FilterLabel = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
`;

const Select = styled.select`
  font-size: 1rem;
  color: var(--text-secondary);
`;

const Option = styled.option`
  font-size: 1rem;
`;

type Props = {
  trait: Trait;
};

const Filter: React.FC<Props> = (props) => {
  return (
    <StyledFilter key={props.trait.id}>
      <FilterLabel>{`${props.trait.id}:`}</FilterLabel>
      <Select onChange={(event) => console.log(event.target.value)}>
        <Option value="">All</Option>
        {props.trait.values.map((value: string) => (
          <Option value={value}>{value}</Option>
        ))}
      </Select>
    </StyledFilter>
  );
};

export default Filter;
