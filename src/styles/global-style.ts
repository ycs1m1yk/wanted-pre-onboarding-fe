import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
    font-family: "Noto Sans KR", sans-serif;
    position: relative;
    height: 100vh;
    max-width: 768px;
    margin: 0 auto;
    background-color: ${({ theme }) => theme.palette.wetAsphalt};
  }
	ol, ul, li {
		list-style: none;
	}
	button {
    background: none;
    background-color: transparent;
    border: 0;
    padding: 0;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  img {
    -webkit-user-drag: none;
  }
	input,
  button
  {
    font: inherit;
  }
  #root {
    height: 100%;
    overflow: hidden;
  }
`;
