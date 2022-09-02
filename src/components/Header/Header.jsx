import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/colors'

const StyledLink = styled(Link)`
    padding: 15px;
    color: #8186a0;
    text-decoration: none;
    font-size: 18px;
    background-color: ${colors.primary};
`

function Header() {
  return (
    <nav >
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/posts">Post</StyledLink>
    </nav>
  )
}

export default Header