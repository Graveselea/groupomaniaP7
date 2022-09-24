import { createGlobalStyle } from "styled-components";

function GlobalStyle() {
  const StyledGlobalStyle = createGlobalStyle`
    * {
font-family: 'Lato', sans-serif;
}
 
    body {
        margin: 0;  
    }
`;
}

export default GlobalStyle;
