import React from "react";
import styled, { keyframes } from "styled-components";
import Button from "./Button";

const rotate = keyframes`
    0% {
        background-position: 0% 50%;
    }
    100% {
        background-position: 150% 50%;
    }
`;

const Background = styled.div`
  box-shadow: 0px 4px 20px 20px rgba(0, 0, 0, 0.04);
  width: 100%;
  padding: 2px 2px 6px 2px;
  border-radius: 1.1rem;
  transform: translateY(-0.5rem);
  filter: saturate(1.5);
  background: linear-gradient(
      45deg,
      var(--primary) 0%,
      var(--secondary) 25%,
      var(--highlight) 50%,
      var(--secondary) 75%,
      var(--primary) 100%
    )
    0% 0% / 300% 300%;
  animation: ${rotate} 3s linear 0s infinite;
`;

const StyledCard = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--plain);
  padding: 1.8rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardText = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--plain-dark);
  text-align: center;
`;

const ButtonContainer = styled.div`
  margin-top: 2rem;
  display: flex;

  button {
    margin: 0 1rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    button {
      margin: 1rem 0;
    }
  }
`;

type Props = {
  text: string;
  buttonText?: string;
  buttonAction?: () => void;
  secondButtonText?: string;
  secondButtonAction?: () => void;
};

const Card: React.FC<Props> = (props) => {
  return (
    <Background>
      <StyledCard>
        <CardText>{props.text}</CardText>
        {(props.buttonText || props.secondButtonText) && (
          <ButtonContainer>
            {props.buttonText && (
              <Button
                primary
                onClick={() => {
                  if (props.buttonAction) props.buttonAction();
                }}
              >
                {props.buttonText}
              </Button>
            )}
            {props.secondButtonText && (
              <Button
                secondary
                onClick={() => {
                  if (props.secondButtonAction) props.secondButtonAction();
                }}
              >
                {props.secondButtonText}
              </Button>
            )}
          </ButtonContainer>
        )}
      </StyledCard>
    </Background>
  );
};

export default Card;
