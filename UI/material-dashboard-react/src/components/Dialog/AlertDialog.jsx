import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AlertDialog extends React.Component {
  state = {
    open: true,
  };

  handleConfirm = () => {
    this.setState({ open: false });
    this.props.handleConfirm()
  };

  handleCancel = () => {
    this.setState({ open: false });
    this.props.handleCancel()
  };

  render() {
    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {this.props.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Hủy
          </Button>
          <Button onClick={this.handleConfirm} color="primary" autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default AlertDialog;