import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "./layouts/Admin.jsx";
import SignIn from "./views/SignIn";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route  path="/admin/login" component={SignIn} />
      <Route  path="/admin" component={Admin}/>

    </Switch>
  </Router>
  , document.getElementById("root")
);
