import * as Icon from "react-bootstrap-icons";
import Modal from "react-bootstrap/Modal";
// import "./Post.css";
import React, { useState, useRef } from "react";
import { TokenContext, UserIdContext, NameContext } from "../../App";

const Comment = (props) => {
  const Swal = require("sweetalert2");
  const { comment, setComments } = props.data;

  let [token, setToken] = React.useContext(TokenContext);
  let [userId, setUserId] = React.useContext(UserIdContext);
  let [name, setName] = React.useContext(NameContext);

  const [modification, setModification] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Modification d'un commentaire */
  const text = useRef([]);
  const addtext = (el) => {
    text.current.push(el);
  };

  const sendModification = (event) => {
    event.preventDefault();
    const form = event.target;
    console.log(form);
    const commentId = form[1].id;
    const formData = new FormData();
    const requestOptionsModifiyComment = {
      method: "PUT",
      headers: { Authorization: "Bearer " + token },
      body: formData,
    };

    if (form[0].value === "") {
      Swal.fire("Vous avez oublié de saisir un commentaire");
    } else if (form[0].value !== "") {
      formData.append("comment", form[0].value);

      fetch(
        "http://localhost:8000/comments/" + commentId,
        requestOptionsModifiyComment
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
          const newCommentsPosts = fetch(
            "http://localhost:8000/comments",
            requestOptions
          )
            .then((response) => response.json())
            .then((data) => {
              const comments = data;
              setComments(comments);
              if (comments) {
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
    console.log(target);
    const requestOptionsDeleteComment = {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    };
    fetch(
      "http://localhost:8000/comments/" + target,
      requestOptionsDeleteComment
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
        const newCommentsPosts = fetch(
          "http://localhost:8000/comments",
          requestOptions
        )
          .then((response) => response.json())
          .then((data) => {
            const comments = data;
            setComments(comments);
          });
      });
  };

  return comment.userId === userId ? (
    modification ? (
      <>
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title> Modify your comment !</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="displayComment">
              <div className="conteneur">
                <form
                  onSubmit={sendModification}
                  className="displayTexteareaModificationMode"
                >
                  <textarea
                    name="comment"
                    type="text"
                    className="displayTextAreaToModif"
                    ref={addtext}
                    placeholder="Modify your comment"
                  ></textarea>
                  <div className="displayButtons">
                    <input
                      id={comment._id}
                      className="styleButton fontSizeSend"
                      type="submit"
                      name="COMMENT"
                    ></input>
                    <button
                      className="styleButton fontSizeAnnulation"
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
      <div className="comment">
        <div
          data-set={comment._id}
          className="Card"
          border="danger"
          style={{ width: "28rem" }}
        >
          <hr></hr>
          <div className="Card-header">
            <img
              accept="image/*"
              src="../../../assets/images/profile.webp"
              alt="profil"
              style={{ width: "80px", height: "80px" }}
            />
            <p className="dispayNameCommenter">
              {comment.name === name ? "Your comment" : comment.name}
            </p>
            <Icon.Pencil
              className="iconComment"
              id={comment._id}
              onClick={() => {
                handleShow();
                setModification(true);
              }}
            />
            <Icon.Trash
              className="iconComment"
              id={comment._id}
              onClick={(e) => handleDelete(e)}
            />
          </div>
          <div>
            <p>{comment.comment}</p>
          </div>
        </div>
      </div>
    )
  ) : (
    <div className="comment">
      <div className="Card" border="danger" style={{ width: "28rem" }}>
        <div>
          <img
            src="../../assets/images/profile.webp"
            alt="profil"
            style={{ width: "80px", height: "80px" }}
          />
          <p className="dispayNamePoster">Publié par : {comment.name}</p>
        </div>
        <div>
          <p>{comment.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
