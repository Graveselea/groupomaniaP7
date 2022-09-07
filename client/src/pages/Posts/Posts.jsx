
import Post from '../../components/Post/Post'
import React, {
    useState,
    useEffect, 
    useRef
} from 'react'
import { TokenContext, NameContext, UserIdContext } from '../../App'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './Posts.css'
import Swal from 'sweetalert2'
import Loader from '../../utils/style/Atoms';


export default function Posts() {
    const [users, setUsers] = useState(null)
    const SwalWelcome = require('sweetalert2')
    
    /*   const navigate = useNavigate(); */

    let [token, setToken] = React.useContext(TokenContext)
    let [userId, setUserId] = React.useContext(UserIdContext)
    let [name, setName] = React.useContext(NameContext)

    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState("");
    const [posts, setPosts] = useState(null)
    const [user, setUser] = useState(null)

    //Affichage des posts

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
    }

    useEffect(() => {
        setIsLoading(true)
        fetch('http://localhost:8000/posts', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                const posts = data.slice().sort(function (a, b) {
                    return new Date(b.createdAt) - new Date(a.createdAt)
                })
                setPosts(posts)
                SwalWelcome.fire({
                    title: `Bonjour ${name} !`,
                    text: '',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                  })
                setIsLoading(false)

            })
    }, [])

    //Création d'un post */

    const textAreaAndImage = useRef([])
    const addTextAreaAndImage = (el) => {
        textAreaAndImage.current.push(el)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const form = e.target
        const formData = new FormData()
        const requestOptionsCreate = {
            method: 'POST',
            headers: { Authorization: 'Bearer ' + token },
            body: formData,
        }

        if (form[0].value === '' && form[1].files[0] === undefined) {
            Swal.fire('Vous avez oublié de saisir un texte et/ou un image')
        } else if (form[0].value === '' && form[1].files[0] !== undefined) {
            formData.append('image', form[1].files[0])
            formData.append('post', 'Aucun texte saisie')
            formData.append('name', name)
            setIsLoading(true)

            fetch(
                'http://localhost:8000/posts',
                requestOptionsCreate
            )
                .then((response) => response.json())
                .then((data) => {
                    const requestOptions = {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + token,
                        },
                    }
                    const newArrayPosts = fetch(
                        'http://localhost:8000/posts',
                        requestOptions
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            const posts = data.slice().sort(function (a, b) {
                                return (
                                    new Date(b.createdAt) -
                                    new Date(a.createdAt)
                                )
                            })
                            setPosts(posts)
                            form.reset()
                            setIsLoading(false)
                        })
                })
        } else if (form[0].value !== '' && form[1].files[0] === undefined) {
            console.log('ICI')
            formData.append('post', form[0].value)
            formData.append('name', name)
        setIsLoading(true)

            fetch(
                'http://localhost:8000/posts',
                requestOptionsCreate
            )
                .then((response) => response.json())
                .then((data) => {
                    const requestOptions = {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + token,
                        },
                    }
                    const newArrayPosts = fetch(
                        'http://localhost:8000/posts',
                        requestOptions
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            const posts = data.slice().sort(function (a, b) {
                                return (
                                    new Date(b.createdAt) -
                                    new Date(a.createdAt)
                                )
                            })
                            setPosts(posts)
                            form.reset()
                            setIsLoading(false)
                        })
                })
        } else if (form[0].value !== '' && form[1].files[0] !== undefined) {
            formData.append('post', form[0].value)
            formData.append('image', form[1].files[0])
            formData.append('name', name)
            setIsLoading(true)

            fetch(
                'http://localhost:8000/posts',
                requestOptionsCreate
            )
                .then((response) => response.json())
                .then((data) => {
                    const requestOptions = {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + token,
                        },
                    }
                    const newArrayPosts = fetch(
                        'http://localhost:8000/posts',
                        requestOptions
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            const posts = data.slice().sort(function (a, b) {
                                return (
                                    new Date(b.createdAt) -
                                    new Date(a.createdAt)
                                )
                            })
                            setPosts(posts)
                            form.reset()
                            setIsLoading(false)
                        })
                })
        }
    }

    useEffect(() => {
        if (!posts) {
            setIsLoading(true)
        } else {
            setIsLoading(false)
        }
    }, [posts])

    return isLoading ? (
        <Loader>
      </Loader>
    ) : (
    <><div className='addPost'>
                        <div className="hello">Bienvenue {name} 🙂</div>
          <InputGroup className='input-group'>
          <label htmlFor="post" className="titleCreatePost"></label>
              <Form.Control onSubmit={handleSubmit}
                  className='form-control-posts'
                  placeholder="How are you today ?"
                  aria-label="Recipient's post with two button addons"
                        name="post"
                        type="text"
                        ref={addTextAreaAndImage} />
          </InputGroup>
          <div className="button-post">
          <label htmlFor="image" id='colorLabelChooseImage'></label>
              <Form.Group className="formFile">
                  <Form.Control 
                  className="title-file" 
                  type="file"                             
                    name="image"
                    accept="image/png, image/jpeg"
                    ref={addTextAreaAndImage}
                    id="image"
                    alt="image postée par un utilisateur"/>
              </Form.Group>
              <Button className= "button-post-petit" variant="outline-secondary" type="submit" value="Envoyer">Post !</Button>
          </div>
      <hr></hr><div className="displayPosts">
                {posts.map((post, index) => (
                    <Post key= {index} data={{ post, setPosts }} />
                ))}
            </div>
</div>
</>
  )
}



