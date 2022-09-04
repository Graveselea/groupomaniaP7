// import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import * as Icon from 'react-bootstrap-icons';
import './Post.css'



// const PostLabel = styled.span`    color: #5843e4;
// font-size: 22px;
// font-weight: bold;`

// const PostProfil = styled.img`
//     height: 80px;
//     width: 80px;
//     border-radius: 50%;
// `
// const PostWrapper = styled.div`
//     display: flex;
//     flex-direction: column;
//     padding: 15px;
//     background-color: ${colors.secondary};
//     border-radius: 30px;
//     width: 350px;
//     transition: 200ms;
//     &:hover {
//         cursor: pointer;
//         box-shadow: 2px 2px 10px #e2e3e9;
//     }
// `

function Post({ post }) {
    return (
<div className="post">
        <Card className="Card" border="danger" style={{ width: '28rem' }}>
        <Card.Header>            
            <img class="roundedCircle" src="../../assets/profile.png" alt="profil" style={{ width: '80px', height: '80px' }} />
            Header 
            <Icon.Pencil className="iconPost" />
            <Icon.Trash className="iconPost" />
        </Card.Header>
        <Card.Body>
          <Card.Img variant="top" src="../../assets/logoblack.png" />
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
        <InputGroup className="mb-3">
        <Form.Control
          placeholder="Comment"
          aria-label="Recipient's comment"
          aria-describedby="basic-addon2"
        />
        <Button variant="outline-secondary" id="button-addon2">
          Comment !
        </Button>
      </InputGroup>
      </Card>
      </div>
    )
}
 

export default Post