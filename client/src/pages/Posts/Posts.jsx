import DefaultPicture from '../../assets/profile.png'
import Post from '../../components/Post/Post'
import styled from 'styled-components'
import Loader from '../../utils/style/Atoms'
import { useFetch } from '../../utils/hooks/Hooks'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './Posts.css'


const PostsContainer = styled.div`
    display: grid;
    gap: 24px;
    grid-template-rows: 350px 350px;
    grid-template-columns: repeat(2, 1fr);
`

function Posts() {
    // const { data, isLoading, error } = useFetch(`http://localhost:8000/`)
    // const { surveyData } = data

    // if (error) {

    //     return <span>Il y a un problème</span>
        
    //     }
 
  return (
    <><div className='addPost'>
          <InputGroup className='input-group'>
              <Form.Control
                  className='form-control-posts'
                  placeholder="How are you today ?"
                  aria-label="Recipient's post with two button addons" />

          </InputGroup>
          <div className="button-post">
              <Form.Group controlId="formFile" className="formFile">
                  <Form.Control className="title-file" type="file" />
              </Form.Group>
              <Button className= "button-post-petit" variant="outline-secondary">Post !</Button>
          </div>
      <hr></hr><Post></Post><Post></Post><Post></Post><Post></Post>
</div>
</>
  )
}



export default Posts