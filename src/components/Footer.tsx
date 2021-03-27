import styled from "styled-components";

const Container = styled.footer`
  border-top: 2px solid #e7e4e7;
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
`;

const Footer = () => {
  return (
    <Container>
      footer items will go here :)
    </Container>
  )
}

export default Footer;