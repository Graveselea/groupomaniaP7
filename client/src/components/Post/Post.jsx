import Card from "react-bootstrap/Card";
import * as Icon from "react-bootstrap-icons";
import Modal from "react-bootstrap/Modal";
import photoProfil from "../../assets/images/profile.webp";

import "./Post.css";
import React, { useState, useRef } from "react";
import {
  TokenContext,
  UserIdContext,
  NameContext,
  isAdminInContext,
} from "../../utils/context/CreateContext";

const Post = (props) => {
  //------------------Context------------------//
  const Swal = require("sweetalert2");
  const { post, setPosts } = props.data;

  let [token, setToken] = React.useContext(TokenContext);
  let [userId, setUserId] = React.useContext(UserIdContext);
  let [name, setName] = React.useContext(NameContext);
  let [isAdmin, setIsAdmin] = React.useContext(isAdminInContext);

  // persistance si REFRESH page
  const tokenConnected = JSON.parse(localStorage.getItem("token"));
  const nameConnected = JSON.parse(localStorage.getItem("name"));

  const [modification, setModification] = useState(false);
  const [show, setShow] = useState(false);

  //------------------Modal------------------//
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //------------------Modification Post------------------//
  const textAreaAndImage = useRef([]); //--ref for textArea and image--//
  const addTextAreaAndImage = (el) => {
    textAreaAndImage.current.push(el); //--push textArea and image--//
  };

  const sendModification = (event) => {
    event.preventDefault();
    const form = event.target;
    const postId = form[1].id;
    const formData = new FormData(); //--create formData--//
    const requestOptionsModifiyPost = {
      //--request options PUT--//
      method: "PUT",
      headers: { Authorization: `Bearer ${tokenConnected}` },
      body: formData,
    };
    if (form[0].value === "" && form[2].files[0] === undefined) {
      // if textArea and image are empty
      Swal.fire("Vous avez oublié de saisir un texte et/ou un image");
    } else if (form[0].value === "" && form[2].files[0] !== undefined) {
      // if textArea is empty and image is not empty
      formData.append("image", form[2].files[0]);
      fetch("http://localhost:8000/posts/" + postId, requestOptionsModifiyPost) //--fetch to modify post--//
        .then((response) => response.json())
        .then((data) => {
          const requestOptions = {
            //--request options GET--//
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenConnected}`,
            },
          };
          fetch("http://localhost:8000/posts", requestOptions) //--fetch to get all posts--//
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
      // if textArea is not empty and image is empty
      formData.append("post", form[0].value);

      fetch("http://localhost:8000/posts/" + postId, requestOptionsModifiyPost) // --fetch to modify post--//
        .then((response) => response.json())
        .then((data) => {
          const requestOptions = {
            //--request options GET--//
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenConnected}`,
            },
          };
          fetch("http://localhost:8000/posts", requestOptions) //--fetch to get all posts--//
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
      // if textArea and image are not empty
      formData.append("post", form[0].value);
      formData.append("image", form[2].files[0]);

      fetch("http://localhost:8000/posts/" + postId, requestOptionsModifiyPost) //--fetch to modify post--//
        .then((response) => response.json())
        .then((data) => {
          const requestOptions = {
            //--request options GET--//
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenConnected}`,
            },
          };
          fetch("http://localhost:8000/posts", requestOptions) //--fetch to get all posts--//
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

  //------------------Delete Post------------------//
  const handleDelete = async (event) => {
    event.preventDefault();
    let target = post._id;
    const requestOptionsDelete = {
      //--request options DELETE--//
      method: "DELETE",
      headers: { Authorization: `Bearer ${tokenConnected}` },
    };
    fetch("http://localhost:8000/posts/" + target, requestOptionsDelete) //--fetch to delete post--//
      .then((response) => response.json())
      .then((data) => {
        const requestOptions = {
          //--request options GET--//
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenConnected}`,
          },
        };
        fetch("http://localhost:8000/posts", requestOptions) //--fetch to get all posts--//
          .then((response) => response.json())
          .then((data) => {
            const posts = data;
            setPosts(posts);
          });
      });
  };

  //------------------Like Post------------------//
  const handleLike = async (event) => {
    let postId = event;
    const arrayUsersLiked = post.usersLiked; //--array of users who liked the post--//
    const requestOptions = {
      //--request options PUT--//
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenConnected}`,
      },
    };

    if (!arrayUsersLiked.includes(userId)) {
      //--if user is not in array of users who liked the post--//
      const requestOptionsLike = {
        //--request options POST--//
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenConnected}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //--body of request--//
          userId: userId, //--id of user who liked the post--//
          like: 1, //--like of user who liked the post--//
        }),
      };

      await fetch(
        "http://localhost:8000/posts/" + postId + "/like", //--fetch to like post--//
        requestOptionsLike
      )
        .then((response) => response.json())
        .then((data) => {
          fetch("http://localhost:8000/posts", requestOptions) //--fetch to get all posts--//
            .then((response) => response.json())
            .then((data) => {
              const posts = data;
              setPosts(posts);
            });
        });
    } else {
      const requestOptionsLike = {
        //--request options POST--//
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenConnected}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //--body of request--//
          userId: userId, //--id of user who liked the post--//
          like: 0, //--like of user who liked the post--//
        }),
      };

      await fetch(
        "http://localhost:8000/posts/" + postId + "/like", //--fetch to like post--//
        requestOptionsLike
      )
        .then((response) => response.json())
        .then((data) => {
          fetch("http://localhost:8000/posts", requestOptions) //--fetch to get all posts--//
            .then((response) => response.json())
            .then((data) => {
              const posts = data;
              setPosts(posts);
            });
        });
    }
  };

  //------------------Comment Post------------------//
  const newComment = useRef([]);
  const addNewComment = (el) => {
    newComment.current.push(el); //--add new comment to array of comments--//
    newComment.current[0].value = ""; //--empty textArea--//
  };

  const handlePostComment = async (e) => {
    e.preventDefault();
    const postId = post._id;
    const comment = newComment.current[0].value; // --value of textArea--//
    const requestOptionsNewComment = {
      //--request options POST--//
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenConnected}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //--body of request--//
        userId: userId, //--id of user who commented the post--//
        comment, //--comment of user who commented the post--//
        name: nameConnected, //--name of user who commented the post--//
      }),
    };
    if (newComment.current[0].value === "") {
      //--if textArea is empty--//
      Swal.fire("Veuillez écrire un commentaire");
    } else {
      await fetch(
        "http://localhost:8000/posts/" + postId + "/comment", //--fetch to comment post--//
        requestOptionsNewComment
      )
        .then((response) => response.json())
        .then((data) => {
          const requestOptions = {
            //--request options GET--//
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenConnected}`,
            },
          };
          fetch(
            "http://localhost:8000/posts/" + postId + "/comments", //--fetch to get all comments of post--//
            requestOptions
          )
            .then((response) => response.json())
            .then((data) => {
              fetch("http://localhost:8000/posts", requestOptions) //--fetch to get all posts--//
                .then((response) => response.json())
                .then((data) => {
                  const posts = data;
                  setPosts(posts);
                });
            });
        });
    }
  };

  //------------------Get user data------------------//
  const requestOptions = {
    //--request options GET--//
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  fetch("http://localhost:8000/users/" + userId, requestOptions).then(
    //--fetch to get user data--//
    (response) => response.json()
  );
  //--if user is the author of the post or is admin--//
  return post.userId === userId || isAdmin === true ? (
    //--if user want to modify the post--//
    modification ? (
      <>
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header>
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
      //--if user don't want to modify the post--//
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
            <div>
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
            </div>
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
              <label htmlFor="text-new-comment"></label>
              <input
                type="text"
                id="text-new-comment"
                placeholder="Add your comment here !"
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
                Comment
              </button>
            </div>
            {post.comments // boucle pour afficher les commentaires
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
                    <p className="name-commentator">{comment.name} </p>
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
    //--if user is not the author of the post or is not admin--//
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
            <label htmlFor="text-new-comment"></label>
            <input
              type="text"
              id="text-new-comment"
              placeholder="Add your comment here !"
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
          {post.comments // boucle pour afficher les commentaires
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
