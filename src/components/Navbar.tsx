import styled from "styled-components";
import { ChevronDownIcon, DungeonIcon, SearchIcon, WalletIcon } from "./Icons";
import { Link } from "react-router-dom";
import Button from "./Button";
import Logo from "./Logo";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  padding: 10px 32px;
  border-bottom: 2px solid #e7e4e7;
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
  path {
    color: var(--primary-dark);
  }
`;

const Navbar = () => {
  return (
    <Container>
      <Logo />
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
