/* eslint-disable */

import Post from "../../components/Post/Post";
import React, { useState, useEffect, useRef } from "react";
import {
  TokenContext,
  NameContext,
  RulesInContext,
  UserIdContext,
} from "../../utils/context/CreateContext";
import "./Posts.css";
import Swal from "sweetalert2";

export default function Posts() {
  const SwalWelcome = require("sweetalert2");

  //------------------Context------------------//
  const [token, setToken] = React.useContext(TokenContext);
  const [name, setName] = React.useContext(NameContext);
  const [userId, setUserId] = React.useContext(UserIdContext);
  const [rules, setRules] = React.useContext(RulesInContext);

  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState(null);

  // persistance si REFRESH page
  const tokenConnected = JSON.parse(localStorage.getItem("token"));
  const nameConnected = JSON.parse(localStorage.getItem("name"));

  //------------------Fetch posts + Changement acceptation règles------------------//
  useEffect(() => {
    const displayArticle = async () => {
      const reqOptions = {
        // options de la requête GET--//
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${tokenConnected}`,
        },
      };
      setIsLoading(true);
      await fetch("http://localhost:8000/posts", reqOptions) // requête GET--//
        .then((response) => response.json())
        .then((data) => {
          const posts = data;
          setPosts(posts);
          if (rules === false) {
            // si les règles n'ont pas été acceptées
            SwalWelcome.fire({
              title: `Bonjour ${name} !`,
              text: "",
              html: "<div> <h3> ⛔️  Lorsque vous utilisez Groupomania, il est interdit de :</h3><p>Masquer votre identité, usurper l’identité d’une autre personne ou présenter de manière inexacte votre affiliation avec toute personne ou toute entité ;</p> <p> Vous engager dans toute activité qui exploite, fait du tort ou menace de faire du tort à des enfants </p>  <p>   Créer ou afficher du contenu illégal, discriminatoire, dangereux,frauduleux, trompeur ou diffamatoire, ou qui favorise ou encourage la violence, la violation des lois, l’automutilation, les troubles de l’alimentation ou l’abus de stupéfiants ;</p> <p>  Violer la loi ou enfreindre les droits de Groupomania ou de tout autre tiers ;</p> <p> Interférer avec le bon fonctionnement de Groupomania ou avec l’utilisation de Groupomania par une autre personne ;</p> <p>Accéder à Groupomania ou à du contenu ou des informations relatives à Groupomania par des moyens non autorisés par Groupomania (notamment par collecte ou par analyse) ; contourner les contrôles d’accès ; ou tenter d’obtenir un accès non autoris à Groupomania ou aux systèmes, aux mots de passe et aux comptes qui y sont associés de quelque manière que ce soit ;</p> <p> Partager des tokens d’accès administrateur avec un tiers qui n’a pas été expressément approuvé par Groupomania ou lui accorder un accès similaire à l’application. Lorsque vous décidez d’accorder un tel droit d’accès administrateur, par le biais d’un token ou d’une autorisation associée à l’application, à un tiers approuvé,vous pouvez autoriser ce tiers à accéder à vos données ou vos contenus, uniquement dans la mesure requise aux fins approuvées par Groupomania et en accord avec vos instructions. Nous nous réservons le droit de limiter l’accès accordé aux tiers (p. ex., en réinitialisant le token d’accès ou en supprimant l’autorisation d’accès à l’application) à tout moment si nous jugeons que ce droit d’accès a été ou sera utilisé à mauvais escient.</p> <p> Importer des virus, des programmes ou des codes malveillants, ou faire quoi que ce soit qui pourrait endommager, désactiver, surcharger ou détériorer Groupomania et les systèmes associés(comme une attaque entraînant un refus de service ou une  interférence avec l’affichage des pages ou toute autre fonctionnalité de Groupomania).</p> <p>   Notez également que Groupomania ne peut pas être utilisé par des mineurs de moins de 13 ans. Si vous avez moins de 13 ans, vous n’êtes pas autorisé(e) à accéder au service ni à l’utiliser.</p> </div>",
              icon: "success",
              confirmButtonText: "J'accepte",
            }).then((result) => {
              if (result.isConfirmed) {
                // si l'utilisateur accepte les règles
                validatedRules(); // fonction pour changer la valeur de rules en true
                Swal.fire("Règles validées !");
              }
            });
          }
          if (rules === true) {
            // si les règles ont été acceptées
            SwalWelcome.fire({
              title: `Bonjour ${name} !`,
              text: "",
              icon: "success",
              confirmButtonText: "Let's go !",
            });
          }
          setIsLoading(false);
        });
    };
    displayArticle();
  }, []); // Ne s'affiche qu'une fois

  // Validation des règles
  function validatedRules() {
    const reqOptionsUser = {
      // options de la requête POST--//
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenConnected}`,
      },
      body: JSON.stringify({
        // corps de la requête POST--//
        userId: userId, // id de l'utilisateur
        isRuleValidated: "true", // règles validées
      }),
    };
    fetch("http://localhost:8000/users/" + userId, reqOptionsUser) // requête POST--//
      .then((response) => response.json())
      .then((data) => {
        setRules(data);
      });
  }

  //---------------Création des posts------------------//
  const textAndFiles = useRef([]); // création d'un tableau pour stocker les fichiers et le texte
  const addtextAndFiles = (el) => {
    textAndFiles.current.push(el); // ajout des fichiers et du texte dans le tableau
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(); // création d'un objet FormData
    const reqOptionsCreate = {
      // options de la requête POST--//
      method: "POST",
      headers: { Authorization: `Bearer ${tokenConnected}` },
      body: formData, // corps de la requête POST--//
    };

    if (form[0].value === "" && form[1].files[0] === undefined) {
      // si le texte et les fichiers sont vides
      await Swal.fire("Vous avez oublié de saisir un texte et/ou un image");
    } else if (form[0].value === "" && form[1].files[0] !== undefined) {
      // si le texte est vide et qu'il y a des fichiers
      formData.append("image", form[1].files[0]); // ajout de l'image dans le corps de la requête
      formData.append("post", "Aucun texte saisie"); // ajout du texte dans le corps de la requête
      formData.append("name", nameConnected); // ajout du nom de l'utilisateur dans le corps de la requête
      setIsLoading(true);

      fetch("http://localhost:8000/posts", reqOptionsCreate) // requête POST--//
        .then((response) => response.json())
        .then((data) => {
          const reqOptions = {
            // options de la requête GET--//
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenConnected}`,
            },
          };
          fetch("http://localhost:8000/posts", reqOptions) // requête GET--//
            .then((response) => response.json())
            .then((data) => {
              const posts = data;
              setPosts(posts);
              form.reset();
              setIsLoading(false);
            });
        });
    } else if (form[0].value !== "" && form[1].files[0] === undefined) {
      // si le texte n'est pas vide et qu'il n'y a pas d'image
      formData.append("post", form[0].value); // ajout du texte dans le corps de la requête
      formData.append("name", nameConnected); // ajout du nom de l'utilisateur dans le corps de la requête
      setIsLoading(true);

      fetch("http://localhost:8000/posts", reqOptionsCreate) // requête POST--//
        .then((response) => response.json())
        .then((data) => {
          const reqOptions = {
            // options de la requête GET--//
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenConnected}`,
            },
          };
          fetch("http://localhost:8000/posts", reqOptions) // requête GET--//
            .then((response) => response.json())
            .then((data) => {
              const posts = data;
              setPosts(posts);
              form.reset();
              setIsLoading(false);
            });
        });
    } else if (form[0].value !== "" && form[1].files[0] !== undefined) {
      // si le texte n'est pas vide et qu'il y a des images
      formData.append("post", form[0].value); // ajout du texte dans le corps de la requête
      formData.append("image", form[1].files[0]); // ajout de l'image dans le corps de la requête
      formData.append("name", nameConnected); // ajout du nom de l'utilisateur dans le corps de la requête
      setIsLoading(true);

      fetch("http://localhost:8000/posts", reqOptionsCreate) // requête POST--//
        .then((response) => response.json())
        .then((data) => {
          const reqOptions = {
            // options de la requête GET--//
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenConnected}`,
            },
          };
          fetch("http://localhost:8000/posts", reqOptions) // requête GET--//
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
      // si il n'y a pas de posts
      setIsLoading(true); // affichage du loader
    } else {
      // si il y a des posts
      setIsLoading(false); // arrêt du loader
    }
  }, [posts]); // s'affiche à chaque fois que posts change

  return isLoading ? ( // si isLoading est true
    <div className="custom-loader"></div>
  ) : (
    // si isLoading est false
    <div>
      <ul className="background">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div className="displaySection">
        <h1 className="hello">Hello {nameConnected} !</h1>

        <div className="displayCreatePost">
          <div className="displayTitleCreatePost"></div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="post" className="labelCreatePost"></label>
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
                  className="inputImage"
                />
              </div>
              <input className="styleButton" type="submit" value="POST"></input>
            </div>
          </form>
        </div>
        <hr></hr>
        {posts.length === 0 ? ( // si il n'y a pas de posts
          <div className="displayNoPost">
            <h2 className="noPost">There are no posts yet. Write one!</h2>
          </div>
        ) : (
          // si il y a des posts
          <div className="displayPosts">
            {posts.map(
              (
                post,
                index // boucle sur les posts
              ) => (
                <Post key={index} data={{ post, setPosts }} />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
