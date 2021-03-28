import styled from "styled-components";
import Header from "./Header";
import landing from "../assets/landing.png";
import Button from "./Button";

const StyledLanding = styled.div`
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

const Background = styled.div`
  width: 60vw;
  padding: 1px;
`;

const Card = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--plain);
  box-shadow: 0 0.2rem 0 0 var(--plain-shadow);
  border: 2px solid var(--plain-shadow);
  padding: 1rem;
  border-radius: 1rem;
  transform: translateY(-0.5rem);
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
