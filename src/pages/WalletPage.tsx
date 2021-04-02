import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Header from "../components/Header";
import { ContractHelper } from "../services/contract";
import { selectUsersWaifus, setWaifuIndexes } from "../state/reducers/user";
import { addWaifu, selectWaifus } from "../state/reducers/waifus";
import { Waifu } from "../types/waifusion";

const StyledWalletPage = styled.div``;

const WalletPage: React.FC = () => {
  const dispatch = useDispatch();
  const usersWaifus = useSelector(selectUsersWaifus);
  const waifus = useSelector(selectWaifus);
  const [t] = useTranslation();

  const loadOwnedWaifus = async () => {
    const contractHelper = new ContractHelper();
    await contractHelper.init();
    const _ownedWaifus = await contractHelper.getWaifus();
    dispatch(setWaifuIndexes(_ownedWaifus.map((waifu: Waifu) => waifu.id)));
    _ownedWaifus.forEach((ownedWaifu: Waifu) => {
      if (waifus.map((waifu: Waifu) => waifu.id).indexOf(ownedWaifu.id) === -1)
        dispatch(addWaifu(ownedWaifu));
    });
  };

  useEffect(() => {
    loadOwnedWaifus();
  }, []);

  return (
    <StyledWalletPage>
      <Header text={t("headers.wallet")} />
      {usersWaifus.map((waifu: Waifu) => (
        <p>{waifu.id}</p>
      ))}
    </StyledWalletPage>
  );
};

export default WalletPage;
