import React from "react";
import styled, { keyframes } from "styled-components";
import { Trait } from "../data/traits";

const rotate = keyframes`
    0% {
        background-position: 0% 50%;
    }
    100% {
        background-position: 150% 50%;
    }
`;

type BackgroundProps = {
  rainbow?: boolean;
};

const Background = styled.div`
  margin-top: 1.3rem;
  width: 100%;
  padding: 2px 2px 6px 2px;
  border-radius: 1.1rem;
  transform: translateY(-0.5rem);
  filter: saturate(1.5);
  background: linear-gradient(
      45deg,
      var(--primary) 0%,
      var(--secondary) 25%,
      var(--highlight) 50%,
      var(--secondary) 75%,
      var(--primary) 100%
    )
    0% 0% / 300% 300%;
  animation: ${rotate} 3s linear 0s infinite;
  background: ${(props: BackgroundProps) =>
    props.rainbow ? "auto" : "var(--plain-shadow)"};
`;

const StyledFilter = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 1rem;
  padding: 1rem;
`;

const FilterLabel = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
`;

const Select = styled.select`
  font-size: 1rem;
  color: var(--text-secondary);
  border: none;
  outline: none;
`;

const Option = styled.option`
  font-size: 1rem;
`;

type Props = {
  trait: Trait;
};

const Filter: React.FC<Props> = (props) => {
  return (
    <Background>
      <StyledFilter key={props.trait.id}>
        <FilterLabel>{`${props.trait.id}:`}</FilterLabel>
        <Select onChange={(event) => console.log(event.target.value)}>
          <Option value="">All</Option>
          {props.trait.values.map((value: string) => (
            <Option value={value}>{value}</Option>
          ))}
        </Select>
      </StyledFilter>
    </Background>
  );
};

export default Filter;
