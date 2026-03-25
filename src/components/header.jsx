import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box } from "./ui";

import ethLogo from "../images/Eth_logo.png";
import NavPinkBar from "../images/nav_pink_bar.png";
import "./header.css";

import styled from "styled-components";

const Container = styled.header`
  margin: 1.45rem 0;
  position: relative;
  z-index: 5;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  padding: 1rem;

  @media (max-width: 990px) {
    flex-direction: column;
  }
`;

const Logo = styled.img.attrs({
  loading: "eager",
  decoding: "async",
  fetchPriority: "high",
})`
  margin-bottom: 0;
  vertical-align: top;
`;

const ButtonsWrapper = styled.div``;

const Header = ({ siteTitle, menuLinks }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <Box className="waifu-card-box" maxWidth={1435}>
        <div style={{ marginLeft: 4, marginTop: 4 }}>
          <img
            src={NavPinkBar}
            alt="pink nav bar"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            style={{ marginBottom: -4 }}
          />
          <Box
            className="nav-waifu-card-box-sub"
            color="white"
            style={{ maxWidth: 1424, marginBottom: 1 }}
          >
            <Content>
              <Logo alt="Ethereum" src={ethLogo} />
              <ButtonsWrapper className="nav-bar-buttons-row">
                {menuLinks.map((link) => (
                  <Button.Outline
                    key={link.name}
                    className="nav-menu-buttons"
                    type="button"
                    onClick={() => navigate(link.link)}
                    title={link.name}
                  >
                    {link.name}
                  </Button.Outline>
                ))}
              </ButtonsWrapper>
            </Content>
          </Box>
        </div>
      </Box>
    </Container>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
  menuLinks: PropTypes.array,
};

Header.defaultProps = {
  siteTitle: ``,
  menuLinks: [],
};

export default Header;
