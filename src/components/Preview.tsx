import styled from "styled-components";
import WaifuCard from "./WaifuCard";

const StyledPreview = styled.div`
  width: 100%;
  padding: 3rem;
  min-height: 60vh;
`;

const previewWaifusTemp: Waifu[] = [
  {
    id: 2043,
    name: "Kaitlyn"
  }
]

const Preview = () => {
  return (
    <StyledPreview>
      This could be an example of some waifus maybe? Recently sold ones or
      something.
      <WaifuCard waif/>
    </StyledPreview>
  );
};

export default Preview;
