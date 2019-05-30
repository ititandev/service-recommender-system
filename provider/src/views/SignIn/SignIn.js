import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios'
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
const hist = createBrowserHistory();
const styles = theme => ({
  progress: {
    margin: 1
  },
  main: {
    width: 'auto',
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

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      submitted: false,
      user: '',
    }
    this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(e) {
    const { name, value } = e.target;
    console.log(name, value);
    this.setState({ [name]: value });
  }
  handleSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    axios.post(`https://servicy.herokuapp.com/login`, { email, password })
      .then(res => {
        console.log(res);
        console.log(res.data);
        const submitted = true;
        const user = res.data.data;
        this.setState({ submitted, user })
      })
  }
  render() {
    const { classes } = this.props;
    const { email, password } = this.state;
    if (!this.state.submitted) {
      return (
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
          </Typography>
            <form onSubmit={this.handleSubmit} className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email" style={{ fontSize: 18 }}>Email Address</InputLabel>
                <Input
                  id="email"
                  name="email"
                  type='text'
                  autoComplete="email"
                  autoFocus
                  style={{ fontSize: 18 }}
                  onChange={this.handleChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password" style={{ fontSize: 18 }}>Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  style={{ fontSize: 18 }}
                  onChange={this.handleChange}
                />
              </FormControl>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                style={{ fontSize: 18 }}
                type="submit"
                className={classes.submit}
              >
                {'Sign in '}
              </Button>
            </form>
          </Paper>
        </main>
      );
    }
    return (
      <Router history={hist}>
        <Switch>
          <Redirect from="/*" to="/provider/dashboard" />
        </Switch>
      </Router>
    )
  }

}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default
  withStyles(styles)(SignIn);

