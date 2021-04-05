import styled from "styled-components";

const Input = styled.input`
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

export default Input;
