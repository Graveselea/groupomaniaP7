import {createGlobalStyle} from 'styled-components';
import { useContext } from 'react'
import { ThemeContext } from '../../utils/context/context'

function GlobalStyle() {
    const { theme } = useContext(ThemeContext)
  
    return <StyledGlobalStyle isDarkMode={theme === 'dark'} />
  }

const StyledGlobalStyle = createGlobalStyle`
    * {
font-family: 'Lato', sans-serif;
}
 
    body {
        background-color: ${({ isDarkMode }) => (isDarkMode ? 'black' : 'white')};
        margin: 0;  
    }
`

export default GlobalStyle
