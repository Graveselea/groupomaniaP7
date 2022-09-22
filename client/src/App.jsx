import React from "react";
import GlobalStyle from "./utils/style/GlobalStyle";
import { ThemeProvider } from "./utils/context/context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Posts from "./pages/Posts/Posts";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Error from "./components/Error/Error";
import Rules from "./components/Rules/Rules";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  TokenContext,
  UserIdContext,
  NameContext,
  RulesInContext,
  isAdminInContext,
} from "./CreateContext";

function App() {
  const [token, setToken] = React.useState();
  const [userId, setUserId] = React.useState();
  const [name, setName] = React.useState();
  const [rules, setRules] = React.useState();
  const [isAdmin, setIsAdmin] = React.useState();

  return (
    <div className="App">
      <Router>
        <TokenContext.Provider value={[token, setToken]}>
          <UserIdContext.Provider value={[userId, setUserId]}>
            <NameContext.Provider value={[name, setName]}>
              <isAdminInContext.Provider value={[isAdmin, setIsAdmin]}>
                <RulesInContext.Provider value={[rules, setRules]}>
                  <ThemeProvider>
                    <GlobalStyle />
                    <Header />
                    <Routes>
                      <Route exact path="/" element={<Home />}></Route>
                      <Route
                        name="Posts"
                        path="/Posts"
                        element={<Posts />}
                      ></Route>
                      <Route
                        name="Rules"
                        path="/Rules"
                        element={<Rules />}
                      ></Route>
                      {/* <Route path="*" component={<Error />}></Route> */}
                    </Routes>
                  </ThemeProvider>
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
