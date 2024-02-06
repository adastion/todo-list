import { styled } from "styled-components";

export const FlexWrap = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction || "row"};
  justify-content: ${(props) => props.justify || "start"};
  align-items: ${(props) => props.align || "stretch"};
  gap: ${(props) => props.gap || "1.5rem"};
  width: ${(props) => props.width || "auto"};

  @media screen and (max-width: 992px) {
    flex-direction: ${(props) => props.direction || "column"};
    justify-content: ${(props) => props.justify || "space-between"};
    align-items: stretch;
  }

  @media screen and (max-width: 546px) {
    flex-direction: column;
 
  }
`;
