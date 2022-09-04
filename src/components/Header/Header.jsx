import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useContext } from 'react'
import { ThemeContext } from '../../utils/context/context'
import logowhite from '../../assets/logowhite.png';
import './Header.css'
import Button from 'react-bootstrap/Button';


const HeaderContainer = styled.header`
display: flex;
flex-direction: row;
align-items: left;
justify-content: left;
padding: 10px;
margin-top : -110px;
height: 200px;
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
      <img src={logowhite} alt="logo" className="gpm-banner-logo"/>
      <Button className="button-header" variant="red" to="/">Home</Button>
      <Button className="button-header" variant="red" to="/posts">Posts</Button>
    </nav>
      {/* <NightModeButton onClick={() => toggleTheme()}>
            Changer de mode : {theme === 'light' ? '☀️' : '🌙'}
        </NightModeButton> */}
        </HeaderContainer>
  )
}

export default Header