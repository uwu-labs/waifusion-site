import styled from "styled-components";
import Button from "../components/Button";
import { PageContentWrapper } from "../components/CommonLayout";
import {
  CatgirlTraitIcon,
  EyesTraitIcon,
  HashIcon,
  SchoolgirlTraitIcon,
  SwimsuitTraitIcon,
} from "../components/Icons";
import LargeWaifuCard from "../components/LargeWaifuCard";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  flex: 1;
  width: 100%;

  h1 {
    margin: 0;
    font-size: 28pt;
  }

  h2 {
    margin: 20px 0;
    font-weight: 500;
  }

  p {
    margin: 0;
    font-size: 16pt;
    color: var(--text-secondary);
  }

  button {
    margin-bottom: 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PrimaryInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const WaifuOwnerInfo = styled(PrimaryInfo)`
  text-align: right;

  h3 {
    font-weight: 500;
    margin: 0;
  }

  label {
    color: #9c9b9c;
    font-weight: 500;
  }
`;

const WaifuOwnerIconWrapper = styled.div`
  margin-left: 1rem;
  border: 2px dotted #817d82;
  border-radius: 50%;
  width: 45px;
  height: 45px;
`;

const WaifuOwnerIcon = styled.img`
  border: 2px solid #fff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
`;

const MetaRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  color: var(--text-secondary);
`;

const MetaItem = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 20px;
  align-items: center;
  font-weight: 500;
  font-size: 16pt;

  svg {
    height: 16pt;
  }
`;

const WaifuOwnerContainer = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TraitsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const TraitTag = styled.div<{ colorTrait?: string }>`
  width: 50%;
  background-color: #f9f6f9;
  border: 2px solid #f2eef3;
  border-radius: 100px;
  padding: 0.5rem 1.2rem;
  color: #817d82;
  font-weight: 500;
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 1rem;
  margin-bottom: 1rem;

  svg {
    height: 18pt;
    width: 18pt;
    margin-right: 0.5rem;
    color: ${(props) =>
      props.colorTrait ? props.colorTrait : "var(--text-secondary)"};
  }

  h3 {
    margin: 0;
  }
`;

const TraitDetail = styled.div`
  display: flex;
  flex-direction: column;
`;

const exampleTraits = [
  {
    trait_type: "HeadAccessory",
    value: "catgirl",
  },
  {
    trait_type: "headaccessoryStyle",
    value: "tabby",
  },
  {
    trait_type: "Top",
    value: "swimsuit",
  },
  {
    trait_type: "Bottom",
    value: "schoolgirl",
  },
  {
    trait_type: "BottomColor",
    value: "brown",
  },
  {
    trait_type: "Skintone",
    value: "light",
  },
  {
    trait_type: "BodySize",
    value: "petite",
  },
  {
    trait_type: "Background",
    value: "classroom",
  },
  {
    trait_type: "BackgroundStyle",
    value: "normie",
  },
  {
    trait_type: "Face",
    value: "opensmile",
  },
  {
    trait_type: "Hairstyle",
    value: "long",
  },
  {
    trait_type: "HairColor",
    value: "black",
  },
  {
    trait_type: "Eyes",
    value: "brown",
  },
  {
    trait_type: "Socks",
    value: "schoolgirl",
  },
  {
    trait_type: "SocksColor",
    value: "brown",
  },
];

const WaifuDetail = () => {
  return (
    <PageContentWrapper>
      <Wrapper>
        <LargeWaifuCard />
        <Content>
          <Header>
            <PrimaryInfo>
              <h1>Kaitlyn</h1>
              <MetaRow>
                <MetaItem>
                  <HashIcon />
                  <label>2043</label>
                </MetaItem>
              </MetaRow>
            </PrimaryInfo>

            <WaifuOwnerContainer>
              <WaifuOwnerInfo>
                <h3>Phineas</h3>
                <label>Owner</label>
              </WaifuOwnerInfo>
              <WaifuOwnerIconWrapper>
                <WaifuOwnerIcon
                  src={"https://avatars.githubusercontent.com/u/6209808?v=4"}
                />
              </WaifuOwnerIconWrapper>
            </WaifuOwnerContainer>
          </Header>

          <h2>Bio</h2>
          <p>
            Kaitlyn is a cute catgirl who loves to swim. She is also very shy
            and is currently learning how to speak Japanese.
          </p>

          <h2>Traits</h2>
          <TraitsContainer>
            <TraitTag>
              <CatgirlTraitIcon />
              <TraitDetail>
                <h3>Catgirl</h3>
                <label>HeadAccessory</label>
              </TraitDetail>
            </TraitTag>
            <TraitTag>
              <SchoolgirlTraitIcon />
              <TraitDetail>
                <h3>Schoolgirl</h3>
                <label>Bottom</label>
              </TraitDetail>
            </TraitTag>
            <TraitTag>
              <SwimsuitTraitIcon />
              <TraitDetail>
                <h3>Swimsuit</h3>
                <label>Top</label>
              </TraitDetail>
            </TraitTag>
            <TraitTag colorTrait={"#98614b"}>
              <EyesTraitIcon />
              <TraitDetail>
                <h3>Brown</h3>
                <label>Eyes</label>
              </TraitDetail>
            </TraitTag>
          </TraitsContainer>

          <h2>Tools</h2>
          <Button>Change Name</Button>
          <Button danger>Burn Waifu</Button>
        </Content>
      </Wrapper>
    </PageContentWrapper>
  );
};

export default WaifuDetail;
