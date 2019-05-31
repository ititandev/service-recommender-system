/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect,withRouter } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Navbar from "../components/Navbars/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import FixedPlugin from "../components/FixedPlugin/FixedPlugin.jsx";

import routes from "../routes.js";

import dashboardStyle from "../assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import image from "../assets/img/sidebar-2.jpg";
import logo from "../assets/img/reactlogo.png";
import {withCookies} from 'react-cookie'
import axios from 'axios'

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: image,
      color: "blue",
      hasImage: true,
      fixedClasses: "dropdown show",
      mobileOpen: false,
      user:null
    };
  }
   switchRoutes(){
     return(   <Switch>
      {routes.map((prop, key) => {
        if (prop.layout === "/provider") {
          return (
            <Route
              path={prop.layout + prop.path}
              render={(props)=><prop.component {...props} user={this.state.user} />}
              key={key}
            />
          );
        }
      })}
    </Switch>)

    }
  handleImageClick = image => {
    this.setState({ image: image });
  };
  handleColorClick = color => {
    this.setState({ color: color });
  };
  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/provider/maps";
  }
  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  };
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);

    }
    componentWillMount(){
      const {cookies}=this.props;
      const token=cookies.get('ptoken')
      const user_id=cookies.get('puser_id')
      if(token){
        axios({
          method:'PUT',
          url:`http://servicy.herokuapp.com/api/users/${user_id}`,
          headers:{
            Authorization:token,
          },
          data: {}
          })
          .then(({data})=>{
            console.log('render lai chu')
            if(data.success){
              this.setState({
                user:{
                  token,
                  user:data.data
                }
              })
            }

          })
          .catch(err=>console.log(err))
    }

  }
  // componentDidUpdate(e) {
  //   if (e.history.location.pathname !== e.location.pathname) {
  //     this.refs.mainPanel.scrollTop = 0;
  //     if (this.state.mobileOpen) {
  //       this.setState({ mobileOpen: false });
  //     }
  //   }
  // }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }


  render() {
    const { classes, ...rest } = this.props;
    const {cookies}=this.props;
    if(!cookies.get('ptoken')){
        // this.props.history.push('/provider/login')
        return <Redirect to='/provider/login'/>
    }
    else{
      if(this.state.user){
        if(this.props.location.pathname==="/provider/"||this.props.location.pathname==='/provider'){
          // this.props.history.push("/provider/dashboard")
          return <Redirect to='/provider/dashboard' />
        }
        return (
          <div className={classes.wrapper}>
            <Sidebar
              routes={routes}
              logoText={"Service Provider"}
              logo={logo}
              image={this.state.image}
              handleDrawerToggle={this.handleDrawerToggle}
              open={this.state.mobileOpen}
              color={this.state.color}
              {...rest}
            />
            <div className={classes.mainPanel} ref="mainPanel">
              <Navbar
                routes={routes}
                handleDrawerToggle={this.handleDrawerToggle}
                {...rest}
              />
                <div className={classes.content}>
                  <div className={classes.container}>{this.state.user?this.switchRoutes():<div />}</div>
                </div>

            </div>
          </div>
        );
      }
      else return <p>Please wait...</p>

    }

  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withCookies(withStyles(dashboardStyle)(Dashboard)));
