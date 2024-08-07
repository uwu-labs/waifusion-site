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
  color: var(--text-primary);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 150em;
  align-items: center;
`;

const SmallHeader = styled.h2`
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1rem;
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

  font-size: 1.2rem;
  line-height: 1.8rem;
  @media (max-width: 768px) {
    font-size: 1.6rem;
    line-height: 2rem;
    margin: 2rem;
  }
`;

const Link = styled.a`
  font-weight: 500;
  color: #bc6d93;
  max-width: 70%;
  margin-top: 2rem;
  font-family: "Roboto", sans-serif;
  text-decoration: underline;

  font-size: 1.2rem;
  line-height: 1.8rem;
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
          <SmallHeader>{t("waifusion.smallheader-0")}</SmallHeader>
          <SubHeader>
            On March 22nd, 2021, the original anonymous team behind Waifusion
            announced{" "}
            <Link
              href="https://waifusion.medium.com/waifusion-a-postmortem-and-the-way-forward-4973c171b15f"
              target="_blank"
            >
              their departure
            </Link>{" "}
            from the project leaving Waifusion in the hands of a group of
            passionate{" "}
            <Link
              href="https://waifusioncommunity.medium.com/the-community-takes-over-waifusion-a2315edf402"
              target="_blank"
            >
              community members
            </Link>
            {". "}
          </SubHeader>
          <SubHeader>{t("waifusion.subheader-2")}</SubHeader>
          <SmallHeader>{t("waifusion.smallheader-1")}</SmallHeader>
          <SubHeader>
            After the community takeover, we formed the team of uwu Labs and
            created and launched our very own collection on September 5th, 2021
            {" - "}
            <Link href="https://uwucrew.art" target="_blank">
              uwucrew
            </Link>
            !
          </SubHeader>
          <SubHeader>
            As of March 2022, we've announced a{" "}
            <Link
              href="https://mirror.xyz/uwucrew.eth/gMFtuGCE_BIEdk1IJJ_AwWGuYOFBmGbv6Pfu3QCDaHM"
              target="_blank"
            >
              brand-new collection
            </Link>{" "}
            under uwulabs, designed by the outstanding artist of uwucrew, laur!
            This new collection will be minted by — you guessed it! — burning
            Waifusion NFTs.{" "}
          </SubHeader>
          <SubHeader>{t("waifusion.subheader-6")}</SubHeader>
          <SubHeader>
            Waifusion Images:{" "}
            <Link
              href="https://arweave.net/ZW7NCaxFJT6IlTInn3OZc9MU1UjwmQQ0fGtbLyithEM/WAIFU-ID.png"
              target="_blank"
            >
              https://arweave.net/ZW7NCaxFJT6IlTInn3OZc9MU1UjwmQQ0fGtbLyithEM/WAIFU-ID.png
            </Link>
          </SubHeader>
          <SubHeader>
            Waifusion Metadata:{" "}
            <Link
              href="https://arweave.net/VvsElMKxzV5rBtWAxMqfbtG39daxKXIe7mnR4iyRtCk/WAIFU-ID"
              target="_blank"
            >
              https://arweave.net/VvsElMKxzV5rBtWAxMqfbtG39daxKXIe7mnR4iyRtCk/WAIFU-ID
            </Link>
          </SubHeader>
        </Content>
      </Card>
    </StyledSlide>
  );
};

export default WaifusionSlide;
