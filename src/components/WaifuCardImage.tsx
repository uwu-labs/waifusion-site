import React, { ReactEventHandler } from "react";
import styled from "styled-components";
import useImageLoad from "../hooks/useImageLoad";

interface WaifuCardImageProps {
  src: string;
  alt: string;
}

const WaifuCardImage: React.FC<WaifuCardImageProps> = ({ src, alt }) => {
  const [ref, loaded, onLoad] = useImageLoad();

  return (
    <>
      <Picture
        ref={ref as React.Ref<any>}
        style={{ opacity: loaded ? 1 : 0 }}
        onLoad={onLoad as ReactEventHandler<HTMLImageElement>}
        src={src}
        alt={alt}
        loading="lazy"
      />
    </>
  );
};

const Picture = styled.img<{ loaded?: boolean }>`
  object-fit: contain;
  height: ${(props) => (props.loaded ? "0" : "100%")};
  width: 100%;
  transform: scale(1.1);
  user-drag: none;
  user-select: none;
  opacity: ${(props) => (props.loaded ? 0 : 1)};
  transition: all 1s;
`;

export default WaifuCardImage;
