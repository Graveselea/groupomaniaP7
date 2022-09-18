/* eslint-disable */

import Comment from "./Comment";
import React, { useState, useEffect, useRef } from "react";
import { TokenContext, NameContext, UserIdContext } from "../../App";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
// import "./Posts.css";
import Swal from "sweetalert2";
import Loader from "../../utils/style/Atoms";

export default function Comments() {
  const SwalWelcome = require("sweetalert2");

  let [token, setToken] = React.useContext(TokenContext);
  let [userId, setUserId] = React.useContext(UserIdContext);

  let [name, setName] = React.useContext(NameContext);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState(null);
  // const [newComment, setNewComment] = useState("");
  //Affichage des commentaires

  const reqOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8000/comments", reqOptions)
      .then((response) => response.json())
      .then((data) => {
        const comments = data;
        console.log(data);
        setComments(comments);
        setIsLoading(false);
      });
  }, []);

  //Création d'un commentaire */

  const text = useRef([]);
  const addtext = (cm) => {
    text.current.push(cm);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData();
    const reqOptionsCreateComment = {
      method: "POST",
      headers: { Authorization: "Bearer " + token },
      body: formData,
    };

    if (form[0].value === "") {
      Swal.fire("Vous avez oublié de saisir un commentaire");
    } else if (form[0].value !== "") {
      formData.append("comment", form[0].value);
      formData.append("name", name);
      setIsLoading(true);

      fetch("http://localhost:8000/comments", reqOptionsCreateComment)
        .then((response) => response.json())
        .then((data) => {
          const reqOptions = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          };
          const newCommentsPosts = fetch(
            "http://localhost:8000/comments",
            reqOptions
          )
            .then((response) => response.json())
            .then((data) => {
              const comments = data;
              setComments(comments);
              form.reset();
              setIsLoading(false);
            });
        });
    }
  };

  useEffect(() => {
    if (!comments) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [comments]);

  return isLoading ? (
    <Loader></Loader>
  ) : (
    <section className="displaySectionComments">
      <div className="displayComments">
        {comments.map((comment, index) => (
          <Comment key={index} data={{ comment, setComments }} />
        ))}
      </div>
      <hr></hr>
      <div className="displayCreateComment">
        <div className="displayTitleCreateComment">
          <label htmlFor="comment" className="titleCreateComment"></label>
        </div>
        <form onSubmit={handleComment}>
          <textarea
            id="comment"
            name="comment"
            type="text"
            className="displayTextArea"
            ref={addtext}
            placeholder="Your comment here ?"
          ></textarea>
          <div className="ButtonPublish">
            <input
              className="styleButton"
              type="submit"
              value="COMMENT"
            ></input>
          </div>
        </form>
      </div>
    </section>
  );
}
