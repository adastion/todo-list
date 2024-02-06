import { styled } from "styled-components";

export const Field = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  width: ${(props) => props.width || "100%"};
  font-size: ${(props) => props.fontSize || "2rem"};
  padding: ${(props) => props.padding || "0.5rem 1rem"};
`;
