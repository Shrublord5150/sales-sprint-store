import React from "react";
// import './CreateAccountModal.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import API from "../../../utils/API";


export default class FormDialog extends React.Component {
  state = {
    open: false,
    username: "",
    email: "",
    password: "",
    user: [],
    redirect:false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.username && this.state.email && this.state.password) {
      API.saveUser({
        username: this.state.username,  
        email: this.state.email,
        password: this.state.password,
      })
      .then(console.log("saving user"))
      .then(this.handleClose)
      
      .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div>
        <Button variant="outlined" color="secondary" onClick={this.handleClickOpen}>
          Create an Account
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          className="Modal-window-bg-color"
        >
          <DialogTitle id="form-dialog-title" className="Modal-title-color">Create an account</DialogTitle>
          <DialogContent className="Modal-body-color">
            <DialogContentText>
              
            </DialogContentText>
            <TextField
              className="Modal-field-color"
              autoFocus
              margin="dense"
              id="name"
              value={this.state.username}
              onChange={this.handleInputChange}
              label="Username"
              type="text"
              fullWidth
              placeholder="Username (required)"
              name="username"
            />
            <TextField
              className="Modal-field-color"
              autoFocus
              margin="dense"
              id="name"
              value={this.state.email}
              onChange={this.handleInputChange}
              label="Email Address"
              type="email"
              fullWidth
              name="email"
            />
            <TextField
              className="Modal-field-color"
              autoFocus
              margin="dense"
              id="name"
              value={this.state.password}
              onChange={this.handleInputChange}
              label="Password"
              type="password"
              fullWidth
              placeholder="Password"
              name="password"
            />
          </DialogContent>
          <DialogActions className="Modal-title-color">
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleFormSubmit} color="primary" type="submit">
              Register
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}