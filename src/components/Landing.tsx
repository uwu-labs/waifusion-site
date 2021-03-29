import styled from "styled-components";
import Header from "./Header";
import landing from "../assets/landing.png";
import Confetti from "./Confetti";
import { useTranslation } from "react-i18next";
import Card from "./Card";

const StyledLanding = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubHeader = styled.div`
  font-size: 1.7rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 3rem;
`;

const Image = styled.img`
  width: 50vw;
`;

const Landing = () => {
  const [t] = useTranslation();

  return (
    <StyledLanding>
      <Content>
        <Header text={t("name")} />
        <SubHeader>{t("tagline")}</SubHeader>
        <Image src={landing} />
        <Confetti />
        <Card
          text={t("description")}
          buttonAction={() => alert("not implemented yet")}
          buttonText={t("buttons.getWaifus")}
        />
      </Content>
    </StyledLanding>
  );
};

export default Landing;
