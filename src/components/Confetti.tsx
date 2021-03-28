import { useEffect, useState } from "react";
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
`;

// const float = keyframes`
//     0% {
//         transform: translate(-20px, -5px);
//     }
//     50% {
//         transform: translate(0, 0);
//     }
//     100% {
//         transform: translate(20px, -2px);
//     }
// `;

// const FloatAnimation = styled.div`
//   animation: ${float} 3s alternate 0s infinite;
// `;

const rotate = keyframes`
    0% {
        transform: translate(-80vh, -80vh);
    }
    100% {
        transform: translate(80vh, 80vh);
    }
`;

const ConfettiItem = styled.img`
  position: absolute;
  border-radius: 2px;
  animation: ${rotate} 20s linear 0s infinite;
`;

const Confetti = () => {
  const [confetti, setConfetti] = useState<ConfettiType[]>([]);

  useEffect(() => {
    let _confetti: ConfettiType[] = [];
    for (let i = 0; i < CONFETTI_COUNT; i++) {
      const width = Math.random() * 30 + 30;

      _confetti.push({
        left: Math.random() * 200 - 100,
        top: Math.random() * 200 - 100,
        width: width,
        height: width / 2,
        blur: (width - 10) / 10,
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
          src={sakura}
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
