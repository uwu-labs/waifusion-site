import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronDownIcon, DungeonIcon, SearchIcon, WalletIcon } from "./Icons";
import Button from "./Button";
import Logo from "./Logo";
import Underline from "./Underline";

const StyledNavbar = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  padding: 10px 32px;
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

  * {
    color: var(--text-secondary);
  }

  :hover {
    * {
      color: var(--primary-shadow);
    }
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
  const [t] = useTranslation();

  return (
    <StyledNavbar>
      <Container>
        <Logo />
        <NavItemsWrapper>
          <Item>
            <LinkableItem to="/browse">
              <SearchIcon />
              <label>{t("navigation.browse")}</label>
            </LinkableItem>
          </Item>
          <Item>
            <LinkableItem to="/wallet">
              <WalletIcon />
              <label>{t("navigation.wallet")}</label>
            </LinkableItem>
          </Item>
          <Item>
            <LinkableItem to="/dungeon">
              <DungeonIcon />
              <label>{t("navigation.dungeon")}</label>
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
      <Underline />
    </StyledNavbar>
  );
};

export default Navbar;
