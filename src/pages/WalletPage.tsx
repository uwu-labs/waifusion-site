import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Header from "../components/Header";
import { getWaifus } from "../services/contract";
import { Waifu } from "../types/waifusion";

const StyledWalletPage = styled.div``;

const WalletPage: React.FC = () => {
  const [t] = useTranslation();
  const [ownedWaifus, setOwnedWaifus] = useState<Waifu[]>([]);

  const setWallet = async () => {
    const _ownedWaifus = await getWaifus();
    setOwnedWaifus(_ownedWaifus);
  };

  useEffect(() => {
    setWallet();
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
