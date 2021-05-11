import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import styled from "styled-components";
import { ContractHelper } from "../services/contract";
import { getGlobals } from "../services/globals";
import { Waifu } from "../types/waifusion";
import Button from "./Button";
import WaifuCard from "./WaifuCard";
import * as ROUTES from "../constants/routes";

const WAIU_COUNT = 6;

const StyledPreview = styled.div`
  width: 100%;
  padding: 4rem;
`;

const Header = styled.h2`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--plain-dark);
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

const ButtonContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Preview: React.FC = () => {
  const [waifus, setWaifus] = useState<Waifu[]>([]);
  const history = useHistory();
  const [t] = useTranslation();

  const getDungeonPreview = async () => {
    const globals = await getGlobals();

    const _waifus: Waifu[] = [];
    const contractHelper = new ContractHelper();
    await contractHelper.init();

    const count = await contractHelper.waifuBalanceOfAddress(
      globals.dungeonAddress
    );

    const promises = Array.from(Array(WAIU_COUNT).keys()).map(async () => {
      const index = Math.floor(Math.random() * count);
      const id = await contractHelper.tokenOfAddressByIndex(
        index,
        globals.dungeonAddress
      );
      _waifus.push({ id });
    });
    await Promise.all(promises);
    setWaifus(_waifus);
  };

  useEffect(() => {
    getDungeonPreview();
  }, []);

  return (
    <StyledPreview>
      <Header>{t("headers.available")}</Header>
      <WaifuWrapper>
        {waifus.map((waifu: Waifu) => (
          <WaifuCard key={waifu.id} waifu={waifu} />
        ))}
      </WaifuWrapper>
      <ButtonContainer>
        <Button primary onClick={() => history.push(ROUTES.DUNGEON)}>
          {t("buttons.free")}
        </Button>
      </ButtonContainer>
    </StyledPreview>
  );
};

export default Preview;
