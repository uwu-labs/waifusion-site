import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.footer`
  position: relative;
  border-top: 2px solid #e7e4e7;
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
`;

const Footer = () => {
  return (
    <Container>
      <Section>
        <InternalLink to={"/provenance"}>Provenance</InternalLink>
        <InternalLink to={"/history"}>History</InternalLink>
      </Section>
      <AbsoluteCenterSection>
        Made with ❤️ by the Waifusion comunity
      </AbsoluteCenterSection>
      <Section>
        <ExternalLink
          href="https://twitter.com/waifusion"
          target="_blank"
          rel="noreferrer"
        >
          Twitter
        </ExternalLink>
        <ExternalLink
          href="https://discord.com/invite/q5hRZR72wm"
          target="_blank"
          rel="noreferrer"
        >
          Discord
        </ExternalLink>
        <ExternalLink
          href="https://t.me/Waifusion"
          target="_blank"
          rel="noreferrer"
        >
          Telegram
        </ExternalLink>
        <ExternalLink
          href="mailto: waifusiongovernance@gmail.com"
          target="_blank"
          rel="noreferrer"
        >
          Contact
        </ExternalLink>
      </Section>
    </Container>
  );
};

export default Footer;
