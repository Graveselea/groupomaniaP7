import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../../utils/style/colors'

const PostLabel = styled.span`    color: #5843e4;
font-size: 22px;
font-weight: bold;`

const PostProfil = styled.img`
    height: 80px;
    width: 80px;
    border-radius: 50%;
`
const PostWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px;
    background-color: ${colors.secondary};
    border-radius: 30px;
    width: 350px;
    transition: 200ms;
    &:hover {
        cursor: pointer;
        box-shadow: 2px 2px 10px #e2e3e9;
    }
`

function Post({ label, title, picture }) {
    return (
        <PostWrapper>
            <PostLabel>{label}</PostLabel>
            <PostProfil src={picture} alt="freelance" height={80} width={80} />
            <span>{title}</span>
        </PostWrapper>
    )
}
 
Post.propTypes = {
    label: PropTypes.string,
    title: PropTypes.string.isRequired,
    picture: PropTypes.string,
}

Post.defaultProps = {
    title: 'Mon titre par défaut',
}
export default Post