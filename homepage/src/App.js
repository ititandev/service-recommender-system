
// --- Post bootstrap -----
import React from "react";
import AdvertisementList from "./modules/views/AdvertisementList";

import AppFooter from "./components/MyFooter";
import ProductHero from "./modules/views/ProductHero";

import ProductHowItWorks from "./modules/views/ProductHowItWorks";
import ServiceList from './modules/views/ServiceList'

import AppAppBar from "./components/MyAppBar";
import "./App.css";
import {Provider} from 'react-redux';

import store from './redux/store'

import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import  Profile from './pages/tweeper/Profile'
import UserProfile from './components/UserProfile'
import SearchResult from './components/SearchResult'
import PageNotFound from './components/PageNotFound'
const Index=props=>{
    return(
      <div>
        <AppAppBar />
        <ProductHero />
        <ProductHowItWorks />
     <ServiceList />
        <AdvertisementList />
        <AppFooter />
      </div>
    )
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      place: "",
      service: "",
      key: ""
    };
  }
  onPlaceChanged(value) {
    this.setState({
      ...this.state,
      place: value
    });
  }
  onServiceChanged(value) {
    this.setState({
      ...this.state,
      service: value
    });
  }
  onKeyChanged(value){
    this.setState({
      ...this.state,
      key: value
    })
  }
  render() {
    return (
      <Provider store={store}>

        <Router>
          <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/SignIn/" component={SignIn} />
          <Route path="/SignUp/" component={SignUp} />
          <Route path="/search/"  component={SearchResult} />
          <Route path="/services/" component={Profile} />
          <Route path="/user_profile" component={UserProfile} />
          <Route component={PageNotFound}/>
          </Switch>
        </Router>
      </Provider>

    );
  }
}

export default App;
