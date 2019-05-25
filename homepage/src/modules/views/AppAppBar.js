
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import AppBar from "../components/AppBar";
import Toolbar, { styles as toolbarStyles } from "../components/Toolbar";
import Select from "@material-ui/core/Select";
import axios from 'axios';
import {connect} from 'react-redux';
import Modal from '@material-ui/core/Modal'
import {Button} from '@material-ui/core'
import {logoutAction} from '../../redux/actions'
import { withRouter,Redirect } from "react-router-dom";
import {loginAction, loadLocationAction,loadServiceTypeAction,setLocationAction,setServiceTypeAction} from '../../redux/actions'
const styles = theme => ({
  title: {
    fontSize: 24
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: "space-between"
  },
  left: {
    flex: 1
  },
  leftLinkActive: {
    color: theme.palette.common.white
  },
  right: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end"
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing.unit * 3
  },
  linkSecondary: {
    color: theme.palette.secondary.main
  }
});

class AppAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        key:'',
        open:false,
    }
  }
  componentWillMount() {
    const {loadLocationAction,loadServiceTypeAction}=this.props;
    loadLocationAction();
    loadServiceTypeAction();
  }
  handleChangePlace(value){
    const {setServiceTypeAction}=this.props;
    setServiceTypeAction({current:value.target.value})
  }
  handleChangeService(value){
    const {setLocationAction}=this.props;
    setLocationAction({current:value.target.value})
  }
  handleChangeKey(value){
    this.props.onKeyChanged(value.target.value);
    this.setState({
      ...this.state,
      key: value.target.value
    })
  }
  handleSearch(){
    console.log(this.state.key)
  }
  renderSignInButton(){
    const {login,logoutAction,classes}=this.props;
    if(login.token!=null){
      return(
      <Button
        color="inherit"
        variant="h6"
        underline="none"
        className={classes.rightLink}
        onClick={()=>window.location.reload()}
      >
        Logout
      </Button>)
    }
    return (<Link
      color="inherit"
      variant="h6"
      underline="none"
      className={classes.rightLink}
      href='/SignIn'
    >
      Sign In
    </Link>)
  }
  render() {
    const { classes,login } = this.props;
    console.log('TYPE...........',this.props.service_types)
    return (
      <div>
        <AppBar position="fixed">
          <Toolbar className={classes.toolbar}>
            <Link
              variant="h6"
              underline="none"
              color="inherit"
              className={classes.title}
              href="/premium-themes/onepirate"
            >
              {"SERVICY"}
            </Link>
            <div
              className="col-sm-2"
              style={{ height: "10vh", borderRadius: "20" }}
            >
              <div className="row-sm-4" style={{ paddingTop: "2%" }}>
                <label>Place </label>
              </div>
              <div className="row-sm-8">
                <Select
                  style={{
                    width: "70%",
                    backgroundColor: "white",
                    borderRadius: "20"
                  }}
                  value={this.props.locations.current==null?'':this.props.locations.current}
                  onChange={this.handleChangePlace.bind(this)}
                >
                {
                    [(<option key={-1} value={""}>All</option>)].concat(
                    this.props.locations.all.map((item,index)=>{
                      return  (<option  key={index} value={item.name}>{item.name}</option>)
                    }))
                }
                </Select>
              </div>
            </div>
            <div
              className="col-sm-2"
              style={{ height: "10vh", borderRadius: "20" }}
            >
              <div className="row-sm-4" style={{ paddingTop: "2%" }}>
                <label> Kind Of Service </label>
              </div>
              <div
                className="row-sm-8"
                style={{ height: "10vh", borderRadius: "20" }}
              >
                <Select
                  style={{
                    width: "70%",
                    backgroundColor: "white",
                    borderRadius: "20"
                  }}
                  value={this.props.service_types.current==null?'':this.props.service_types.current}
                  onChange={this.handleChangeService.bind(this)}
                  >
                  {
                      [(<option key={-1} value={""}>All</option>)].concat(
                      this.props.service_types.all.map((item,index)=>{
                        return  (<option  key={index} value={item.name}>{item.name}</option>)
                      }))
                  }
                  </Select>
              </div>
            </div>

            <div className="search">
              <input
                type="text"
                className="searchTerm"
                placeholder="bạn đang tìm gì "
                value={this.state.key}
                onChange={this.handleChangeKey.bind(this)}
              />
              <button
                type="submit"
                className="searchButton"
                  onClick={this.handleSearch.bind(this)}>
                <img
                  src="img/search.png"
                  style={{ width: "80%", height: "80%" }}
                />
              </button>
            </div>

            <div className={classes.right}>
              {
                  this.renderSignInButton()
              }

              <Link
                variant="h6"
                underline="none"
                className={classNames(classes.rightLink, classes.linkSecondary)}
                href="/SignUp"
              >
                {"Sign Up"}
              </Link>
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.placeholder} />
      </div>
    );
  }
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps=(state)=>{
  return{
    login: state.login,
    locations: state.locations,
    service_types: state.services.types
  }
}
const mapDispatchToProps={
  loginAction,
  logoutAction,
  loadLocationAction,
  loadServiceTypeAction,
  setLocationAction,
  setServiceTypeAction
}
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(AppAppBar));
