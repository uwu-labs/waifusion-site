import styled from "styled-components";
import { PageContentWrapper } from "../components/CommonLayout";

const Container = styled(PageContentWrapper)`
  display: flex;
  flex-direction: column;

  h2 {
    margin: 20px 0;
    font-weight: 500;
  }
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  height: 400px;
  /* background-color: var(--primary); */
  border-radius: 40px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2rem;
  text-align: center;
  overflow: hidden;
  position: relative;
  color: #fff;
  margin-bottom: 20px;
  text-shadow: 1px 0px 4px rgba(0, 0, 0, 0.4);

  h1 {
    font-weight: 600;
    font-size: 40pt;
    margin: 20px 0px;
    color: var(--background-primary);
  }

  p {
    font-size: 20pt;
    color: var(--background-primary);
  }
`;

const HarajukuVideo = styled.video`
  position: absolute;
  width: 100%;
  z-index: -1;
  filter: blur(5px) brightness(0.8);
`;

const Home = () => {
  return (
    <Container>
      <Header>
        <HarajukuVideo
          controls={false}
          autoPlay
          loop
          src={"/w-static/media/harajukunight.mp4"}
        />
        <h1>Waifusion</h1>
        <p>
          Waifusion is a digital Waifu collection. There are 16,384
          guaranteed-unique Waifusion NFTs. They’re just like you; a beautiful
          work of art, but 2-D and therefore, superior, Anon-kun.
        </p>
      </Header>

      <h2>Waifus of the Week</h2>
    </Container>
  );
};

export default Home;
