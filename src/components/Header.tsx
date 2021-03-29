import styled from "styled-components";

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
`;

const Text = styled.h1`
  font-size: 5rem;
  font-weight: 500;
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
