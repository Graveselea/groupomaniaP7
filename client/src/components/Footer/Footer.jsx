import { useNavigate } from "react-router-dom";

import React, { useContext } from "react";
import "./Footer.css";
import logoblack from "../../assets/images/logoblack.webp";

import { TokenContext, UserIdContext, NameContext } from "../../CreateContext";

import * as Icon from "react-bootstrap-icons";

function Footer() {
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
    <section className="section-footer">
      <div className="footer">
        <nav className="navFooter">
          {token === undefined && userId === "" ? (
            ""
          ) : (
            <Icon.House
              className="rules-footer"
              onClick={posts}
              height="100%"
              width="100%"
            />
          )}
          {token === undefined && userId === "" ? (
            ""
          ) : (
            <Icon.CardChecklist
              className="rules-footer"
              onClick={rules}
              height="100%"
              width="100%"
            />
          )}

          {token === undefined && userId === "" ? (
            ""
          ) : (
            <Icon.BoxArrowRight
              className="logout-footer"
              onClick={logout}
              height="100%"
              width="100%"
            />
          )}
        </nav>
      </div>{" "}
      {/* <img src={logoblack} alt="logo-groupomania" className="gpm-footer-logo" /> */}
    </section>
  );
}

export default Footer;
