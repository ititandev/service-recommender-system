
// --- Post bootstrap -----
import React from "react";
import "./App.css";
import {Provider} from 'react-redux';
import store from './redux/store'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import { Route,Switch } from "react-router-dom";
import HomePage from './HomePage'
import SearchResult from './components/SearchResult'
import UserProfile from './components/UserProfile'
import PageNotFound from './components/PageNotFound'
import {withCookies} from 'react-cookie'
import {connect} from 'react-redux';
import Profile from './pages/tweeper/Profile'
import {loginRequest} from './redux/actions'
import {root} from './config'
import axios from 'axios'
class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      routing:true
    }
  }
  componentWillMount(){
    const {cookies,loginRequest}=this.props;
    const token=cookies.get('token')
    const user_id=cookies.get('user_id')
    if(token&&user_id){
      this.setState({
        routing:false
      })
      axios({
        method:'PUT',
        url:`${root}/users/${user_id}`,
        headers:{
          Authorization:token,
        },
        data:{}
        })
        .then(({data})=>{
          if(data.success)
            loginRequest(data.data,token)
          this.setState({
            routing:true
          })
        })
        .catch(err=>this.setState({routing:true}))
    }

  }
  render() {
    if(!this.state.routing){
      return <div />
    }
    return (
            <Switch>
              <Route
                path="/"
                exact
                render={()=><HomePage cookies={this.props.cookies} />}
                />
              <Route
                path="/SignIn/"
                render={()=><SignIn cookies={this.props.cookies} />}
                />
              <Route
                path="/SignUp/"
                render={()=><SignUp cookies={this.props.cookies}/>}
                />
              <Route
                path="/search/"
                render={()=><SearchResult cookies={this.props.cookies}/>} />
              <Route
                path="/services/"
                render={()=><Profile cookies={this.props.cookies}/>} />
              <Route
                path="/user_profile"
                render={()=><UserProfile cookies={this.props.cookies} />} />
              <Route
                render={()=><PageNotFound cookies={this.props.cookies} />}/>
            </Switch>
    );
  }
}
const mapDispatchToProps={loginRequest}
const mapStateToProps=state=>{
  return{
    login:state.login
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withCookies(App));
