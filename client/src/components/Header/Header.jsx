import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import logowhite from "../../assets/images/logowhite.webp";
import "./Header.min.css";
import {
  TokenContext,
  UserIdContext,
  NameContext,
} from "../../utils/context/CreateContext";

import * as Icon from "react-bootstrap-icons"; //--import Icon from bootstrap--//

function Header() {
  //------------------Context------------------//
  let [token, setToken] = useContext(TokenContext);
  let [userId, setUserId] = useContext(UserIdContext);
  let [name, setName] = useContext(NameContext);

  const navigate = useNavigate();
  const SwalLogOut = require("sweetalert2");

  //------------------LogOut------------------//
  const logout = (e) => {
    localStorage.clear(); //--clear local storage--//
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

  //------------------Rules Link------------------//
  const rules = (e) => {
    navigate("/rules");
  };

  //------------------Posts Link------------------//
  const posts = (e) => {
    navigate("/posts");
  };

  //------------------Return------------------//
  return (
    <section className="section-header">
      <div className="header">
        <img
          src={logowhite} //--import logo--//
          width="300"
          height="auto"
          alt="logo-groupomania"
          className="gpm-banner-logo"
        />
        <nav className="nav-item">
          {token === undefined && userId === "" ? ( // if user is not connected
            ""
          ) : (
            // if user is connected
            <Icon.House
              className="cardchecklist"
              onClick={posts} //--link to posts--//
              height="100%"
              width="100%"
            />
          )}
          {token === undefined && userId === "" ? ( // if user is not connected
            ""
          ) : (
            // if user is connected
            <Icon.CardChecklist
              className="cardchecklist"
              onClick={rules} //--link to rules--//
              height="100%"
              width="100%"
            />
          )}

          {token === undefined && userId === "" ? ( // if user is not connected
            ""
          ) : (
            // if user is connected
            <Icon.BoxArrowRight
              className="XCircle"
              onClick={logout} //--link to logout--//
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
