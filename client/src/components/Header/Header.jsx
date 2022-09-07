import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useContext } from 'react'
import logowhite from '../../assets/logowhite.png';
import './Header.css'
import Button from 'react-bootstrap/Button';
import { TokenContext, UserIdContext, NameContext } from '../../App'

import * as Icon from 'react-bootstrap-icons';

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100px;
    background-color: ${colors.primary};
`

function Header() {
  // const { toggleTheme, theme } = useContext(ThemeContext)
  let [token, setToken] = useContext(TokenContext)
  let [userId, setUserId] = useContext(UserIdContext)
  let [name, setName] = useContext(NameContext)

  const navigate = useNavigate()
  const SwalLogOut = require('sweetalert2')


  const logout = (e) => {        
    localStorage.clear()
    setToken(undefined)
    setUserId('')
    setName(undefined)
    navigate('/')
            //--Sweet Alert
            SwalLogOut.fire({
                title: 'Au revoir et à bientôt  !',
                text: '',
                icon: 'success',
                confirmButtonText: 'Ok'
              })
}

  const rules = (e) => {
    navigate('/rules')
  }

  return (
    <HeaderContainer>
      <div className="header">
    <nav >        
      <img src={logowhite} alt="logo" className="gpm-banner-logo"/>
      <a href="http://localhost:3000/">
      <Button className="button-header" variant="red" to="/">Home</Button>
      </a>
      <a href="http://localhost:3000/posts">
      <Button className="button-header" variant="red" to="/posts">Posts</Button>
      </a>

      {token === undefined && userId === '' ?
                '' : 
                <Icon.CardChecklist
                className="cardchecklist"
                    onClick={rules}
                    size="1x"
                    height='100%'
                    width='100%' /> }
                          
      {token === undefined && userId === '' ?
                '' : 
                <Icon.ToggleOff
                className="toggleoff"
                    onClick={logout}
                    size="1x"
                    height='100%'
                    width='100%' /> }
    </nav>
</div> 
        </HeaderContainer>
  )
}

export default Header