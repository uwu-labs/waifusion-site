import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ContractHelper } from "../services/contract";
import GLOBALS from "../services/globals";
import { Waifu } from "../types/waifusion";
import WaifuCard from "./WaifuCard";

const WAIU_COUNT = 5;

const StyledPreview = styled.div`
  width: 100%;
  padding: 4rem;
`;

const Header = styled.h2`
  color: var(--text-secondary);
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 2rem;
`;

const WaifuWrapper = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-row-gap: 2rem;
  margin: 0 3rem;
`;

const Preview: React.FC = () => {
  const [waifus, setWaifus] = useState<Waifu[]>([]);

  const getDungeonPreview = async () => {
    const _waifus: Waifu[] = [];
    const dungeonAddress = GLOBALS.DUNGEON_CONTRACT_ADDRESS;
    const contractHelper = new ContractHelper();
    await contractHelper.init();

    const count = await contractHelper.waifuBalanceOfAddress(dungeonAddress);

    await Array.from(Array(10).keys()).forEach(async (i: number) => {
      const index = Math.floor(Math.random() * count);
      const id = await contractHelper.tokenOfAddressByIndex(
        index,
        dungeonAddress
      );
      _waifus.push({ id });
    });
    console.log(_waifus);
    setWaifus(_waifus);
  };

  useEffect(() => {
    getDungeonPreview();
  }, []);

  return (
    <StyledPreview>
      <Header>Available Waifus</Header>
      <WaifuWrapper>
        {waifus.map((waifu: Waifu) => (
          <WaifuCard key={waifu.id} waifu={waifu} />
        ))}
      </WaifuWrapper>
    </StyledPreview>
  );
};

export default Preview;
