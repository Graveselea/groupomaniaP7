import { createGlobalStyle } from "styled-components";
import React, { useContext } from "react";
import { ThemeContext } from "../context/context";

function GlobalStyle() {
  const { theme } = useContext(ThemeContext);

  return <StyledGlobalStyle isDarkMode={theme === "dark"} />;
}

const StyledGlobalStyle = createGlobalStyle`
    * {
font-family: 'Lato', sans-serif;
}
 
    body {
        background-color: #FFD7D7;
        margin: 0;  
    }
`;

export default GlobalStyle;
