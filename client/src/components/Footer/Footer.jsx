import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import "./Footer.min.css";
import {
  TokenContext,
  UserIdContext,
  NameContext,
} from "../../utils/context/CreateContext";

import * as Icon from "react-bootstrap-icons";

function Footer() {
  //------------------Context------------------//
  let [token, setToken] = useContext(TokenContext);
  let [userId, setUserId] = useContext(UserIdContext);
  let [name, setName] = useContext(NameContext);

  const navigate = useNavigate();
  const SwalLogOut = require("sweetalert2");

  //------------------LogOut------------------//
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
    <section className="section-footer">
      <div className="footer">
        <nav className="navFooter">
          {token === undefined && userId === "" ? ( // if user is not connected
            ""
          ) : (
            // if user is connected
            <Icon.House
              className="rules-footer"
              onClick={posts}
              height="100%"
              width="100%"
            />
          )}
          {token === undefined && userId === "" ? ( // if user is not connected
            ""
          ) : (
            // if user is connected
            <Icon.CardChecklist
              className="rules-footer"
              onClick={rules}
              height="100%"
              width="100%"
            />
          )}
          {token === undefined && userId === "" ? ( // if user is not connected
            ""
          ) : (
            // if user is connected
            <Icon.BoxArrowRight
              className="logout-footer"
              onClick={logout}
              height="100%"
              width="100%"
            />
          )}
        </nav>
      </div>{" "}
    </section>
  );
}

export default Footer;
