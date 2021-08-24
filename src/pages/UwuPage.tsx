import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import { PageContentWrapper } from "../components/CommonLayout";
import Header from "../components/Header";
import BurnWaifu from "../components/BurnWaifu";
import {
  selectGlobalsData,
  selectIsEth,
  selectUwuMintContract,
} from "../state/reducers/globals";
import Head from "../components/Head";
import ticket from "../assets/ticket.png";
import Button from "../components/Button";
import { selectTickets, setTickets } from "../state/reducers/user";
import { getTicketBalance, getUwuSwapPrice } from "../services/uwuHelper";
import BuyTicketEth from "../components/BuyTicketEth";
import BuyTicketBsc from "../components/BuyTicketBsc";

const StyledUwuPage = styled(PageContentWrapper)`
  height: 70vh;

  @media (max-width: 768px) {
    height: auto;
  }
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

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;

  > button {
    margin-left: 1rem;
  }
`;

const MiniTicket = styled.img`
  height: 1rem;
  margin-top: 0.3rem;
`;

const TicketBalance = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-right: 0.4rem;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 3rem;
  }
`;

const CardContainer = styled.div`
  width: 43vw;

  @media (max-width: 768px) {
    width: 90vw;
  }
`;

const Ticket = styled.img`
  width: 32vw;
  transform: rotate(-7deg);
`;

const UwuPage: React.FC = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const isEth = useSelector(selectIsEth);
  const uwuMintContract = useSelector(selectUwuMintContract);
  const globals = useSelector(selectGlobalsData);
  const tickets = useSelector(selectTickets);

  const [buying, setBuying] = useState(false);
  const [swapPrice, setSwapPrice] = useState(0);

  const updateSwapPrice = async () => {
    if (!uwuMintContract) return;
    const price = await getUwuSwapPrice(uwuMintContract);
    setSwapPrice(Number(price));
  };

  const updateTicketBalance = async () => {
    if (!uwuMintContract) return;
    const balance = await getTicketBalance(uwuMintContract);
    dispatch(setTickets(balance));
  };

  useEffect(() => {
    updateSwapPrice();
    updateTicketBalance();
  }, [uwuMintContract]);

  const dungeonBody = (isEth
    ? t("uwu.ethDescription")
    : t("uwu.bscDescription")
  ).replace("[[WET_BURN_PRICE]]", swapPrice.toString());

  return (
    <StyledUwuPage>
      <Head title="uwucrew" />
      <HeaderContainer>
        <Header text={t("headers.uwucrew")} />
        <ButtonContainer>
          <TicketBalance>{`Owned: ${tickets}`}</TicketBalance>
          <MiniTicket src={ticket} />
          <Button
            secondary
            onClick={() =>
              (window as any).open(globals.wetTradeLink, "_blank").focus()
            }
          >
            Get WET
          </Button>
          <Button
            primary
            onClick={() =>
              (window as any).open(globals.waifuTradeLink, "_blank").focus()
            }
          >
            Get Waifus
          </Button>
        </ButtonContainer>
      </HeaderContainer>
      <Content>
        <Ticket src={ticket} />
        <CardContainer>
          <Card
            text={dungeonBody}
            buttonAction={() => setBuying(true)}
            buttonText={t("uwu.getTicket")}
            secondButtonText={t("buttons.learnMore")}
            secondButtonAction={() =>
              (window as any)
                .open(
                  "https://waifusioncommunity.medium.com/presenting-uwucrew-by-uwulabs-4fe06b60311a",
                  "_blank"
                )
                .focus()
            }
          />
        </CardContainer>
      </Content>
      <BuyTicketEth
        show={isEth && buying}
        close={() => {
          updateTicketBalance();
          setBuying(false);
        }}
        swapPrice={swapPrice}
      />
      <BuyTicketBsc
        show={!isEth && buying}
        close={() => {
          updateTicketBalance();
          setBuying(false);
        }}
        swapPrice={swapPrice}
      />
    </StyledUwuPage>
  );
};

export default UwuPage;
