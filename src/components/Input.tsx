import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
  border-radius: 1rem;
  border: 2px solid var(--plain-shadow);
  box-shadow: 0 0.2rem 0 0 var(--plain-shadow);
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  outline: none;
  color: var(--text-primary);

  ::placeholder {
    color: var(--text-secondary);
  }
`;

const Max = styled.button`
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
  top: 50%;
  transform: translateY(-50%);
  right: 0.5rem;
  border: none;
  margin-top: 0;
  background-color: var(--plain);
`;

type Props = {
  value: string;
  update: (value: string) => void;
  placeholder?: string;
  type?: string;
  max?: string;
};

const Input: React.FC<Props> = (props) => {
  return (
    <Container>
      <StyledInput
        value={props.value}
        type={props.type || "text"}
        placeholder={props.placeholder}
        onChange={(event) => props.update(event.target.value)}
      />
      {props.max && (
        <Max onClick={() => props.update(props.max || "0")}>max</Max>
      )}
    </Container>
  );
};

export default Input;
