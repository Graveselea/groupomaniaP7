import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useContext } from 'react'
import { ThemeContext } from '../../utils/context/context'


const StyledLink = styled(Link)`
    padding: 15px;
    color: #8186a0;
    text-decoration: none;
    font-size: 18px;
    background-color: ${colors.primary};
`

const HeaderContainer = styled.header`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
padding-top: 60px;
    background-color: ${colors.primary};
`

const NightModeButton = styled.button`
background-color: transparent;
border: none;
color: ${colors.secondary};
    &:hover {
        cursor: pointer;
    }
`

function Header() {
  const { toggleTheme, theme } = useContext(ThemeContext)
  return (
    <HeaderContainer>
    <nav >
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/posts">Posts</StyledLink>
    </nav>
      <NightModeButton onClick={() => toggleTheme()}>
            Changer de mode : {theme === 'light' ? '☀️' : '🌙'}
        </NightModeButton>
        </HeaderContainer>
  )
}

export default Header