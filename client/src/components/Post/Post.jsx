
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import * as Icon from 'react-bootstrap-icons';
import './Post.css'
import React, { useState, useRef } from 'react'

import { TokenContext, UserIdContext, NameContext } from '../../App'

const Post = (props) => {
    const Swal = require('sweetalert2')           
    const { post, setPosts } = props.data

    let [token, setToken] = React.useContext(TokenContext)
    let [userId, setUserId] = React.useContext(UserIdContext)
    let [name, setName] = React.useContext(NameContext)

    const [modification, setModification] = useState(false)
         
    //Modification d'un post */
    //--Récupération de la saisie de textArea et de l'image
    const textAreaAndImage = useRef([])
    const addTextAreaAndImage = (el) => {
        textAreaAndImage.current.push(el)
    }

    const sendModification = (event) => {
        event.preventDefault()
        const form = event.target
        const postId = form[1].id
        const formData = new FormData()
        const requestOptionsModifiyPost = {
            method: 'PUT',
            headers: { Authorization: 'Bearer ' + token },
            body: formData,
        }

        if (form[0].value === '' && form[2].files[0] === undefined) {
            Swal.fire('Vous avez oublié de saisir un texte et/ou un image')
        } else if (form[0].value === '' && form[2].files[0] !== undefined) {
            formData.append('image', form[2].files[0])

            fetch(
                'http://localhost:8000/posts/' + postId,
                requestOptionsModifiyPost
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
                                return new Date(b.createdAt) - new Date(a.createdAt)
                            })
                            setPosts(posts)
                            if (posts) {
                                setModification(false)
                            }
                        })
                })
        } else if (form[0].value !== '' && form[2].files[0] === undefined) {
            formData.append('post', form[0].value)

            fetch(
                'http://localhost:8000/posts/' + postId,
                requestOptionsModifiyPost
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
                                return new Date(b.createdAt) - new Date(a.createdAt)
                            })
                            setPosts(posts)
                            if (posts) {
                                setModification(false)
                            }
                        })
                })
        } else if (form[0].value !== '' && form[2].files[0] !== undefined) {
            formData.append('post', form[0].value)
            formData.append('image', form[2].files[0])

            fetch(
                'http://localhost:8000/posts/' + postId,
                requestOptionsModifiyPost
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
                                return new Date(b.createdAt) - new Date(a.createdAt)
                            })
                            setPosts(posts)
                            if (posts) {
                                setModification(false)
                            }
                        })
                })
        }
    }

    //Suppression d'un post
    const handleDelete = async (event) => {
        event.preventDefault()
        let target = event.target.id
        console.log(target)
        const requestOptionsDelete = {
            method: 'DELETE',
            headers: { Authorization: 'Bearer ' + token },
        }
        fetch(
            'http://localhost:8000/posts/' + target,
            requestOptionsDelete
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
                            return new Date(b.createdAt) - new Date(a.createdAt)
                        })
                        setPosts(posts)
                    })
            })
    }

    //Like
    const handleLike = async (event) => {
        let postId = event

        const arrayUsersLiked = post.usersLiked
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        }

        if (!arrayUsersLiked.includes(userId)) {
            const requestOptionsLike = {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    like: 1,
                }),
            }

            await fetch(
                'http://localhost:8000/posts/' + postId + '/like',
                requestOptionsLike
            )
                .then((response) => response.json())
                .then((data) => {
                    const newArrayPosts = fetch(
                        'http://localhost:8000/posts',
                        requestOptions
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            const posts = data.slice().sort(function (a, b) {
                                return new Date(b.createdAt) - new Date(a.createdAt)
                            })
                            setPosts(posts)
                        })
                })
        } else {
            const requestOptionsLike = {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    like: 0,
                }),
            }

            await fetch(
                'http://localhost:8000/posts/' + postId + '/like',
                requestOptionsLike
            )
                .then((response) => response.json())
                .then((data) => {
                    const newArrayPosts = fetch(
                        'http://localhost:8000/posts',
                        requestOptions
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            const posts = data.slice().sort(function (a, b) {
                                return new Date(b.createdAt) - new Date(a.createdAt)
                            })
                            setPosts(posts)
                        })
                })
        }
    }

    return post.userId === userId ||
        name === process.env.REACT_APP_NAME ? (
        modification ? (
<div className="displayPost">
                <div className="conteneur">
                    <h1 className="dispayNamePoster">
                        Mode modification activé
                    </h1>
                    <form onSubmit={sendModification} className="displayTexteareaModificationMode">
                        <textarea
                            name="post"
                            type="text"
                            className="displayTextAreaToModif"
                            ref={addTextAreaAndImage}
                            placeholder="Si vous le souhaitez, vous pouvez saisir du texte dans cette zone et choisir un image avec le boutton ci-dessous"
                        ></textarea>
                        <div className="displayButtons">
                            <input
                                id={post._id}
                                className="styleButton fontSizeSend"
                                type="submit"
                                name="envoyer"
                            ></input>
                            <input
                                name="image"
                                type="file"
                                ref={addTextAreaAndImage}
                                accept="image/png, image/jpeg"
                                alt="image poster par un utilisateur"
                                id="image"
                            />
                            <button
                                className="styleButton fontSizeAnnulation"
                                onClick={() => setModification(false)}
                            >
                                Annuler
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        ) : (
<div className="post">
        <Card data-set={post._id} className="Card" border="danger" style={{ width: '28rem' }}>
        <Card.Header>            
            <img src="../../assets/profile.png" alt="profil" style={{ width: '80px', height: '80px' }} />
            <h1 className="dispayNamePoster">{post.name === name ? "Votre post" : post.name}</h1>
                    <h1 className="dispayNamePoster">{`Publié le ${new Date(
                        post.createdAt
                    ).toLocaleDateString('fr')} à ${new Date(
                        post.createdAt
                    ).toLocaleTimeString('fr')}`}</h1> 
            <Icon.Pencil className="iconPost"  id={post._id}
                        className="styleButton widthButtonModify"
                        onClick={() => setModification(true)} />
            <Icon.Trash className="iconPost" id={post._id} onClick={(e) => handleDelete(e)} />
        </Card.Header>
        <Card.Body>
          <Card.Img src={post.imageUrl}
                                alt=""
                                align="right"
                                className="image" />
          <Card.Text>
          {post.post}
          </Card.Text>
          <div className="displayLikes">
                        <div className="displayLikesAndNumberLikes">
                            {!post.usersLiked.includes(userId) ? (
                                <Icon.HandThumbsUp
                                    
                                    onClick={() => handleLike(post._id)}
                                    className="likeOff"
                                ></Icon.HandThumbsUp>
                            ) : (
                                <Icon.HandThumbsUp
                                    onClick={() => handleLike(post._id)}
                                    className="likeOn"
                                ></Icon.HandThumbsUp>
                            )}
                            <p className="numberOfLikes">{post.likes}</p>
                        </div>
                    </div>
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
    ) : (
      <div className="post">
        <Card className="Card" border="danger" style={{ width: '28rem' }}>
        <Card.Header>            
            <img src="../../assets/profile.png" alt="profil" style={{ width: '80px', height: '80px' }} />
            <h1 className="dispayNamePoster">Publié par : {post.name}</h1>
                <h1 className="dispayNamePoster">
                    {`Publié le ${new Date(post.createdAt).toLocaleDateString(
                        'fr'
                    )} à ${new Date(post.createdAt).toLocaleTimeString('fr')}`}
                </h1>
            
        </Card.Header>
        <Card.Body>
          <Card.Img src={post.imageUrl}
                                alt=""
                                align="right"
                                className="image" />
          <Card.Text>
          {post.post}
          </Card.Text>
          <div className="displayLikes">
                        <div className="displayLikesAndNumberLikes">
                            {!post.usersLiked.includes(userId) ? (
                                <Icon.HandThumbsUp
                                    onClick={() => handleLike(post._id)}
                                    className="likeOff"
                                ></Icon.HandThumbsUp>
                            ) : (
                                <Icon.HandThumbsUp
                                   
                                    onClick={() => handleLike(post._id)}
                                    className="likeOn"
                                ></Icon.HandThumbsUp>
                            )}
                            <p className="numberOfLikes">{post.likes}</p>
                        </div>
                    </div>
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