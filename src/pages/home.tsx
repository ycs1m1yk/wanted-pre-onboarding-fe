import styled from "styled-components";

import Header from "../components/header";

const StyledDiv = styled.div({
  background: "white",
});

export default function Home() {
  return (
    <>
      <Header></Header>
      <StyledDiv>home</StyledDiv>
    </>
  );
}
