import React from "react";
import StyledGlobalStyle from "./utils/style/GlobalStyle"; // style global
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Router
import Posts from "./pages/Posts/Posts";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Error from "./components/Error/Error";
import Rules from "./components/Rules/Rules";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  TokenContext,
  UserIdContext,
  NameContext,
  RulesInContext,
  isAdminInContext,
} from "./utils/context/CreateContext"; // create context

function App() {
  //------------------useState------------------//
  const [token, setToken] = React.useState(); // token state
  const [userId, setUserId] = React.useState(); // userId state
  const [name, setName] = React.useState(); // name state
  const [rules, setRules] = React.useState(); // rules state
  const [isAdmin, setIsAdmin] = React.useState(); // isAdmin state

  //------------------Return ROUTER et routes------------------//
  return (
    <div className="App">
      <Router>
        <TokenContext.Provider value={[token, setToken]}>
          <UserIdContext.Provider value={[userId, setUserId]}>
            <NameContext.Provider value={[name, setName]}>
              <isAdminInContext.Provider value={[isAdmin, setIsAdmin]}>
                <RulesInContext.Provider value={[rules, setRules]}>
                  <StyledGlobalStyle />
                  <Header />
                  <Routes>
                    <Route exact path="/" element={<Home />}></Route>
                    <Route
                      name="Posts"
                      path="/posts"
                      element={<Posts />}
                    ></Route>
                    <Route
                      name="Rules"
                      path="/rules"
                      element={<Rules />}
                    ></Route>
                    <Route path="*" element={<Error />}></Route>
                  </Routes>
                  <Footer />
                </RulesInContext.Provider>
              </isAdminInContext.Provider>
            </NameContext.Provider>
          </UserIdContext.Provider>
        </TokenContext.Provider>
      </Router>
    </div>
  );
}

export default App;
