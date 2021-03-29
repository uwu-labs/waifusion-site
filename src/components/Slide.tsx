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
  color: var(--plain-dark);
  margin-bottom: 2rem;
  text-align: center;
`;

const Slide = () => {
  return (
    <StyledSlide>
      <Card>
        <Header>WET Token</Header>
        <Body>
          The Waifu Enhancement Token (WET) is an exclusive token to the
          Waifusion world wide harem. WET serves two purposes: Give Waifus a
          unique name that is permanently stored and publicly visible on the
          Ethereum Blockchain. Burning an undesirable Waifu in exchange for a
          new Waifu from the Dungeon If you own a Waifu, you can claim the WETs
          that are constantly being produced by them being in your harem. Each
          Waifu will drip around 3,660 WETs per year. To change the name of any
          Waifu, you need to send 1,830 WETs (about ½ years of Waifu emission)
          to the Waifusion contract with the new name. To burn a Waifu you need
          to send a Waifu and 5,490 WETs to the Waifusion contract they will
          disappear forever...
        </Body>
        <Button secondary>Get WET</Button>
      </Card>
    </StyledSlide>
  );
};

export default Slide;
