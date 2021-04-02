import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Header from "../components/Header";
import { ContractHelper, getAddress } from "../services/contract";
import { Waifu } from "../types/waifusion";

const StyledWalletPage = styled.div``;

const WalletPage: React.FC = () => {
  const [t] = useTranslation();
  const [ownedWaifus, setOwnedWaifus] = useState<Waifu[]>([]);

  const loadOwnedWaifus = async () => {
    const address = await getAddress();
    const contractHelper = new ContractHelper(address);
    const _ownedWaifus = await contractHelper.getWaifus();
    setOwnedWaifus(_ownedWaifus);
  };

  useEffect(() => {
    loadOwnedWaifus();
  }, []);

  return (
    <StyledWalletPage>
      <Header text={t("headers.wallet")} />
      {ownedWaifus.map((waifu: Waifu) => (
        <p>{waifu.id}</p>
      ))}
    </StyledWalletPage>
  );
};

export default WalletPage;
