import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { selectImageApi } from "../state/reducers/globals";
import { Waifu } from "../types/waifusion";
import { ArrowRightIcon } from "./Icons";
import WaifuCardImage from "./WaifuCardImage";

const Container = styled(Link)`
  width: 220px;
  border-radius: 1rem;
  border: 2px solid var(--plain-shadow);
  box-shadow: 0 0.2rem 0 0 var(--plain-shadow);
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.3s;
  height: 22.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  :hover {
    box-shadow: 0 0.3rem 0 0 var(--plain-shadow);
    transform: translateY(-0.1rem);
  }

  :active {
    box-shadow: 0 0 0 0 var(--plain-shadow);
    transform: translateY(0.2rem);
  }
`;

const ImageContainer = styled.div`
  overflow: hidden;
  width: 100%;
  border-radius: 0.8rem;
`;

const DetailHeader = styled.div`
  padding-bottom: 0.5rem;
  font-size: 15pt;

  span:first-child {
    font-weight: 500;
  }

  span:last-child {
    color: var(--text-secondary);
  }
`;

const ActionRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 0.5rem;

  span {
    color: var(--text-secondary);
    font-weight: 500;
  }

  svg {
    margin-left: auto;
    height: 12pt;
    color: var(--text-secondary);
  }
`;

type Props = {
  waifu: Waifu;
};

const WaifuCard: React.FC<Props> = ({ waifu }) => {
  const imageApi = useSelector(selectImageApi);

  return (
    <Container to={`/waifu/${waifu.id}`}>
      <DetailHeader>
        <span>{waifu.name}</span> <span>#{waifu.id}</span>
      </DetailHeader>
      <ImageContainer>
        <WaifuCardImage
          src={`${imageApi}${waifu.id}.png`}
          alt={`Waifu ${waifu.name} #${waifu.id}`}
        />
      </ImageContainer>
      <ActionRow>
        <span>View profile</span>
        <ArrowRightIcon />
      </ActionRow>
    </Container>
  );
};

export default memo(WaifuCard);
