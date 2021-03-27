import { useState } from "react";
import styled from "styled-components";
import LogoImg from "../assets/logo-nomask.svg";
import LogoMaskImg from "../assets/logo-mask.svg";
import { ChevronDownIcon, DungeonIcon, SearchIcon, WalletIcon } from "./Icons";
import { Link } from "react-router-dom";
import Button from "./Button";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  padding: 10px 32px;
  border-bottom: 2px solid #e7e4e7;
`;

const LogoContainer = styled(Link)`
  position: relative;
  height: 4rem;
  width: 10rem;
`;

const Logo = styled.img<{ hide?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  cursor: pointer;
  color: var(--background-primary);
  vertical-align: bottom;
  transition: opacity 0.2s;
  opacity: ${(props) => (props.hide ? "0" : "1")};
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
  cursor: pointer;
`;

const LinkableItem = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-wrap: nowrap;
  font-weight: 500;
  align-items: center;
  font-size: 15pt;
  cursor: pointer;
  transition: all 0.3s;

  :hover {
    color: var(--primary-shadow);
  }

  svg {
    height: 14pt;
    margin-right: 7px;
  }

  label {
    cursor: pointer;
  }
`;

const SignedInAddressContainer = styled(Button)`
  svg {
    margin-left: 5px;
    vertical-align: middle;
  }
`;

const Navbar = () => {
  const [logoHoverActive, setLogoHoverActive] = useState(false);

  return (
    <Container>
      <LogoContainer
        to={"/"}
        onMouseEnter={() => setLogoHoverActive(true)}
        onMouseLeave={() => setLogoHoverActive(false)}
      >
        <Logo src={LogoMaskImg} />
        <Logo src={LogoImg} hide={!logoHoverActive} />
      </LogoContainer>

      <NavItemsWrapper>
        <Item>
          <LinkableItem to={"/browse"}>
            <SearchIcon />
            <label>Browse</label>
          </LinkableItem>
        </Item>
        <Item>
          <LinkableItem to={"/wallet"}>
            <WalletIcon />
            <label>Wallet</label>
          </LinkableItem>
        </Item>
        <Item>
          <LinkableItem to={"/dungeon"}>
            <DungeonIcon />
            <label>Dungeon</label>
          </LinkableItem>
        </Item>
        <Item>
          <SignedInAddressContainer primary small>
            0xd...3AF
            <ChevronDownIcon />
          </SignedInAddressContainer>
        </Item>
      </NavItemsWrapper>
    </Container>
  );
};

export default Navbar;
