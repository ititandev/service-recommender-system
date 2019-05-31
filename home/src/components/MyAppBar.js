import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';

import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Avatar from '@material-ui/core/Avatar'




import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux'
import {loadLocationAction,loadServiceTypeAction,setServiceFilterAction,logoutAction} from '../redux/actions'

import {withRouter} from 'react-router-dom'
const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    marginTop:theme.spacing.unit*2,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 4,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 5,
    fontSize:18,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  select: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '30%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  selectTitle: {
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  inputOption:{
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit ,
    fontSize:15,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class PrimarySearchAppBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        anchorEl: null,
        mobileMoreAnchorEl: null,
      };
  }
  componentWillMount(){

    const {loadLocationAction,loadServiceTypeAction}=this.props;
    loadLocationAction();
    loadServiceTypeAction();
  }
  handleFilterChange(obj){
    const {setServiceFilterAction}=this.props;
    setServiceFilterAction(obj)
  }

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };
  renderLocationFilter(){
    const {classes,locations}=this.props;
    const current=this.props.filter.location;
    return(
      <div>
      <Typography className={classes.selectTitle} variant="h6" color="inherit" noWrap>
        Địa điểm
      </Typography>
    <Select
      name='location'
      native
      className={classes.select}
      value={current}
      onChange={e=>this.handleFilterChange({location:e.target.value})}
      input={
        <InputBase
          classes={{
            root: classes.inputRoot,
            input: classes.inputOption,
          }}
        />
      }
    >
    {
      [(<option value="" style={{color: 'black'}} key={0}>All</option>)].concat(locations.map((item,index)=>{
      return(
        <option value={item.name} key={index+1} style={{color:'black'}}>{item.name}</option>
      )
    }))
    }
    </Select>
      </div>
    )
  }
  handleLogout(){
    const {cookies,logoutAction}=this.props;
    const email=cookies.get('email');
    cookies.remove('user_id',{path:'/'});
    cookies.remove('token',{path:'/'});
    window.location.reload()
  }
  renderUserPanel(){
    const { anchorEl } = this.state;
    const { login } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isLogin=login.token!=null;

    if(!isLogin)
      return(
        <div>
        <Button
            color="inherit"
            style={{fontSize: 16}}
            onClick={()=>this.props.history.push("/SignIn")}
            >
          Sign In
        </Button>
          <Button
            color="inherit"
            style={{fontSize: 16}}
            onClick={()=>this.props.history.push("/SignUp")}
            >
            Sign Up
          </Button>
        </div>
      )
    return(
      <div>
      <IconButton
        aria-owns={isMenuOpen ? 'material-appbar':undefined }
        aria-haspopup="true"
        onClick={this.handleProfileMenuOpen}
        color="inherit"
      >
        <Avatar src={login.user.avatar} style={{height: 45,width:45,marginRight: 10}} />{`${login.user.firstname} ${login.user.lastname}`}
      </IconButton>
      </div>
    )
  }
  renderServiceType(){
    const {classes,service_types}=this.props;
    const current=this.props.filter.service_type;
    return(
      <div>
      <Typography className={classes.selectTitle} variant="h6" color="inherit" noWrap>
        Loại dịch vụ:
      </Typography>
    <Select
      name='type'
      native
      className={classes.select}
      value={current}
      onChange={e=>this.handleFilterChange({service_type:e.target.value})}
      input={
        <InputBase
          classes={{
            root: classes.inputRoot,
            input: classes.inputOption,
          }}
        />
      }
    >
    {
      [(<option value="" style={{color: 'black'}} key={0}>All</option>)].concat(service_types.map((item,index)=>{
      return(
        <option value={item.name} key={index+1} style={{color:'black'}}>{item.name}</option>
      )
    }))
    }
    </Select>
      </div>
    )
  }
  render() {

    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes,logoutAction } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={()=>this.props.history.push("/user_profile")} style={{fontSize: 16}}>Profile</MenuItem>
        <MenuItem onClick={()=>this.handleLogout()} style={{fontSize:16}}>Log out</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );
    const { history}=this.props;
    const {key_word,location,service_type}=this.props.filter;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Button onClick={()=>this.props.history.push("/")} color="inherit" >
            <Typography className={classes.title} variant="h3" color="inherit" noWrap >
              SERVICY
            </Typography>
            </Button>
            {this.renderLocationFilter()}
            {this.renderServiceType()}
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                name='keyword'
                placeholder="Search…"
                defaultValue={this.props.filter.key_word}
                onChange={e=>this.handleFilterChange({key_word:e.target.value})}
                onKeyDown={e=>console.log(e.keyCode===13)}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            <Button
              className={classes.search}
              style={{backgroundColor: 'white',fontWeight: '600'}}
              onClick={()=>history.push({pathname:'/search',search:`?location=${location}&keyword=${key_word}&type=${service_type}`})}
              >
              Search
            </Button>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {this.renderUserPanel()}
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps=(state,ownProps)=>{
  return{
    login: state.login,
    service_types: state.services.types,
    locations: state.locations,
    filter: state.services.filter
  }
}
const mapDispatchToProps={
  loadLocationAction,
  loadServiceTypeAction,
  setServiceFilterAction,
  logoutAction
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withStyles(styles)(PrimarySearchAppBar)));
