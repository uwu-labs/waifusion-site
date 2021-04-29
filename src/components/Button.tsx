import styled from "styled-components";

const Button = styled.button<{
  primary?: boolean;
  secondary?: boolean;
  highlight?: boolean;
  danger?: boolean;
  small?: boolean;
}>`
  min-width: ${(props) => (props.small ? "0" : "10rem")};
  padding: ${(props) => (props.small ? "0.5rem 1rem" : "0")};
  color: ${(props) => {
    if (props.primary) return "var(--primary-dark)";
    if (props.secondary) return "var(--secondary-dark)";
    if (props.highlight) return "var(--background-primary)";
    if (props.danger) return "var(--background-primary)";
    return "var(--plain-dark)";
  }};
  border-radius: ${(props) => (props.small ? "1.9rem" : "0.5rem")};
  outline: none;
  display: inline-flex;
  border: 2px solid
    ${(props) => {
      if (props.primary) return "var(--primary-shadow)";
      if (props.secondary) return "var(--secondary-shadow)";
      if (props.highlight) return "var(--highlight-shadow)";
      if (props.danger) return "var(--danger-shadow)";
      return "var(--plain-shadow)";
    }};
  font-family: "Calibre";
  height: ${(props) => (props.small ? "auto" : "3rem")};
  background-color: ${(props) => {
    if (props.primary) return "var(--primary)";
    if (props.secondary) return "var(--secondary)";
    if (props.highlight) return "var(--highlight)";
    if (props.danger) return "var(--danger)";
    return "var(--plain)";
  }};
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 0.2rem 0 0
    ${(props) => {
      if (props.primary) return "var(--primary-shadow)";
      if (props.secondary) return "var(--secondary-shadow)";
      if (props.highlight) return "var(--highlight-shadow)";
      if (props.danger) return "var(--danger-shadow)";
      return "var(--plain-shadow)";
    }};
  font-weight: 500;
  line-height: 1;
  font-size: 14pt;
  transition: all 0.3s;
  cursor: pointer;

  :hover {
    box-shadow: 0 0.3rem 0 0
      ${(props) => {
        if (props.primary) return "var(--primary-shadow)";
        if (props.secondary) return "var(--secondary-shadow)";
        if (props.highlight) return "var(--highlight-shadow)";
        if (props.danger) return "var(--danger-shadow)";
        return "var(--plain-shadow)";
      }};
    transform: translateY(-0.1rem);
  }

  :active {
    box-shadow: 0 0 0 0
      ${(props) => {
        if (props.primary) return "var(--primary-shadow)";
        if (props.secondary) return "var(--secondary-shadow)";
        if (props.highlight) return "var(--highlight-shadow)";
        if (props.danger) return "var(--danger-shadow)";
      }};
    transform: translateY(0.2rem);
  }

  :disabled {
    cursor: not-allowed;
    background-color: var(--plain);
    color: var(--plain-dark);
    border: 2px solid var(--plain-shadow);
    box-shadow: 0 0.2rem 0 0 var(--plain-shadow);
  }
`;

export default Button;
