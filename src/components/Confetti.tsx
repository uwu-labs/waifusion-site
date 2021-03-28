import { useEffect, useState } from "react";
import styled from "styled-components";

const CONFETTI_COUNT = 40;

type ConfettiType = {
  left: number;
  top: number;
  width: number;
  height: number;
  blur: number;
  rotation: number;
  color: number;
};

const StyledConfetti = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const ConfettiItem = styled.div<{
  left: number;
  top: number;
  width: number;
  height: number;
  blur: number;
  rotation: number;
  color: number;
}>`
  position: absolute;
  left: ${(props) => props.left + "%"};
  top: ${(props) => props.top + "%"};
  width: ${(props) => props.width + "px"};
  height: ${(props) => props.height + "px"};
  filter: blur(${(props) => props.blur + "px"});
  transform: rotate(${(props) => props.rotation + "deg"});
  color: ${(props) => {
    if (props.color === 0) return "var(--highlight)";
    else if (props.color === 1) return "var(--secondary)";
    else return "var(--primary)";
  }};
`;

const Confetti = () => {
  const [confetti, setConfetti] = useState<ConfettiType[]>([]);

  useEffect(() => {
    let _confetti: ConfettiType[] = [];
    for (let i = 0; i < CONFETTI_COUNT; i++) {
      confetti.push({
        left: Math.random() * 100,
        top: Math.random() * 100,
        width: Math.random() * 10 + 10,
        height: Math.random() * 10 + 5,
        blur: Math.random() * 2 + 1,
        rotation: Math.random() * 360,
        color: Math.round(Math.random() * 3),
      });
    }
    setConfetti(_confetti);
  }, []);

  return (
    <StyledConfetti>
      {confetti.map((conf: ConfettiType) => (
        <ConfettiItem
          left={conf.left}
          top={conf.top}
          width={conf.width}
          height={conf.height}
          blur={conf.blur}
          rotation={conf.rotation}
          color={conf.color}
        />
      ))}
    </StyledConfetti>
  );
};

export default Confetti;
