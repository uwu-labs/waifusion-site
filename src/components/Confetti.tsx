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

const ConfettiItem = styled.div`
  position: absolute;
`;

const Confetti = () => {
  const [confetti, setConfetti] = useState<ConfettiType[]>([]);

  useEffect(() => {
    let _confetti: ConfettiType[] = [];
    for (let i = 0; i < CONFETTI_COUNT; i++) {
      _confetti.push({
        left: Math.random() * 100,
        top: Math.random() * 100,
        width: Math.random() * 10 + 10,
        height: Math.random() * 10 + 5,
        blur: Math.random() * 2 + 1,
        rotation: Math.random() * 360,
        color: Math.round(Math.random() * 3),
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
            backgroundColor: "red",
          }}
        />
      ))}
    </StyledConfetti>
  );
};

export default Confetti;
