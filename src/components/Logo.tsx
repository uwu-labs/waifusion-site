import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LogoImg from "../assets/logo-nomask.svg";
import LogoMaskImg from "../assets/logo-mask.svg";
import * as ROUTES from "../constants/routes";

const StyledLogo = styled(Link)`
  position: relative;
  height: 4rem;
  width: 10rem;
`;

const Image = styled.img<{ hide?: boolean }>`
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

const Logo: React.FC = () => {
  const [logoHoverActive, setLogoHoverActive] = useState(false);

  return (
    <StyledLogo
      to={ROUTES.HOME}
      onMouseEnter={() => setLogoHoverActive(true)}
      onMouseLeave={() => setLogoHoverActive(false)}
    >
      <Image src={LogoMaskImg} />
      <Image src={LogoImg} hide={!logoHoverActive} />
    </StyledLogo>
  );
};

export default Logo;
