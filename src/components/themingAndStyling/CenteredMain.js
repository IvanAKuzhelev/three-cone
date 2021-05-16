import styled from "@emotion/styled";

const CenteredMain = styled.main`
  display: grid;
  place-items: center;
  place-content: center;
  grid-gap: 0.8rem;
  height: 100vh;
  width: 100vw;
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.aside};
`;
export default CenteredMain;
