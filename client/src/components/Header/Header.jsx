import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import logowhite from "../../assets/images/logowhite.png";
import "./Header.css";
import Button from "react-bootstrap/Button";
import { TokenContext, UserIdContext, NameContext } from "../../App";

import * as Icon from "react-bootstrap-icons";

function Header() {
  // const { toggleTheme, theme } = useContext(ThemeContext)
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

  return (
    <section className="section-header">
      <div className="header">
        <nav>
          <img src={logowhite} alt="logo" className="gpm-banner-logo" />
          {token === undefined && userId === "" ? (
            ""
          ) : (
            <a href="http://localhost:3000/">
              <Button className="button-header" variant="red" to="/">
                Home
              </Button>
            </a>
          )}
          {token === undefined && userId === "" ? (
            ""
          ) : (
            <a href="http://localhost:3000/posts">
              <Button className="button-header" variant="red" to="/posts">
                Posts
              </Button>
            </a>
          )}
          {token === undefined && userId === "" ? (
            ""
          ) : (
            <Icon.CardChecklist
              className="cardchecklist"
              onClick={rules}
              size="1x"
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
              size="1x"
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
