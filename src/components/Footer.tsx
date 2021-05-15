import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Underline from "./Underline";
import * as ROUTES from "../constants/routes";

const StyledFooter = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.footer`
  position: relative;
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
`;

const Section = styled.div`
  display: flex;
  font-weight: 500;
  white-space: nowrap;

  @media (max-width: 768px) {
    display: none;
  }
`;

const InternalLink = styled(Link)`
  margin-right: 20px;
  text-decoration: none;
  color: var(--text-secondary);

  :hover {
    text-decoration: underline;
  }
`;

const ExternalLink = styled.a`
  margin-left: 20px;
  text-decoration: none;
  color: var(--text-secondary);

  :hover {
    text-decoration: underline;
  }
`;

const AbsoluteCenterSection = styled.div`
  display: flex;
  font-weight: 500;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--text-secondary);

  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Footer: React.FC = () => {
  const [t] = useTranslation();

  return (
    <StyledFooter>
      <Underline />
      <Container>
        <Section>
          <InternalLink to={ROUTES.PROVENANCE}>
            {t("footer.provenance")}
          </InternalLink>
          <ExternalLink
            href="https://opensea.io/assets/waifusion"
            target="_blank"
            rel="noreferrer"
          >
            {t("footer.opensea")}
          </ExternalLink>
        </Section>
        <AbsoluteCenterSection>{t("footer.team")}</AbsoluteCenterSection>
        <Section>
          <ExternalLink
            href="https://twitter.com/waifusion"
            target="_blank"
            rel="noreferrer"
          >
            {t("contact.twitter")}
          </ExternalLink>
          <ExternalLink
            href="https://discord.gg/CaR7RhfDZ6"
            target="_blank"
            rel="noreferrer"
          >
            {t("contact.discord")}
          </ExternalLink>
          <ExternalLink
            href="https://t.me/Waifusion"
            target="_blank"
            rel="noreferrer"
          >
            {t("contact.telegram")}
          </ExternalLink>
          <ExternalLink
            href="http://github.com/waifusion"
            target="_blank"
            rel="noreferrer"
          >
            {t("contact.github")}
          </ExternalLink>
          <ExternalLink
            href="mailto: waifusiongovernance@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            {t("contact.contact")}
          </ExternalLink>
        </Section>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
