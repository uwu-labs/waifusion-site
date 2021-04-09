/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import Logo from "./Logo";
import Underline from "./Underline";
import NavItems from "./NavItems";
import Popup from "./Popup";

const StyledNavbar = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 10px 32px;

  @media (max-width: 768px) {
    padding: 10px 20px;
  }
`;

const NavItemsContainer = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const Hamburger = styled.button`
  display: flex;
  flex-direction: column;
  width: 1.5rem;
  height: 1.2rem;
  justify-content: space-between;
  border: none;
  background: none;
  outline: none;

  @media (min-width: 769px) {
    display: none;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 0.1rem;
  background-color: var(--text-primary);
`;

const Navbar: React.FC = () => {
  const [navOpen, setNavOpen] = useState(false);
  const history = useHistory();

  history.listen(() => {
    setNavOpen(false);
  });

  return (
    <StyledNavbar>
      <Container>
        <Logo />
        <NavItemsContainer>
          <NavItems />
        </NavItemsContainer>
        <Hamburger onClick={() => setNavOpen(true)}>
          <Line />
          <Line />
          <Line />
        </Hamburger>
        <Popup
          show={navOpen}
          close={() => setNavOpen(false)}
          content={<NavItems />}
        />
      </Container>
      <Underline />
    </StyledNavbar>
  );
};

export default Navbar;
