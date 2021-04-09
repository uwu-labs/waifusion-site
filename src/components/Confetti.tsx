import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import sakura from "../assets/sakura.png";

const CONFETTI_COUNT = 40;

type ConfettiType = {
  left: number;
  top: number;
  width: number;
  height: number;
  blur: number;
  rotation: number;
};

const StyledConfetti = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  backface-visibility: hidden;
  perspective: 1000;
`;

const fall = keyframes`
    0% {
        transform: translate(-80vh, -80vh);
    }
    100% {
        transform: translate(180vh, 180vh);
    }
`;

const FallingAnimation = styled.div`
  position: absolute;
  animation: ${fall} 30s linear 0s infinite;
`;

const float = keyframes`
    0% {
        transform: translate(-30px, -10px) rotate(35deg);
    }
    50% {
        transform: translate(0, 0) rotate(0deg);
    }
    100% {
        transform: translate(30px, -10px) rotate(-35deg);
    }
`;

const ConfettiItem = styled.img`
  border-radius: 2px;
  animation: ${float} 3s alternate 0s infinite;
`;

const Confetti: React.FC = () => {
  const [confetti, setConfetti] = useState<ConfettiType[]>([]);

  useEffect(() => {
    const _confetti: ConfettiType[] = [];
    for (let i = 0; i < CONFETTI_COUNT; i++) {
      const width = Math.random() * 30 + 30;

      _confetti.push({
        left: Math.random() * 200 - 100,
        top: Math.random() * 200 - 100,
        width,
        height: width / 2,
        blur: (width - 10) / 10,
        rotation: Math.round(Math.random() * 360),
      });
    }
    setConfetti(_confetti);
  }, []);

  return (
    <StyledConfetti>
      {confetti.map((conf: ConfettiType, index: number) => (
        <FallingAnimation
          key={index}
          style={{
            left: `${conf.left}%`,
            top: `${conf.top}%`,
          }}
        >
          <ConfettiItem
            src={sakura}
            style={{
              width: `${conf.width}px`,
              height: `${conf.height}px`,
              filter: `blur(${conf.blur}px)`,
              transform: `rotation(${conf.rotation}deg)`,
            }}
          />
        </FallingAnimation>
      ))}
    </StyledConfetti>
  );
};

export default Confetti;
