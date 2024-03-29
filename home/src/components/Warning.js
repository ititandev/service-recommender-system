import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles1=theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    fontSize:18
  },
});

class  SnackbarWrapper extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    const {classes}=this.props;
    const { className, message, onClose, variant, ...other } = this.props;
    const Icon = variantIcon[variant];
    return (
      <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
        <Icon className={clsx(classes.icon, classes.iconVariant)} />
        {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
        <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
      />
    );
  }
}

const CustomSnackbar=withStyles(styles1)(SnackbarWrapper);

SnackbarWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit,
    marginLeft:'auto',
    marginRight:'auto'
  },
});

class Warning extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    const {classes, message, type, open,style,vertical,horizontal} = this.props;
    if(!open)
    return (<div/>)
    return (
      <CustomSnackbar
        style={style}
        variant={type?type:"success"}
        message={message?message:"This is a success message!"}
        anchorOrigin={{ vertical, horizontal}}
      />
    );
  }

}

export default withStyles(styles2)(Warning);
