import styled from "styled-components";

import Header from "../components/header";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  height: 30rem;
  gap: 2em;
  padding-top: 4rem;
  position: fixed;
  top: 60%;
  left: 50%;
  z-index: 60;
  transform: translate(-50%, -50%);
  text-align: left;
  font-weight: bold;
  & h1 {
    padding: 0.6rem;
    background: ${({ theme }) => theme.palette.peterRiver};
    font-size: 5rem;
  }
  & span {
    color: ${({ theme }) => theme.palette.pomegranate};
    font-size: 3rem;
  }
`;

export default function Home() {
  return (
    <>
      <Header></Header>
      <Container>
        <h1>TODO</h1>
        <span>DU-DU-DU-DU!</span>
      </Container>
    </>
  );
}
