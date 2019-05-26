import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Utils from '../Utils';

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
    state = {
        email: "",
        password: "",
        loginSuccess: false,
    }
    handleClickLogin = () => {
        if (this.state.email === "" || this.state.password === "") {
        } else {
            const email = this.state.email
            const password = this.state.password
            console.log(`email: ${email}, password: ${password}`)
            axios({
                method: 'post',
                url: `${Utils.BASE_URL}/login`,
                data: {
                    email: email,
                    password: password,
                }
            })
                .then(response => {
                    if (response.data.success) {
                        Utils.cookies.set('isLogin', "true", { path: '/' });
                        Utils.cookies.set('token', response.data.data.token, { path: '/' });
                        Utils.cookies.set('user', response.data.data.user, { path: '/' });
                        Utils.state = {
                            token: response.data.data.token,
                            user: response.data.data.user,
                        }
                        this.setState({
                            ...this.state,
                            loginSuccess: true,
                        })
                        console.log(`login success with msg: ${response.data.message}`);
                    } else {
                        console.log(`login fail with error msg: ${response.data.message}`);
                    }
                }).catch(function (error) {
                    console.log(error);
                });
        }
    }
    render() {
        const { classes } = this.props;
        return (Utils.cookies.get('isLogin') === "true" || this.state.loginSuccess) ?
            <Redirect to={{
                pathname: "/admin/profile",
            }} />
            :
            (
                <main className={classes.main}>
                    <CssBaseline />
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
          </Typography>
                        <form className={classes.form}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email" style={{ fontSize: 18 }}>Email Address</InputLabel>
                                <Input
                                    id="email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    style={{ fontSize: 18 }}
                                    onChange={event => {
                                        this.setState({
                                            ...this.state,
                                            email: event.target.value
                                        })
                                    }}
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
                                    onChange={event => {
                                        this.setState({
                                            ...this.state,
                                            password: event.target.value
                                        })
                                    }}
                                />
                            </FormControl>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                style={{ fontSize: 18 }}
                                className={classes.submit}
                                onClick={this.handleClickLogin}
                            >
                                {'Sign in '}
                            </Button>
                        </form>
                    </Paper>
                </main>
            )
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default
    withStyles(styles)(SignIn);