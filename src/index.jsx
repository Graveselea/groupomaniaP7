import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import './styles/index.css';
import reportWebVitals from './reportWebVitals';

// import pages 
import App from './components/pages/Index';
import Home from './components/pages/Home';

 
ReactDOM.render(
  <React.StrictMode>
      <Router>
          {/* <Header /> */}
          <Route exact path="/">
              <App />
          </Route>
          <Route path="/home">
              <Home />
          </Route>
      </Router>
  </React.StrictMode>,
document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
