import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useHistory } from "react-router";
import ClaimWet from "../components/ClaimWet";
import { PageContentWrapper } from "../components/CommonLayout";
import Header from "../components/Header";
import Loading from "../components/Loading";
import WaifuCard from "../components/WaifuCard";
import {
  loadWaifus,
  selectLoadingWaifus,
  selectUsersWaifus,
} from "../state/reducers/user";
import { Waifu } from "../types/waifusion";
import noWaifus from "../assets/no-waifus.png";
import Button from "../components/Button";
import * as ROUTES from "../constants/routes";
import Head from "../components/Head";

const StyledWalletPage = styled(PageContentWrapper)`
  display: flex;
  flex-direction: column;
  min-height: 83.2vh;
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;

    button {
      margin-top: 2rem;
    }
  }
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
`;

const WaifuContainer = styled.div`
  max-width: 1400px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  grid-gap: 2rem;
  margin: 3rem auto;

  @media (max-width: 768px) {
    align-items: center;
    justify-items: center;
  }
`;

const NoWaifusContainer = styled.div`
  width: 100%;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NoWaifusImage = styled.img`
  height: 25vh;
  margin-bottom: 2rem;
  filter: saturate(1) brightness(1.1) contrast(1.07);
`;

const NoWaifusText = styled.p`
  font-size: 1.3rem;
  font-weight: 500;
  color: var(--text-secondary);
  width: 20rem;
  text-align: center;
  margin-bottom: 0.2rem;
`;

const NoWaifuButton = styled(Button)`
  margin-top: 1rem;
`;

const WalletPage: React.FC = () => {
  const [t] = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const usersWaifus = useSelector(selectUsersWaifus);
  const loading = useSelector(selectLoadingWaifus);

  useEffect(() => {
    dispatch(loadWaifus());
  }, []);

  return (
    <StyledWalletPage>
      <Head title="Wallet" />
      <HeaderContainer>
        <Header text={t("headers.wallet")} />
        <ClaimWet />
      </HeaderContainer>
      <Content>
        {loading && <Loading />}
        {!loading && usersWaifus.length > 0 && (
          <WaifuContainer>
            {usersWaifus.map((waifu: Waifu) => (
              <WaifuCard waifu={waifu} key={waifu.id} />
            ))}
          </WaifuContainer>
        )}
        {!loading && usersWaifus.length === 0 && (
          <NoWaifusContainer>
            <NoWaifusImage src={noWaifus} />
            <NoWaifusText>{t("wallet.noWaifusMain")}</NoWaifusText>
            <NoWaifusText>{t("wallet.noWaifusSecondary")}</NoWaifusText>
            <NoWaifuButton
              highlight
              onClick={() => history.push(ROUTES.DUNGEON)}
            >
              {t("buttons.getWaifus")}
            </NoWaifuButton>
          </NoWaifusContainer>
        )}
      </Content>
    </StyledWalletPage>
  );
};

export default WalletPage;
