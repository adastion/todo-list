import { styled } from "styled-components";

export const Button = styled.button`
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: lightblue;
  background: #154760;
  font-weight: 700;
  font-size: 1.3rem;
  transition: 0.3s ease-in-out;
  width: ${(props) => props.width || "auto"};
  text-wrap: nowrap;

  &:hover {
    opacity: 0.7;
  }
`;
