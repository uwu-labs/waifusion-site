import styled from "styled-components";
import Header from "./Header";
import landing from "../assets/landing.png";

const StyledLanding = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubHeader = styled.div`
  font-size: 1.8rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 4rem;
`;

const Image = styled.img`
  width: 50vw;
`;

const Landing = () => {
  return (
    <StyledLanding>
      <Header text={"Waifusion"} />
      <SubHeader>No Waifu, No Laifu</SubHeader>
      <Image src={landing} />
    </StyledLanding>
  );
};

export default Landing;
