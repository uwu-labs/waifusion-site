import React from "react";
import styled from "styled-components";

const StyledHeader = styled.div``;

type Props = {
  text: string;
};

const Header = (props: Props) => {
  return <StyledHeader>{props.text}</StyledHeader>;
};

export default Header;
