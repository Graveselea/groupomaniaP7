
import React from 'react'
import { createRoot } from 'react-dom/client';
import GlobalStyle from './utils/style/GlobalStyle';
import {  ThemeProvider } from './utils/context/context'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Posts from './pages/Posts/Posts'
import Home from './pages/Home/Home'
import Header from './components/Header/Header'
import Error from './components/Error/Error'

const container = document.getElementById('root');
const root = createRoot(container); 



root.render(
  <React.StrictMode>
    <Router>
    <ThemeProvider>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />}>
        </Route>
        <Route path="/Posts/" element={<Posts />}>
        </Route>
        <Route element={<Error />}>
         </Route>
        </Routes>
        </ThemeProvider>
    </Router>
  </React.StrictMode>,

)
