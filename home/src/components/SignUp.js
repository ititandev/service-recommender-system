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
import MyFooter from './MyFooter'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {connect} from 'react-redux';
import {STATUS } from '../redux/actions'
import CircularProgress from '@material-ui/core/CircularProgress';
import { withRouter } from "react-router-dom";
import Warning from './Warning'
import axios from 'axios'
import {root} from '../config'
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

class  SignUp extends React.Component{
  constructor(props){
     super(props);
     this.state={
       email:'',
       password:'',
       repassword:'',
       firstname:'',
       lastname:'',
       phone:'',
       avatar:'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png',
       status:STATUS.NOT_SEND,
       error:'',
       open:false
     }
   }
   handleClickOpen = () => {
     this.setState({open: true });
   };

   handleClose = () => {
     this.setState({ open: false });
   };
   sendSignUp(){
     if(this.state.password!==this.state.repassword){
       this.setState({
         status:STATUS.NOT_SEND,
         error:"Password not match!"
       })
     }
     else{
       this.setState({
         ...this.state,
         status:STATUS.SENDING
       })
       const {email,password,firstname,lastname,phone,avatar}=this.state;
       axios.post(`${root}/signup`,{
         email,password,firstname,lastname,phone,avatar
       }).then(response=>{
         const {data}=response;
         if(data.success){
           this.setState({
             ...this.state,
             status:STATUS.FINISHED,
             open:true,
             error:''
           })
       } else {
         this.setState({
           ...this.state,
           status:STATUS.NOT_SEND,
           error:data.message
         })
       }
       })
       .catch(err=>console.log(err));
     }

   }
  render(){
    const { classes} = this.props;
    if(this.state.status===STATUS.FINISHED&&this.state.error===''){
      const {location,history}=this.props;
      const {state}=location;
      if(state===undefined)
        history.push("/");
      else
      history.push(location.state.from.pathname+location.state.from.search)
    }
    return (
      <div style={{backgroundImage: `url(${require('../images/bg.jpg')})`,backgroundSize: 'cover', backgroundPosition: 'center center',height: '100%'}}>
        <CssBaseline />
        <MyAppBar />
        <Paper className={classes.paper} style={{backgroundColor: 'white',marginBottom: 20,width: '35%'}}>
          <Typography component="h3" variant="h3">
            Sign Up
          </Typography>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>

          <form className={classes.form} >
            <div style={{display: 'flex',flexDirection: 'row',alignItems: 'center',margin: 10}}>
              <Typography style={{fontSize: 15,flex:1, fontWeight: 'bold'}}>First Name</Typography>
              <TextField
                  id="firstname"
                  name="firstname"
                  autoComplete="firstname"
                  variant='outlined'
                  autoFocus
                  inputProps={{
                    style:{fontSize:15}
                  }}
                  style={{fontSize: 15,flex:3, width: "50%",marginLeft: 'auto',marginRight: 'auto',display: 'flex'}}
                  disabled={this.state.status===STATUS.SENDING}
                  onChange={e=>this.setState({...this.state,firstname: e.target.value})}
                  />
              </div>
            <div style={{display: 'flex',flexDirection: 'row',alignItems: 'center',margin: 10}}>
              <Typography style={{fontSize: 15,flex:1, fontWeight: 'bold'}}>Last Name</Typography>
              <TextField
                name="lastname"
                variant='outlined'
                id="lastname"
                inputProps={{
                  style:{fontSize:15}
                }}
                autoComplete="current-password"
                style={{flex:3,fontSize: 15, width: "50%",marginLeft: 'auto',marginRight: 'auto',display: 'flex'}}
                disabled={this.state.status===STATUS.SENDING}
                onChange={e=> this.setState({...this.state,lastname: e.target.value})}
                />
            </div>
            <div style={{display: 'flex',flexDirection: 'row',alignItems: 'center',margin: 10}}>
              <Typography style={{fontSize: 15,flex:1, fontWeight: 'bold'}}>Phone</Typography>
              <TextField
                name="phone"
                variant='outlined'
                id="phone"
                type='number'
                inputProps={{
                  style:{fontSize:15}
                }}
                autoComplete="current-password"
                style={{flex:3,fontSize: 15, width: "50%",marginLeft: 'auto',marginRight: 'auto',display: 'flex'}}
                disabled={this.state.status===STATUS.SENDING}
                onChange={e=> this.setState({...this.state,phone: e.target.value})}
                />
            </div>
            <div style={{display: 'flex',flexDirection: 'row',alignItems: 'center',margin: 10}}>
              <Typography style={{fontSize: 15,flex:1, fontWeight: 'bold'}}>Email</Typography>
              <TextField
                name="email"
                variant='outlined'
                id="email"
                inputProps={{
                  style:{fontSize:15}
                }}
                autoComplete="current-password"
                style={{flex:3,fontSize: 15, width: "50%",marginLeft: 'auto',marginRight: 'auto',display: 'flex'}}
                disabled={this.state.status===STATUS.SENDING}
                onChange={e=> this.setState({...this.state,email: e.target.value})}
                />
            </div>
            <div style={{display: 'flex',flexDirection: 'row',alignItems: 'center',margin: 10}}>
              <Typography style={{fontSize: 15,flex:1, fontWeight: 'bold'}}>Password</Typography>
              <TextField
                name="password"
                variant='outlined'
                id="password"
                type="password"
                inputProps={{
                  style:{fontSize:15}
                }}
                autoComplete="current-password"
                style={{flex:3,fontSize: 15, width: "50%",marginLeft: 'auto',marginRight: 'auto',display: 'flex'}}
                disabled={this.state.status===STATUS.SENDING}
                onChange={e=> this.setState({...this.state,password: e.target.value})}
                />
            </div>
            <div style={{display: 'flex',flexDirection: 'row',alignItems: 'center',margin: 10}}>
              <Typography style={{fontSize: 15,flex:1, fontWeight: 'bold'}}>Re-Password</Typography>
              <TextField
                name="repassword"
                variant='outlined'
                id="repassword"
                type="password"
                inputProps={{
                  style:{fontSize:15}
                }}
                autoComplete="current-password"
                style={{flex:3,fontSize: 15, width: "50%",marginLeft: 'auto',marginRight: 'auto',display: 'flex'}}
                disabled={this.state.status===STATUS.SENDING}
                onChange={e=> this.setState({...this.state,repassword: e.target.value})}
                />
            </div>
            {this.state.error!==''?<Warning open={true} type="error" message={this.state.error} style={{display: 'flex',marginLeft:'auto',marginRight: 'auto',width:'100%'}}/>:<div />}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              style={{fontSize: 15, width: "50%",marginLeft: 'auto',marginRight: 'auto',display: 'flex'}}
              className={classes.submit}
              disabled={this.state.status===STATUS.SENDING}
              onClick={()=>this.sendSignUp()}
            >
             {this.state.status===STATUS.SENDING?(<CircularProgress className={classes.progress} color="secondary" />):null
           }

              {'Sign up '}
            </Button>
          </form>
        </Paper>
        <MyFooter />
      </div>
    );
  }

}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps=state=>{
  return{

  }
}
const mapDispatchToProps={
}
export default connect(mapStateToProps,mapDispatchToProps)(
  withRouter((withStyles(styles)(SignUp))));
