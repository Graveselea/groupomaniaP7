import Card from "react-bootstrap/Card";
import * as Icon from "react-bootstrap-icons";
import Modal from "react-bootstrap/Modal";
import photoProfil from "../../assets/images/profile.webp";

import "./Post.scss";
import React, { useState, useRef } from "react";
import {
  TokenContext,
  UserIdContext,
  NameContext,
  isAdminInContext,
} from "../../CreateContext";

const Post = (props) => {
  const Swal = require("sweetalert2");
  const { post, setPosts } = props.data;

  let [token, setToken] = React.useContext(TokenContext);
  let [userId, setUserId] = React.useContext(UserIdContext);
  let [name, setName] = React.useContext(NameContext);
  let [isAdmin, setIsAdmin] = React.useContext(isAdminInContext);

  const [modification, setModification] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Modification d'un post */
  //--Récupération de la saisie de textArea et de l'image
  const textAreaAndImage = useRef([]);
  const addTextAreaAndImage = (el) => {
    textAreaAndImage.current.push(el);
  };

  const sendModification = (event) => {
    event.preventDefault();
    const form = event.target;
    console.log(form);
    const postId = form[1].id;
    const formData = new FormData();
    const requestOptionsModifiyPost = {
      method: "PUT",
      headers: { Authorization: "Bearer " + token },
      body: formData,
    };

    if (form[0].value === "" && form[2].files[0] === undefined) {
      Swal.fire("Vous avez oublié de saisir un texte et/ou un image");
    } else if (form[0].value === "" && form[2].files[0] !== undefined) {
      formData.append("image", form[2].files[0]);

      fetch("http://localhost:8000/posts/" + postId, requestOptionsModifiyPost)
        .then((response) => response.json())
        .then((data) => {
          const requestOptions = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          };
          fetch("http://localhost:8000/posts", requestOptions)
            .then((response) => response.json())
            .then((data) => {
              const posts = data;
              setPosts(posts);
              if (posts) {
                setModification(false);
              }
            });
        });
    } else if (form[0].value !== "" && form[2].files[0] === undefined) {
      formData.append("post", form[0].value);

      fetch("http://localhost:8000/posts/" + postId, requestOptionsModifiyPost)
        .then((response) => response.json())
        .then((data) => {
          const requestOptions = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          };
          const newArrayPosts = fetch(
            "http://localhost:8000/posts",
            requestOptions
          )
            .then((response) => response.json())
            .then((data) => {
              const posts = data;
              setPosts(posts);
              if (posts) {
                setModification(false);
              }
            });
        });
    } else if (form[0].value !== "" && form[2].files[0] !== undefined) {
      formData.append("post", form[0].value);
      formData.append("image", form[2].files[0]);

      fetch("http://localhost:8000/posts/" + postId, requestOptionsModifiyPost)
        .then((response) => response.json())
        .then((data) => {
          const requestOptions = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          };
          const newArrayPosts = fetch(
            "http://localhost:8000/posts",
            requestOptions
          )
            .then((response) => response.json())
            .then((data) => {
              const posts = data;
              setPosts(posts);
              if (posts) {
                setModification(false);
              }
            });
        });
    }
  };

  //Suppression d'un post
  const handleDelete = async (event) => {
    event.preventDefault();
    let target = event.target.id;
    const requestOptionsDelete = {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    };
    fetch("http://localhost:8000/posts/" + target, requestOptionsDelete)
      .then((response) => response.json())
      .then((data) => {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        fetch("http://localhost:8000/posts", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            const posts = data;
            setPosts(posts);
          });
      });
  };

  //Like
  const handleLike = async (event) => {
    let postId = event;
    const arrayUsersLiked = post.usersLiked;
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    if (!arrayUsersLiked.includes(userId)) {
      const requestOptionsLike = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          like: 1,
        }),
      };

      await fetch(
        "http://localhost:8000/posts/" + postId + "/like",
        requestOptionsLike
      )
        .then((response) => response.json())
        .then((data) => {
          fetch("http://localhost:8000/posts", requestOptions)
            .then((response) => response.json())
            .then((data) => {
              const posts = data;
              setPosts(posts);
            });
        });
    } else {
      const requestOptionsLike = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          like: 0,
        }),
      };

      await fetch(
        "http://localhost:8000/posts/" + postId + "/like",
        requestOptionsLike
      )
        .then((response) => response.json())
        .then((data) => {
          fetch("http://localhost:8000/posts", requestOptions)
            .then((response) => response.json())
            .then((data) => {
              const posts = data;
              setPosts(posts);
            });
        });
    }
  };

  const newComment = useRef([]);
  const addNewComment = (el) => {
    newComment.current.push(el);
    document.getElementById("text-new-comment").value = "";
  };

  const handlePostComment = async (e) => {
    e.preventDefault();
    const postId = post._id;
    const comment = newComment.current[0].value;
    const requestOptionsNewComment = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        comment,
        name,
      }),
    };
    await fetch(
      "http://localhost:8000/posts/" + postId + "/comment",
      requestOptionsNewComment
    )
      .then((response) => response.json())
      .then((data) => {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        fetch(
          "http://localhost:8000/posts/" + postId + "/comments",
          requestOptions
        )
          .then((response) => response.json())
          .then((data) => {
            fetch("http://localhost:8000/posts", requestOptions)
              .then((response) => response.json())
              .then((data) => {
                const posts = data;
                setPosts(posts);
              });
          });
      });
  };

  // Get user data
  // const requestOptions = {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: "Bearer " + token,
  //   },
  // };
  // fetch("http://localhost:8000/users/" + userId, requestOptions).then(
  //   (response) => response.json()
  // );

  return post.userId === userId || isAdmin === true ? (
    modification ? (
      <>
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title> Modify your post !</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="displayPost">
              <div className="conteneur">
                <form
                  onSubmit={sendModification}
                  className="displayTexteareaModificationMode"
                >
                  <textarea
                    name="post"
                    type="text"
                    className="displayTextAreaToModif"
                    ref={addTextAreaAndImage}
                    placeholder="HERE YOUR NEW TEXT !"
                  ></textarea>
                  <div className="displayButtons">
                    <input
                      id={post._id}
                      className="styleButtonfontSizeSend"
                      type="SUBMIT"
                      name="POST"
                    ></input>
                    <input
                      name="image"
                      type="file"
                      ref={addTextAreaAndImage}
                      accept="*"
                      alt="image poster par un utilisateur"
                      id="image"
                    />
                    <button
                      className="styleButtonfontSizeAnnulation"
                      onClick={() => setModification(false)}
                    >
                      CANCEL
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    ) : (
      <div className="post">
        <Card
          data-set={post._id}
          className="Card"
          border="danger"
          style={{ width: "28rem" }}
        >
          <Card.Header className="Card-header">
            <img
              className="photoProfile"
              accept="image/*"
              src={photoProfil}
              alt="profil"
            />
            <p className="dispayNamePoster">
              {post.name === name ? "Your post" : post.name}
            </p>

            <Icon.Pencil
              className="iconPost"
              id={post._id}
              onClick={() => {
                handleShow();
                setModification(true);
              }}
            />
            <Icon.Trash
              className="iconPost"
              id={post._id}
              onClick={(e) => handleDelete(e)}
            />
          </Card.Header>
          <Card.Body>
            <div className="clock">
              <Icon.Clock className="" />
              <p className="dispayNamePoster2">{`${new Date(
                post.createdAt
              ).toLocaleDateString("fr")} at ${new Date(
                post.createdAt
              ).toLocaleTimeString("fr")}`}</p>
            </div>
            <Card.Img
              src={post.imageUrl}
              alt=""
              align="right"
              className="image"
            />
            <Card.Text>{post.post}</Card.Text>
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
          <hr className="barre-comment"></hr>
          <div className="display-comments">
            <div className="display-new-comment">
              <input
                type="text"
                id="text-new-comment"
                placeholder="Ajouter un commentaire"
                ref={addNewComment} // refattribut permet de stocker une référence à un élément ou composant React particulier renvoyé par la render()
                className="display-new-comment-input"
              />
              <button
                className="display-new-comment-button"
                id={"publish-new-commnent" + " " + `${post._id}`}
                onClick={(e) => {
                  handlePostComment(e);
                }}
              >
                Commenter
              </button>
            </div>
            {post.comments
              .map((comment, index) => (
                <div key={index} className="display-comment">
                  <p className="dispay-avatar-commentator">
                    <img
                      src={photoProfil}
                      className="photoProfileComment"
                      alt="Avatar "
                    />
                  </p>
                  <div className="display-name-commentator-and-text">
                    <p className="name-commentator">{comment.name} :</p>
                    <p className="display-commentator-text">
                      {comment.comment}
                    </p>
                  </div>
                </div>
              ))
              .reverse()}
          </div>
        </Card>
      </div>
    )
  ) : (
    <div className="post">
      <Card className="Card" border="danger" style={{ width: "28rem" }}>
        <Card.Header className="Card-header">
          <img
            accept="image/*"
            src={photoProfil}
            className="photoProfile"
            alt="profil"
          />
          <p className="dispayNamePoster">Publié par : {post.name}</p>
        </Card.Header>
        <Card.Body>
          <div className="clock">
            <Icon.Clock className="" />
            <p className="dispayNamePoster2">{`${new Date(
              post.createdAt
            ).toLocaleDateString("fr")} at ${new Date(
              post.createdAt
            ).toLocaleTimeString("fr")}`}</p>
          </div>
          <Card.Img
            src={post.imageUrl}
            alt=""
            align="right"
            className="image"
          />
          <Card.Text>{post.post}</Card.Text>
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
        <hr className="barre-comment"></hr>
        <div className="display-comments">
          <div className="display-new-comment">
            <input
              type="text"
              id="text-new-comment"
              placeholder="Ajouter un commentaire"
              ref={addNewComment}
              className="display-new-comment-input"
            />
            <button
              className="display-new-comment-button"
              id={"publish-new-commnent" + " " + `${post._id}`}
              onClick={(e) => {
                handlePostComment(e);
              }}
            >
              Commenter
            </button>
          </div>
          {post.comments
            .map((comment, index) => (
              <div key={index} className="display-comment">
                <p className="dispay-avatar-commentator">
                  <img
                    src={photoProfil}
                    className="photoProfileComment"
                    alt="Avatar "
                  />{" "}
                </p>
                <div className="display-name-commentator-and-text">
                  <p className="name-commentator">{comment.name} :</p>
                  <p className="display-commentator-text">{comment.comment}</p>
                </div>
              </div>
            ))
            .reverse()}
        </div>
      </Card>
    </div>
  );
};

export default Post;
