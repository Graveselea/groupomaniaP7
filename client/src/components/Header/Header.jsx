import { useNavigate } from "react-router-dom";

import React, { useContext } from "react";
import logowhite from "../../assets/images/logowhite.webp";
import "./Header.css";
import { TokenContext, UserIdContext, NameContext } from "../../CreateContext";

import * as Icon from "react-bootstrap-icons";

function Header() {
  let [token, setToken] = useContext(TokenContext);
  let [userId, setUserId] = useContext(UserIdContext);
  let [name, setName] = useContext(NameContext);

  const navigate = useNavigate();
  const SwalLogOut = require("sweetalert2");

  const logout = (e) => {
    localStorage.clear();
    setToken(undefined);
    setUserId("");
    setName(undefined);
    navigate("/");
    SwalLogOut.fire({
      title: "See you soon !",
      text: "",
      icon: "success",
      confirmButtonText: "Ok",
    });
  };

  const rules = (e) => {
    navigate("/rules");
  };

  const posts = (e) => {
    navigate("/posts");
  };

  return (
    <section className="section-header">
      <div className="header">
        <img
          src={logowhite}
          alt="logo-groupomania"
          className="gpm-banner-logo"
        />
        <nav className="nav-item">
          {token === undefined && userId === "" ? (
            ""
          ) : (
            <Icon.House
              className="cardchecklist"
              onClick={posts}
              height="100%"
              width="100%"
            />
          )}
          {token === undefined && userId === "" ? (
            ""
          ) : (
            <Icon.CardChecklist
              className="cardchecklist"
              onClick={rules}
              height="100%"
              width="100%"
            />
          )}

          {token === undefined && userId === "" ? (
            ""
          ) : (
            <Icon.BoxArrowRight
              className="XCircle"
              onClick={logout}
              height="100%"
              width="100%"
            />
          )}
        </nav>
      </div>
    </section>
  );
}

export default Header;
