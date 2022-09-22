import { useNavigate } from "react-router-dom";

import React, { useContext } from "react";
import "./Footer.scss";
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
    //--Sweet Alert
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
              className="Rules-Footer"
              onClick={posts}
              height="100%"
              width="100%"
            />
          )}
          {token === undefined && userId === "" ? (
            ""
          ) : (
            <Icon.CardChecklist
              className="Rules-Footer"
              onClick={rules}
              height="100%"
              width="100%"
            />
          )}

          {token === undefined && userId === "" ? (
            ""
          ) : (
            <Icon.BoxArrowRight
              className="logout-Footer"
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

export default Footer;
