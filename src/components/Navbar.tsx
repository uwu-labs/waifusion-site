import styled from "styled-components";
import LogoImg from "../assets/logo.svg";
import { ChevronDownIcon, DungeonIcon, SearchIcon, WalletIcon } from "./Icons";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  padding: 15px 32px;
  border-bottom: 1px solid #e7e4e7;
`;

const Logo = styled.img`
  height: 3rem;
  width: 9rem;
`;

const NavItemsWrapper = styled.ul`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
`;

const Item = styled.li`
  margin-left: 25px;
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
    height: 15pt;
    margin-right: 10px;
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
  return (
    <Container>
      <Logo src={LogoImg} />

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
