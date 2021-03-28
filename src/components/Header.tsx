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

//   background: linear-gradient(
//       45deg,
//       rgb(255, 0, 0) 0%,
//       rgb(255, 154, 0) 10%,
//       rgb(208, 222, 33) 20%,
//       rgb(79, 220, 74) 30%,
//       rgb(63, 218, 216) 40%,
//       rgb(47, 201, 226) 50%,
//       rgb(28, 127, 238) 60%,
//       rgb(95, 21, 242) 70%,
//       rgb(186, 12, 248) 80%,
//       rgb(251, 7, 217) 90%,
//       rgb(255, 0, 0) 100%
//     )
//     0% 0% / 300% 300%;

//   background: linear-gradient(
//       45deg,
//       var(--primary) 0%,
//       var(--primary) 10%,
//       var(--secondary) 10%,
//       var(--secondary) 20%,
//       var(--highlight) 20%,
//       var(--highlight) 30%,
//       var(--text-secondary) 30%,
//       var(--text-secondary) 100%,
//       var(--primary) 100%
//     )
//     0% 0% / 300% 300%;

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
  transform: translateY(-1.4rem);
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
