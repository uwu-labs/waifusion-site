import styled, { keyframes } from "styled-components";

const rotate = keyframes`
    0% {
        background-position: 0% 50%;
    }
    100% {
        background-position: 150% 50%;
    }
`;

const StyledUnderline = styled.div`
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

const Underline = () => {
  return <StyledUnderline />;
};

export default Underline;
