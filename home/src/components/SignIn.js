import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import MyAppBar from './SimpleAppBar'
import TextField from '@material-ui/core/TextField'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {connect} from 'react-redux';
import {loginAction,STATUS } from '../redux/actions'
import CircularProgress from '@material-ui/core/CircularProgress';
import {  withRouter } from "react-router-dom";
import Link from '@material-ui/core/Link'
import Warning from './Warning'
import MyFooter from './MyFooter'
const styles = theme => ({
  progress: {
    margin: 1
  },
  main: {
    width: '100%',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    width:'80%',
    marginLeft:'auto',
    marginRight:'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class  SignIn extends React.Component{
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:''
    }
  }
  sendLogin(){
    const {username,password}=this.state;
    const {loginAction}=this.props;
    loginAction(username,password);
  }
  render(){
    const { classes, login,cookies} = this.props;
    if(cookies.get('token')){
      this.props.history.push("/")
    }
    if(login.status===STATUS.FINISHED&&login.error===''){
      const cookies=this.props.cookies;
      cookies.set('token',login.token,{path:'/'})
      cookies.set('user_id',login.user._id,{path:'/'})
      const {location,history}=this.props;
      const {state}=location;
      if(state===undefined)
        history.push("/");
      else
      history.push(state)
    }
    return (
      <div style={{backgroundImage: `url(${require('../images/bg.jpg')})`,backgroundSize: 'cover', backgroundPosition: 'center center',height: '100%'}}>
        <CssBaseline />
        <MyAppBar />
        <Paper className={classes.paper} style={{backgroundColor: 'white',marginBottom: 20,width: '35%'}}>


          <Typography component="h3" variant="h3" style={{margin: 20}}>
            Sign In
          </Typography>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>

          <form className={classes.form} >
            <div style={{display: 'flex',flexDirection: 'row',alignItems: 'center',margin: 10}}>
              <Typography style={{fontSize: 15,flex:1, fontWeight: 'bold'}}>Email</Typography>
              <TextField
                  id="email"
                  name="email"
                  autoComplete="email"
                  variant='outlined'
                  autoFocus
                  inputProps={{
                    style:{fontSize:18}
                  }}
                  style={{fontSize: 15,flex:3, width: "50%",marginLeft: 'auto',marginRight: 'auto',display: 'flex'}}
                  disabled={this.props.login.status===STATUS.SENDING}
                  onChange={e=>this.setState({...this.state,username: e.target.value})}
                  />
              </div>
            <div style={{display: 'flex',flexDirection: 'row',alignItems: 'center',margin: 10}}>
              <Typography style={{fontSize: 15,flex:1, fontWeight: 'bold'}}>Password</Typography>
              <TextField
                name="password"
                type="password"
                variant='outlined'
                id="password"
                inputProps={{
                  style:{fontSize:15}
                }}
                autoComplete="current-password"
                style={{flex:3,fontSize: 18, width: "50%",marginLeft: 'auto',marginRight: 'auto',display: 'flex'}}
                disabled={this.props.login.status===STATUS.SENDING}
                onChange={e=> this.setState({...this.state,password: e.target.value})}
                />
            </div>
            <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'center',alignItems: 'center'}}>
            {this.props.login.error!==''&&this.state.username!==''?<Warning open={true} type="error" message={this.props.login.error} style={{display: 'flex',marginLeft:'auto',marginRight: 'auto',width:'100%'}}/>:<div />}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              style={{fontSize: 18, width: "50%",marginLeft: 'auto',marginRight: 'auto',display: 'flex'}}
              className={classes.submit}
              disabled={this.props.login.status===STATUS.SENDING}
              onClick={()=>this.sendLogin()}
            >
             {this.props.login.status===STATUS.SENDING?(<CircularProgress className={classes.progress} color="secondary" />):null
           }

              {'Sign In '}
            </Button>
            <div style={{display: 'flex',flexDirection: 'column',alignItems: 'flex-start',justifyContent: 'center'}}>
              <Link href='/provider/' style={{fontSize: 16,margin:10}}>
                Sign In as Provider
              </Link>

              <Link href='/admin' style={{fontSize: 16}}>
                Sign In as Admin
              </Link>
            </div>

            </div>
          </form>
        </Paper>
      <MyFooter />
      </div>
    );
  }

}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps=state=>{
  return{
    login: state.login,

  }
}
const mapDispatchToProps={
  loginAction,
}
export default connect(mapStateToProps,mapDispatchToProps)(
  withRouter((withStyles(styles)(SignIn))));
