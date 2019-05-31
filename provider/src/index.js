import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import {BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import {CookiesProvider} from 'react-cookie'
// core components


import SignIn from './SignIn.js'
import Admin from './layouts/Admin'
import "./assets/css/material-dashboard-react.css?v=1.6.0";

ReactDOM.render(
  <CookiesProvider>
  <Router>
    <Switch>
      <Route path="/provider/login" component={SignIn} />
      <Route path="/provider/" component={Admin}  />
    </Switch>
  </Router>
  </CookiesProvider>
  ,
  document.getElementById("root")
);
