import styled from "styled-components";
import Card from "./Card";

const StyledSlide = styled.div`
  width: 100%;
  display: flex;
  height: 50vh;
  justify-content: center;
  align-items: center;
`;

const Slide = () => {
  return (
    <StyledSlide>
      <Card text={"blah"} />
    </StyledSlide>
  );
};

export default Slide;
