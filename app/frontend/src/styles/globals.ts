import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html{
   scroll-behavior: smooth;

   @media (max-width: 1080px) {
      font-size: 93.75%;
    }

    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  html, body, #__next{
    height: 100%;
  }

  body, input, button, textarea {
    font-family: 'Montserrat', sans-serif;
  }

  button{
    cursor: pointer;
    outline: none;
    &:focus {
      outline: transparent !important;
    }
  }

  [disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none !important;
  }
`;
