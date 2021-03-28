import { useState } from "react";
import styled from "styled-components";
import LogoImg from "../assets/logo-nomask.svg";
import LogoMaskImg from "../assets/logo-mask.svg";
import { Link } from "react-router-dom";

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

const Logo = () => {
  const [logoHoverActive, setLogoHoverActive] = useState(false);

  return (
    <StyledLogo
      to={"/"}
      onMouseEnter={() => setLogoHoverActive(true)}
      onMouseLeave={() => setLogoHoverActive(false)}
    >
      <Image src={LogoMaskImg} />
      <Image src={LogoImg} hide={!logoHoverActive} />
    </StyledLogo>
  );
};

export default Logo;
