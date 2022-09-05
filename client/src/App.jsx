
import React from 'react'
import { createRoot } from 'react-dom/client';
import GlobalStyle from './utils/style/GlobalStyle';
import {  ThemeProvider } from './utils/context/context'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Posts from './pages/Posts/Posts'
import Home from './pages/Home/Home'
import Header from './components/Header/Header'
import Error from './components/Error/Error'
import Rules from './components/Rules/Rules'
import "bootstrap/dist/css/bootstrap.min.css"


export const TokenContext = React.createContext()
export const UserIdContext = React.createContext()
export const NameContext = React.createContext()
export const LogInContext = React.createContext()

function App() {

    const [token, setToken] = React.useState()
    const [userId, setUserId] = React.useState()
    const [name, setName] = React.useState()


    return (
    <div className="App">
        <Router>
        <TokenContext.Provider value={[token, setToken]}>
        <UserIdContext.Provider value={[userId, setUserId]}>
          <NameContext.Provider value={[name, setName]}>
    <ThemeProvider>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />}>
        </Route>
        <Route path="/Posts/" element={<Posts />}>
        </Route>
        <Route path="/Rules/" element={<Rules />}>
        </Route>
        <Route component={<Error />}>
         </Route>
        </Routes>
        </ThemeProvider>
        </NameContext.Provider>
        </UserIdContext.Provider>
        </TokenContext.Provider>
    </Router>
    </div>
        )
}

export default App