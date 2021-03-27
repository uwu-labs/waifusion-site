import styled from "styled-components";

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

const Link = styled.a`
  margin: 0 10px;
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
        <Link href="/provenance">Provenance</Link>
        <Link href="/history">History</Link>
      </Section>
      <AbsoluteCenterSection>
        Made with ❤️ by the Waifusion comunity
      </AbsoluteCenterSection>
      <Section>
        <Link
          href="https://twitter.com/waifusion"
          target="_blank"
          rel="noreferrer"
        >
          Twitter
        </Link>
        <Link
          href="https://discord.com/invite/q5hRZR72wm"
          target="_blank"
          rel="noreferrer"
        >
          Discord
        </Link>
        <Link href="https://t.me/Waifusion" target="_blank" rel="noreferrer">
          Telegram
        </Link>
        <Link
          href="mailto: waifusiongovernance@gmail.com"
          target="_blank"
          rel="noreferrer"
        >
          Contact
        </Link>
      </Section>
    </Container>
  );
};

export default Footer;
