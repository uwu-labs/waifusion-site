/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import styled from "styled-components";
import { Attribute } from "../types/waifusion";

const StyledTraitTag = styled.div<{ colorTrait?: string }>`
  width: 50%;
  background-color: var(--plain);
  border: 2px solid var(--plain-shadow);
  border-radius: 100px;
  padding: 0.5rem 1.2rem;
  font-weight: 500;
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 1rem;
  margin-bottom: 1rem;

  svg {
    height: 18pt;
    width: 18pt;
    margin-right: 0.5rem;
    color: ${(props) =>
      props.colorTrait ? props.colorTrait : "var(--text-secondary)"};
    color: var(--plain-dark);
  }

  path {
    color: var(--plain-dark);
  }

  h3 {
    margin: 0;
    color: var(--plain-dark);
  }

  label {
    color: var(--plain-dark);
  }
`;

const TraitDetail = styled.div`
  display: flex;
  flex-direction: column;
`;

type Props = {
  attribute: Attribute;
};

const TraitTag: React.FC<Props> = ({ attribute }) => {
  return (
    <StyledTraitTag>
      <TraitDetail>
        <h3>{attribute.trait_type}</h3>
        <label>{attribute.value}</label>
      </TraitDetail>
    </StyledTraitTag>
  );
};

export default TraitTag;
