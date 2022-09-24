import "./Login.css";
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TokenContext,
  UserIdContext,
  NameContext,
  RulesInContext,
  isAdminInContext,
} from "../../CreateContext";

export default function Log() {
  let [authMode, setAuthMode] = useState("signin");

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };
  const [errorMessages, setErrorMessages] = useState({});

  const navigate = useNavigate();
  const SwalWelcome = require("sweetalert2");

  let [token, setToken] = React.useContext(TokenContext);
  let [userId, setUserId] = React.useContext(UserIdContext);
  let [name, setName] = React.useContext(NameContext);
  let [rules, setRules] = React.useContext(RulesInContext);
  let [isAdmin, setIsAdmin] = React.useContext(isAdminInContext);

  useEffect(() => {
    setToken(undefined);
    setUserId("");
    setName("");
    setRules("");
  }, []);

  const errors = {
    name: "Ceci n'est pas un nom valide",
    email: "Ceci n'est pas une adresse mail valide",
    pass: "Votre mot de passe doit contenir au minimum 10 caractères, un chiffre, une minuscule, une majusle et un caratère spécial",
    ok: "",
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  //--Récupération de la saisie des inputs de connexion d'un compte existant
  const inputsSignIn = useRef([]);
  const addInputsSignIn = (el) => {
    inputsSignIn.current.push(el);
  };

  // SignIn
  const Login = (event, props) => {
    event.preventDefault();
    const email = inputsSignIn.current[0];
    const password = inputsSignIn.current[1];

    //--S'il n'y a pas d'Email : on alerte l'utilisateur qu'il doit saisir un mail
    if (email.value === "") {
      document.getElementById("emailSignIn").placeholder = "Oups ! Pas d'email";
      //--S'il n'y a pas de mot de passe : on alerte l'utilisateur qu'il doit en saisir un
    } else if (
      email.value !== "" &&
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email.value)
    ) {
      setErrorMessages({
        name: "emailErrorSignIn",
        message: errors.email,
      });
    } else if (password.value === "") {
      document.getElementById("passwordSignIn").placeholder =
        "Re oups ! Pas de mot de passe";
    } else if (
      password.value !== "" &&
      !/^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/g.test(
        password.value
      )
    ) {
      setErrorMessages({ name: "passErrorSignIn", message: errors.pass });
    } else {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      };
      fetch("http://localhost:8000/auth/Login", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setToken(data.token);
          setUserId(data.userId);
          setName(data.name);
          setRules(data.rules);
          setIsAdmin(data.isAdmin);
          localStorage.setItem("token", JSON.stringify(data.token));
          localStorage.setItem("name", JSON.stringify(data.name));
          if (data.userId === undefined) {
            SwalWelcome.fire({
              title: "",
              text: "Veuillez vous inscrire",
              icon: "warning",
              confirmButtonText: "Ok",
            });
          } else {
            navigate("/posts");
          }
        })
        .catch(function (error) {
          SwalWelcome.fire({
            title: "",
            text: "Il y a un problème de connexion",
            icon: "warning",
            confirmButtonText: "Ok",
          });
          navigate("/");
        });
    }
  };

  //SignUp
  const inputsSignUp = useRef([]);
  const addInputsSignUp = (el) => {
    inputsSignUp.current.push(el);
  };

  const handleFormSignUp = (event) => {
    event.preventDefault();

    const name = inputsSignUp.current[0];
    const email = inputsSignUp.current[1];
    const password = inputsSignUp.current[2];

    if (name.value === "") {
      document.getElementById("nameSignUp").placeholder =
        "Oups ! Ni nom ni pseudo";
    } else if (
      name.value !== "" &&
      !/^([a-zA-Z0-9-_]{2,36})$/g.test(name.value)
    ) {
      setErrorMessages({
        name: "nameErrorSignUp",
        message: errors.name,
      });
    } else if (email.value === "") {
      document.getElementById("emailSignUp").placeholder =
        "Re Oups ! Pas d'email";
    } else if (
      email.value !== "" &&
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email.value)
    ) {
      setErrorMessages({
        name: "emailErrorSignUp",
        message: errors.email,
      });
    } else if (password.value === "") {
      document.getElementById("passwordSignUp").placeholder =
        "Re Re oups ! Pas de mot de passe";
    } else if (
      password.value !== "" &&
      !/^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/g.test(
        password.value
      )
    ) {
      setErrorMessages({ name: "passErrorSignUp", message: errors.pass });
    } else {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          password: password.value,
        }),
      };
      fetch("http://localhost:8000/auth/signup", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          SwalWelcome.fire({
            title: "",
            text: "Votre compte a été enregistré !",
            icon: "success",
            confirmButtonText: "Ok",
          });
          navigate("/");
          setAuthMode("signin");
        });
    }
  };

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={Login}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-sign" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label htmlFor="emailSignIn">Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                ref={addInputsSignIn}
                id="emailSignIn"
                name="emailSignIn"
                autoComplete="username"
              />
              {renderErrorMessage("emailErrorSignIn")}
            </div>
            <div className="form-group mt-3">
              <label htmlFor="passwordSignIn">Password</label>
              <input
                htmlFor="passwordSignIn"
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                ref={addInputsSignIn}
                autoComplete="current-password"
              />
              {renderErrorMessage("passErrorSignIn")}
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-submit">
                Submit
              </button>
            </div>
            <p className="a-groupomania">@Groupomania !</p>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleFormSignUp}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-sign" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label htmlFor="nameSignUp">Full Name</label>
            <input
              type="name"
              className="form-control mt-1"
              placeholder="Full Name"
              ref={addInputsSignUp}
              id="nameSignUp"
              name="nameSignUp"
            />
            {renderErrorMessage("nameErrorSignUp")}
          </div>
          <div className="form-group mt-3">
            <label htmlFor="emailSignUp">Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              name="emailSignUp"
              ref={addInputsSignUp}
              id="emailSignUp"
            />
            {renderErrorMessage("emailErrorSignUp")}
          </div>
          <div className="form-group mt-3">
            <label or="passwordSignUp">Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              name="passwordSignUp"
              ref={addInputsSignUp}
              id="passwordSignUp"
            />
            {renderErrorMessage("passErrorSignUp")}
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-submit">
              Submit
            </button>
          </div>
          <p className="a-groupomania">@Groupomania !</p>
        </div>
      </form>
    </div>
  );
}
