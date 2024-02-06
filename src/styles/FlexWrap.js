import { styled } from "styled-components";

export const FlexWrap = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction || "row"};
  justify-content: ${(props) => props.justify || "start"};
  align-items: ${(props) => props.align || "stretch"};
  gap: ${(props) => props.gap || "1.5rem"};

  @media screen and (max-width: 425px){
    flex-direction: column;
  }
`;
