import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import {
  selectWetBurnPrice,
  selectWetTradeLink,
} from "../state/reducers/globals";
import Button from "./Button";

const rotate = keyframes`
    0% {
        background-position: 0% 50%;
    }
    100% {
        background-position: 150% 50%;
    }
`;

const StyledSlide = styled.div`
  width: 100%;
  display: flex;
  padding: 5rem 0;
  justify-content: center;
  align-items: center;
  background-color: var(--primary);
  filter: saturate(1.5);
  background: linear-gradient(
      90deg,
      var(--primary) 0%,
      var(--secondary) 25%,
      var(--highlight) 50%,
      var(--secondary) 75%,
      var(--primary) 100%
    )
    0% 0% / 300% 300%;
  animation: ${rotate} 10s linear 0s infinite;
`;

const Card = styled.div`
  width: 60vw;
  padding: 2rem;
  border-radius: 1rem;
  background-color: var(--plain);
  border: 2px solid var(--plain-shadow);
  box-shadow: 0 0.3rem 0 0 var(--plain-shadow);
  font-size: 1.4rem;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 90vw;
  }
`;

const Header = styled.h2`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--plain-dark);
`;

const Body = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  margin-bottom: 2rem;
  text-align: center;
  color: var(--plain-dark);
`;

const List = styled.ul`
  margin: 1rem auto 2rem auto;
  width: 80%;
  text-align: left;
`;

const Item = styled.li`
  color: var(--plain-dark);
  margin-bottom: 0.3rem;
`;

const WetSlide: React.FC = () => {
  const [t] = useTranslation();
  const wetTradeLink = useSelector(selectWetTradeLink);
  const wetBurnPrice = useSelector(selectWetBurnPrice);

  const wetDetail = t("wet.detail").replace("[[WET_BURN_PRICE]]", wetBurnPrice);

  return (
    <StyledSlide>
      <Card>
        <Header>{t("wet.header")}</Header>
        <Body>
          {t("wet.overview")}
          <List>
            {(t("wet.use", { returnObjects: true }) as string[]).map(
              (use, index: number) => (
                <Item key={index}>{use}</Item>
              )
            )}
          </List>
          {wetDetail}
        </Body>
        <Button
          secondary
          onClick={() => {
            (window as any).open(wetTradeLink, "_blank").focus();
          }}
        >
          {t("buttons.getWet")}
        </Button>
      </Card>
    </StyledSlide>
  );
};

export default WetSlide;
