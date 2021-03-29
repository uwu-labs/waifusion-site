import styled from "styled-components";
import Button from "./Button";

const StyledSlide = styled.div`
  width: 100%;
  display: flex;
  height: 50vh;
  justify-content: center;
  align-items: center;
  background-color: var(--primary);
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
`;

const Header = styled.h2`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--plain-dark);
`;

const Body = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--plain-dark);
  margin-bottom: 2rem;
`;

const Slide = () => {
  return (
    <StyledSlide>
      <Card>
        <Header>WET Token</Header>
        <Body>
          COntent contentCOntent content COntent content COntent content COntent
          content COntent content COntent contentCOntent content COntent content
          COntent content COntent COntent contentCOntent content COntent content
          COntent content COntent COntent contentCOntent content COntent content
          COntent content COntent content COntent content content COntent
          content content COntent content
        </Body>
        <Button secondary>Get WET</Button>
      </Card>
    </StyledSlide>
  );
};

export default Slide;
