import styled from "styled-components";
import { Link } from "react-router-dom";
import Underline from "./Underline";
import { useTranslation } from "react-i18next";

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
`;

const InternalLink = styled(Link)`
  margin-right: 20px;
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;

const ExternalLink = styled.a`
  margin-left: 20px;
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;

const AbsoluteCenterSection = styled(Section)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--text-secondary);
`;

const Footer = () => {
  const [t] = useTranslation();

  return (
    <StyledFooter>
      <Underline />
      <Container>
        <Section>
          <InternalLink to={"/provenance"}>{t("provenance")}</InternalLink>
          <InternalLink to={"/history"}>{t("history")}</InternalLink>
        </Section>
        <AbsoluteCenterSection>{t("footer")}</AbsoluteCenterSection>
        <Section>
          <ExternalLink
            href="https://twitter.com/waifusion"
            target="_blank"
            rel="noreferrer"
          >
            {t("contact.twitter")}
          </ExternalLink>
          <ExternalLink
            href="https://discord.com/invite/q5hRZR72wm"
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
