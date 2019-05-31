import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "./layouts/Admin.jsx";
import SignIn from "./views/SignIn";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route exact path="/" component={Admin}/>
      <Route path="/login" component={SignIn} />
    </Switch>
  </Router>
  , document.getElementById("root")
);
