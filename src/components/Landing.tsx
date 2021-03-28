import styled, { keyframes } from "styled-components";
import Header from "./Header";
import landing from "../assets/landing.png";
import Button from "./Button";
import Confetti from "./Confetti";

const StyledLanding = styled.div`
  position: relative;
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

const rotate = keyframes`
    0% {
        background-position: 0% 50%;
    }
    100% {
        background-position: 150% 50%;
    }
`;

const Background = styled.div`
  box-shadow: 0px 4px 15px 15px rgba(0, 0, 0, 0.04);
  width: 60vw;
  padding: 2px 2px 6px 2px;
  border-radius: 1.1rem;
  background-color: red;
  transform: translateY(-0.5rem);
  filter: saturate(1.5);
  background: linear-gradient(
      45deg,
      var(--primary) 0%,
      var(--secondary) 25%,
      var(--highlight) 50%,
      var(--secondary) 75%,
      var(--primary) 100%
    )
    0% 0% / 300% 300%;
  animation: ${rotate} 3s linear 0s infinite;
`;

const Card = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--plain);
  /* box-shadow: 0 0.2rem 0 0 var(--plain-shadow);
  border: 2px solid var(--plain-shadow); */
  padding: 1.8rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardText = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
`;

const ButtonContainer = styled.div`
  margin-top: 2rem;
  display: flex;
`;

const Landing = () => {
  return (
    <StyledLanding>
      <Header text={"Waifusion"} />
      <SubHeader>No Waifu, No Laifu</SubHeader>
      <Image src={landing} />
      <Confetti />
      <Background>
        <Card>
          <CardText>
            Waifusion is a digital Waifu collection. There are 16,384
            guaranteed-unique Waifusion NFTs. They’re just like you; a beautiful
            work of art, but 2-D and therefore, superior, Anon-kun. Each Waifu
            is wholly unique and yours forever... unless you sell them... Baka.
          </CardText>
          <ButtonContainer>
            <Button primary>Get Waifus</Button>
          </ButtonContainer>
        </Card>
      </Background>
    </StyledLanding>
  );
};

export default Landing;
