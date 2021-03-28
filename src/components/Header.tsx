import styled, { keyframes } from "styled-components";
import Underline from "./Underline";

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.h1`
  font-size: 5rem;
  font-weight: 600;
  color: var(--text-primary);
`;

type Props = {
  text: string;
};

const Header = (props: Props) => {
  return (
    <StyledHeader>
      <Text>{props.text}</Text>
    </StyledHeader>
  );
};

export default Header;
