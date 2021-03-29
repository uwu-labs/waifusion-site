import styled, { keyframes } from "styled-components";
import Button from "./Button";

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
  margin-bottom: 2rem;
  text-align: center;
  color: var(--plain-dark);
`;

const List = styled.ul`
  margin: 1rem auto 2rem auto;
  width: 80%;
  text-align: left;
`;

const Item = styled.li`
  color: var(--plain-dark);
  margin-bottom: 0.3rem;
`;

const Slide = () => {
  return (
    <StyledSlide>
      <Card>
        <Header>WET Token</Header>
        <Body>
          The Waifu Enhancement Token (WET) is an exclusive token to the
          Waifusion world wide harem. There are two uses for the WET Token:
          <List>
            <Item>
              Renaming your Waifu to a new name perminantly stored on the
              Ethereum Blockchain
            </Item>
            <Item>
              Burning an undesirable Waifu in exchange for a new Waifu from the
              Dungeon
            </Item>
          </List>
          Waifus passively generate WET tokens just by holding them! Each Waifu
          will generate 3,660 WET per year. You can claim your WET tokens in the
          wallet page. To change the name of a Waifu, you need to send 1,830
          WET. To burn a Waifu you need to send a Waifu and 5,490 WET to the
          Waifusion contract, they will disappear forever...
        </Body>
        <Button secondary>Get WET</Button>
      </Card>
    </StyledSlide>
  );
};

export default Slide;
