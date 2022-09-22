/* eslint-disable */

import Post from "../../components/Post/Post";
import React, { useState, useEffect, useRef } from "react";
import {
  TokenContext,
  NameContext,
  RulesInContext,
  UserIdContext,
} from "../../CreateContext";
import "./Posts.css";
import Swal from "sweetalert2";
import Loader from "../../utils/style/Atoms";

export default function Posts() {
  const SwalWelcome = require("sweetalert2");

  let [token] = React.useContext(TokenContext);
  let [name] = React.useContext(NameContext);
  const [userId] = React.useContext(UserIdContext);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState(null);
  const [rules, setRules] = React.useContext(RulesInContext);

  function validatedRules() {
    const reqOptionsUser = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        userId: userId,
        isRuleValidated: "true",
      }),
    };
    fetch("http://localhost:8000/users/" + userId, reqOptionsUser)
      .then((response) => response.json())
      .then((data) => {
        setRules(data);
        localStorage.setItem("rules", "true");
      });
  }
  //Affichage des posts

  const reqOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8000/posts", reqOptions)
      .then((response) => response.json())
      .then((data) => {
        const posts = data;
        setPosts(posts);

        if (rules === false) {
          SwalWelcome.fire({
            title: `Bonjour ${name} !`,
            text: "",
            html: "<div> <h3> ⛔️  Lorsque vous utilisez Groupomania, il est interdit de :</h3><p>Masquer votre identité, usurper l’identité d’une autre personne ou présenter de manière inexacte votre affiliation avec toute personne ou toute entité ;</p> <p> Vous engager dans toute activité qui exploite, fait du tort ou menace de faire du tort à des enfants </p>  <p>   Créer ou afficher du contenu illégal, discriminatoire, dangereux,frauduleux, trompeur ou diffamatoire, ou qui favorise ou encourage la violence, la violation des lois, l’automutilation, les troubles de l’alimentation ou l’abus de stupéfiants ;</p> <p>  Violer la loi ou enfreindre les droits de Groupomania ou de tout autre tiers ;</p> <p> Interférer avec le bon fonctionnement de Groupomania ou avec l’utilisation de Groupomania par une autre personne ;</p> <p>Accéder à Groupomania ou à du contenu ou des informations relatives à Groupomania par des moyens non autorisés par Groupomania (notamment par collecte ou par analyse) ; contourner les contrôles d’accès ; ou tenter d’obtenir un accès non autoris à Groupomania ou aux systèmes, aux mots de passe et aux comptes qui y sont associés de quelque manière que ce soit ;</p> <p> Partager des tokens d’accès administrateur avec un tiers qui n’a pas été expressément approuvé par Groupomania ou lui accorder un accès similaire à l’application. Lorsque vous décidez d’accorder un tel droit d’accès administrateur, par le biais d’un token ou d’une autorisation associée à l’application, à un tiers approuvé,vous pouvez autoriser ce tiers à accéder à vos données ou vos contenus, uniquement dans la mesure requise aux fins approuvées par Groupomania et en accord avec vos instructions. Nous nous réservons le droit de limiter l’accès accordé aux tiers (p. ex., en réinitialisant le token d’accès ou en supprimant l’autorisation d’accès à l’application) à tout moment si nous jugeons que ce droit d’accès a été ou sera utilisé à mauvais escient.</p> <p> Importer des virus, des programmes ou des codes malveillants, ou faire quoi que ce soit qui pourrait endommager, désactiver, surcharger ou détériorer Groupomania et les systèmes associés(comme une attaque entraînant un refus de service ou une  interférence avec l’affichage des pages ou toute autre fonctionnalité de Groupomania).</p> <p>   Notez également que Groupomania ne peut pas être utilisé par des mineurs de moins de 13 ans. Si vous avez moins de 13 ans, vous n’êtes pas autorisé(e) à accéder au service ni à l’utiliser.</p> </div>",
            icon: "success",
            confirmButtonText: "J'accepte",
          }).then((result) => {
            if (result.isConfirmed) {
              validatedRules();
              Swal.fire("Règles validées !");
            }
          });
        }

        if (rules === true) {
          SwalWelcome.fire({
            title: `Bonjour ${name} !`,
            text: "",
            icon: "success",
            confirmButtonText: "Let's go !",
          });
        }
        // setIsLoading(false);
      });
  }, []); // Ne s'affiche qu'une fois

  //Création d'un post */

  const textAndFiles = useRef([]);
  const addtextAndFiles = (el) => {
    textAndFiles.current.push(el);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData();
    const reqOptionsCreate = {
      method: "POST",
      headers: { Authorization: "Bearer " + token },
      body: formData,
    };

    if (form[0].value === "" && form[1].files[0] === undefined) {
      await Swal.fire("Vous avez oublié de saisir un texte et/ou un image");
    } else if (form[0].value === "" && form[1].files[0] !== undefined) {
      formData.append("image", form[1].files[0]);
      formData.append("post", "Aucun texte saisie");
      formData.append("name", name);
      setIsLoading(true);

      fetch("http://localhost:8000/posts", reqOptionsCreate)
        .then((response) => response.json())
        .then((data) => {
          const reqOptions = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          };
          const newPostsWall = fetch("http://localhost:8000/posts", reqOptions)
            .then((response) => response.json())
            .then((data) => {
              const posts = data;
              setPosts(posts);
              form.reset();
              setIsLoading(false);
            });
        });
    } else if (form[0].value !== "" && form[1].files[0] === undefined) {
      formData.append("post", form[0].value);
      formData.append("name", name);
      setIsLoading(true);

      fetch("http://localhost:8000/posts", reqOptionsCreate)
        .then((response) => response.json())
        .then((data) => {
          const reqOptions = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          };
          fetch("http://localhost:8000/posts", reqOptions)
            .then((response) => response.json())
            .then((data) => {
              const posts = data;
              setPosts(posts);
              form.reset();
              setIsLoading(false);
            });
        });
    } else if (form[0].value !== "" && form[1].files[0] !== undefined) {
      formData.append("post", form[0].value);
      formData.append("image", form[1].files[0]);
      formData.append("name", name);
      setIsLoading(true);

      fetch("http://localhost:8000/posts", reqOptionsCreate)
        .then((response) => response.json())
        .then((data) => {
          const reqOptions = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          };
          fetch("http://localhost:8000/posts", reqOptions)
            .then((response) => response.json())
            .then((data) => {
              const posts = data;
              setPosts(posts);
              form.reset();
              setIsLoading(false);
            });
        });
    }
  };

  useEffect(() => {
    if (!posts) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [posts]);

  return isLoading ? (
    <Loader></Loader>
  ) : (
    <section className="displaySection">
      <h1 className="hello">Hello {name} !</h1>

      <div className="displayCreatePost">
        <div className="displayTitleCreatePost">
          <label htmlFor="post" className="titleCreatePost"></label>
        </div>
        <form onSubmit={handleSubmit}>
          <textarea
            id="post"
            name="post"
            type="text"
            className="displayTextArea"
            ref={addtextAndFiles}
            placeholder="How are you feeling today ?"
          ></textarea>
          <div className="displayinputImageAndButtonPublish">
            <div className="displayLabelAndInputImage">
              <label htmlFor="image" id="colorLabelChooseImage"></label>
              <input
                name="image"
                type="file"
                accept="*"
                ref={addtextAndFiles}
                id="image"
                alt="image poster par un utilisateur"
              />
            </div>
            <input className="styleButton" type="submit" value="POST"></input>
          </div>
        </form>
      </div>
      <hr></hr>
      {posts.length === 0 ? (
        <div className="displayNoPost">
          <h2 className="noPost">There are no posts yet. Write one!</h2>
        </div>
      ) : (
        <div className="displayPosts">
          {posts.map((post, index) => (
            <Post key={index} data={{ post, setPosts }} />
          ))}
        </div>
      )}
    </section>
  );
}
