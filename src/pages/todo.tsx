import styled from "styled-components";

import Header from "../components/header";

const StyledDiv = styled.div({
  background: "white",
});

export default function Todo() {
  return (
    <>
      <Header></Header>
      <StyledDiv>Todo</StyledDiv>
    </>
  );
}
