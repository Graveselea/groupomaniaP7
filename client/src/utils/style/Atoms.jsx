import colors from './colors'
import styled, { keyframes } from 'styled-components'
 
const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
 
    to {
    transform: rotate(360deg);
    }
`
 
 const Loader = styled.div`
    padding: 10px;
    border: 20px solid ${colors.primary};
    border-bottom-color: transparent;
    border-radius: 130px;
    width: 150px;
    animation: ${rotate} 1s infinite linear;
    height: 150px;
    position: absolute;
    top: 50%;
    left: 40%;
`

export default Loader;