import styled from "styled-components";

const Button = styled.button<{
  primary?: boolean;
  secondary?: boolean;
  highlight?: boolean;
  danger?: boolean;
}>`
  min-width: 10rem;
  color: ${(props) => {
    if (props.primary) return "var(--primary-dark)";
    else if (props.secondary) return "var(--text-secondary)";
    else if (props.highlight) return "var(--background-primary)";
    else if (props.danger) return "var(--background-primary)";
    else return "#817d82";
  }};
  border-radius: 0.5rem;
  outline: none;
  display: inline-flex;
  border: 2px solid
    ${(props) => {
      if (props.primary) return "var(--primary-shadow)";
      else if (props.secondary) return "var(--secondary-shadow)";
      else if (props.highlight) return "var(--highlight-shadow)";
      else if (props.danger) return "var(--danger-shadow)";
      else return "#e7e4e7";
    }};
  font-family: "Calibre";
  height: 3rem;
  background-color: ${(props) => {
    if (props.primary) return "var(--primary)";
    else if (props.secondary) return "var(--secondary)";
    else if (props.highlight) return "var(--highlight)";
    else if (props.danger) return "var(--danger)";
    else return "transparent";
  }};
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 0.2rem 0 0
    ${(props) => {
      if (props.primary) return "var(--primary-shadow)";
      else if (props.secondary) return "var(--secondary-shadow)";
      else if (props.highlight) return "var(--highlight-shadow)";
      else if (props.danger) return "var(--danger-shadow)";
      else return "#e7e4e7";
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
        else if (props.secondary) return "var(--secondary-shadow)";
        else if (props.highlight) return "var(--highlight-shadow)";
        else if (props.danger) return "var(--danger-shadow)";
        else return "#e7e4e7";
      }};
    transform: translateY(-0.1rem);
  }

  :active {
    box-shadow: 0 0 0 0
      ${(props) => {
        if (props.primary) return "var(--primary-shadow)";
        else if (props.secondary) return "var(--secondary-shadow)";
        else if (props.highlight) return "var(--highlight-shadow)";
        else if (props.danger) return "var(--danger-shadow)";
        else return "#e7e4e7";
      }};
    transform: translateY(0.2rem);
  }
`;

export default Button;
