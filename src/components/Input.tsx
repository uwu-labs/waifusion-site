import React from "react";
import styled from "styled-components";

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

type Props = {
  value: string;
  update: (value: string) => void;
  placeholder?: string;
  type?: string;
};

const Input: React.FC<Props> = (props) => {
  return (
    <StyledInput
      value={props.value}
      type={props.type || "text"}
      placeholder={props.placeholder}
      onChange={(event) => props.update(event.target.value)}
    />
  );
};

export default Input;
