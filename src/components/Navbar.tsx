import { useState } from "react";
import styled from "styled-components";
import LogoImg from "../assets/logo-nomask.svg";
import LogoMaskImg from "../assets/logo-mask.svg";
import { ChevronDownIcon, DungeonIcon, SearchIcon, WalletIcon } from "./Icons";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  padding: 10px 32px;
  border-bottom: 2px solid #e7e4e7;
`;

const Logo = styled.img`
  height: 4rem;
  width: 10rem;
  cursor: pointer;
  color: #fff;
  vertical-align: bottom;
`;

const NavItemsWrapper = styled.ul`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
`;

const Item = styled.li`
  margin-left: 30px;
  display: flex;
  flex-direction: row;
`;

const LinkableItem = styled.a`
  display: flex;
  flex-wrap: nowrap;
  font-weight: 500;
  align-items: center;
  font-size: 15pt;

  svg {
    height: 14pt;
    margin-right: 7px;
  }
`;

const SignedInAddressContainer = styled.div`
  background-color: #f9c5f7;
  border-radius: 50px;
  padding: 0.5rem 1rem;
  font-weight: 600;

  svg {
    margin-left: 5px;
    vertical-align: middle;
  }
`;

const Navbar = () => {
  const [logoHoverActive, setLogoHoverActive] = useState(false);

  return (
    <Container>
      <Link to={"/"}>
        <Logo
          onMouseEnter={() => setLogoHoverActive(true)}
          onMouseLeave={() => setLogoHoverActive(false)}
          src={!logoHoverActive ? LogoMaskImg : LogoImg}
        />
      </Link>

      <NavItemsWrapper>
        <Item>
          <LinkableItem>
            <SearchIcon />
            <label>Browse</label>
          </LinkableItem>
        </Item>
        <Item>
          <LinkableItem>
            <WalletIcon />
            <label>Wallet</label>
          </LinkableItem>
        </Item>
        <Item>
          <LinkableItem>
            <DungeonIcon />
            <label>Dungeon</label>
          </LinkableItem>
        </Item>
        <Item>
          <SignedInAddressContainer>
            0xd3A
            <ChevronDownIcon />
          </SignedInAddressContainer>
        </Item>
      </NavItemsWrapper>
    </Container>
  );
};

export default Navbar;
