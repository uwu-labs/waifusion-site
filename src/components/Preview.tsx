import React from "react";
import styled from "styled-components";
import { Waifu } from "../types/waifusion";
import WaifuCard from "./WaifuCard";

const StyledPreview = styled.div`
  width: 100%;
  padding: 3rem;
`;

const WaifuWrapper = styled.div`
  display: flex;
  flex-direction: row;

  > div {
    margin-right: 1rem;
  }
`;

const previewWaifusTemp: Waifu[] = [
  {
    id: 2043,
    name: "Kaitlyn",
  },
  {
    id: 5458,
    name: "Tabby Catgirl",
  },
  {
    id: 6941,
    name: undefined,
  },
];

const Preview: React.FC = () => {
  return (
    <StyledPreview>
      This could be an example of some waifus maybe? Recently sold ones or
      something.
      <WaifuWrapper>
        {previewWaifusTemp.map((waifu) => (
          <WaifuCard waifu={waifu} />
        ))}
      </WaifuWrapper>
    </StyledPreview>
  );
};

export default Preview;
