import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

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
`;

const rotate = keyframes`
    0% {
        transform: translate(-80vh, -80vh);
    }
    100% {
        transform: translate(80vh, 80vh);
    }
`;

const Animate = styled.div`
  animation: ${rotate} 3s linear 0s infinite;
`;

const ConfettiItem = styled.div`
  position: absolute;
  border-radius: 2px;
  animation: ${rotate} 20s linear 0s infinite;
  background-color: var(--primary);
`;

const Confetti = () => {
  const [confetti, setConfetti] = useState<ConfettiType[]>([]);

  useEffect(() => {
    let _confetti: ConfettiType[] = [];
    for (let i = 0; i < CONFETTI_COUNT; i++) {
      const width = Math.random() * 50 + 10;

      _confetti.push({
        left: Math.random() * 200 - 100,
        top: Math.random() * 200 - 100,
        width: width,
        height: width / 2,
        blur: (width - 10) / 5,
        rotation: Math.random() * 360,
      });
      console.log("meow");
    }
    setConfetti(_confetti);
  }, []);

  return (
    <StyledConfetti>
      {confetti.map((conf: ConfettiType) => (
        <ConfettiItem
          style={{
            left: conf.left + "%",
            top: conf.top + "%",
            width: conf.width + "px",
            height: conf.height + "px",
            filter: "blur(" + conf.blur + "px)",
            transform: "rotation(" + conf.rotation + "deg)",
          }}
        />
      ))}
    </StyledConfetti>
  );
};

export default Confetti;
