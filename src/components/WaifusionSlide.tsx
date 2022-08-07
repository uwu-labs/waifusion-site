import React from "react";
import { useTranslation } from "react-i18next";
import styled, { keyframes } from "styled-components";

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

const Header = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--plain-dark);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 150em;
  align-items: center;
`;

const SmallHeader = styled.h2`
  font-weight: 600;
  color: var(--plain-dark);
  line-height: 4rem;
  text-align: center;
  margin: 2rem 0rem;

  font-size: 2rem;
  @media (max-width: 768px) {
    font-size: 3rem;
    margin: 3rem;
    text-align: center;
  }
`;

const SubHeader = styled.div`
  font-weight: 500;
  color: var(--text-primary);
  margin: 1rem;
  font-family: "Roboto", sans-serif;

  font-size: 1.4rem;
  line-height: 2.3rem;
  @media (max-width: 768px) {
    font-size: 1.6rem;
    line-height: 2rem;
    margin: 2rem;
  }
`;

const Link = styled.a`
  font-weight: 500;
  color: var(--text-primary);
  max-width: 70%;
  margin-top: 2rem;
  font-family: "Roboto", sans-serif;
  text-decoration: underline;

  font-size: 1.4rem;
  line-height: 2.3rem;
  @media (max-width: 768px) {
    font-size: 1.6rem;
    line-height: 2rem;
    max-width: 100%;
    margin-top: 1.5rem;
    text-align: center;
  }
`;

const WaifusionSlide: React.FC = () => {
  const [t] = useTranslation();

  return (
    <StyledSlide>
      <Card>
        <Content>
          <Header>{t("waifusion.header")}</Header>
          <SubHeader>{t("waifusion.subheader-0")}</SubHeader>
          <SubHeader>{t("waifusion.subheader-1")}</SubHeader>
          <SubHeader>{t("waifusion.subheader-2")}</SubHeader>
          <SmallHeader>{t("waifusion.smallheader-0")}</SmallHeader>
          <SubHeader>
            On March 22nd, 2021, the original anonymous team behind Waifusion
            announced their departure from the{" "}
            <Link
              href="https://waifusion.medium.com/waifusion-a-postmortem-and-the-way-forward-4973c171b15f"
              target="_blank"
            >
              project
            </Link>{" "}
            leaving the project in the hands of a group of passionate community{" "}
            <Link
              href="https://waifusioncommunity.medium.com/the-community-takes-over-waifusion-a2315edf402              "
              target="_blank"
            >
              members
            </Link>{" "}
          </SubHeader>
          <SmallHeader>{t("waifusion.smallheader-1")}</SmallHeader>
          <SubHeader>{t("waifusion.subheader-4")}</SubHeader>
          <SubHeader>
            As of March this year, we've announced a brand-new{" "}
            <Link
              href="https://mirror.xyz/uwucrew.eth/gMFtuGCE_BIEdk1IJJ_AwWGuYOFBmGbv6Pfu3QCDaHM"
              target="_blank"
            >
              collection
            </Link>{" "}
            under uwulabs, designed by the outstanding artist of uwucrew, laur!
            This new collection will be minted by — you guessed it! — burning
            Waifusion NFTs.{" "}
          </SubHeader>
          <SubHeader>{t("waifusion.subheader-6")}</SubHeader>
        </Content>
      </Card>
    </StyledSlide>
  );
};

export default WaifusionSlide;
