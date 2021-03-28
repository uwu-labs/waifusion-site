import styled, { keyframes } from "styled-components";

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.h1`
  font-size: 5rem;
  font-weight: 600;
  color: var(--text-primary);
`;

const rotate = keyframes`
    0% {
        background-position: 0% 50%;
    }
    100% {
        background-position: 150% 50%;
    }
`;

const Underline = styled.div`
  height: 3px;
  width: 100%;
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
  transform: translateY(-1rem);
  animation: ${rotate} 3s linear 0s infinite;
  border-radius: 1px;
`;

type Props = {
  text: string;
};

const Header = (props: Props) => {
  return (
    <StyledHeader>
      <Text>{props.text}</Text>
      <Underline />
    </StyledHeader>
  );
};

export default Header;
