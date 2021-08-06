import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as LogoNoMaskSvg } from "../assets/logo-nomask.svg";
import { ReactComponent as LogoMaskSvg } from "../assets/logo-mask.svg";
import * as ROUTES from "../constants/routes";

const StyledLogo = styled(Link)`
  position: relative;
  height: 4rem;
  width: 10rem;
`;

const StyledLogoNoMaskSvg = styled(LogoNoMaskSvg)<{ show: boolean }>`
  position: absolute;
  left: 0;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: 0.2s linear;
`;

const Logo: React.FC = () => {
  const [isHover, setIsHover] = useState(false);

  return (
    <StyledLogo
      to={ROUTES.HOME}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <LogoMaskSvg title="NoMaskLogo" />
      <StyledLogoNoMaskSvg title="NoMaskLogo" show={isHover} />
    </StyledLogo>
  );
};

export default Logo;
