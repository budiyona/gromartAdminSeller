import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  TextField,
  withStyles,
} from "@material-ui/core";
import React, { Component } from "react";
import { Menu } from "../../component";
import axios from "axios";
import { connect } from "react-redux";
const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    margin: "auto",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  // menuprofile: {
  //   "& > *": {
  //     margin: theme.spacing(1),
  //   },
  // },
});
class SellerAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      editPassword: false,

      fullname: "",
      phone: "",
      email: "",
      password: "",

      oldPassword: "",
      newPassword: "",
      newPassword2: "",

      errorFullname: false,
      errorPhone: false,
      errorEmail: false,
      errorPassword: false,
      errorRepassword: false,

      modal: false,
    };
  }
  componentDidMount() {
    this.getUser();
  }
  setValue = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
    switch (name) {
      case "fullname":
        this.validationFullname(value);
        break;
      case "phone":
        this.validationPhone(value);
        break;
      case "email":
        this.validationEmail(value);
        break;
      case "newPassword":
        this.validationPassword(value);
        break;
      case "newPpassword2":
        this.validationRepassword(value);
        break;
      default:
        break;
    }
  };
  validationFullname = (fullname) => {
    const patterFullname = new RegExp("^(?![ .]+$)[a-zA-Z .]*$");
    let valid = patterFullname.test(fullname);
    if (valid) {
      this.setState({
        errorFullname: false,
      });
    } else {
      this.setState({
        errorFullname: true,
      });
    }
  };
  validationPhone = (phone) => {
    const patterPhone = new RegExp("^(^\\+62|62|^08)(\\d{3,4}-?){2}\\d{3,4}$");
    let valid = patterPhone.test(phone);
    if (valid) {
      this.setState({
        errorPhone: false,
      });
    } else {
      this.setState({
        errorPhone: true,
      });
    }
  };
  validationEmail = (email) => {
    const patternEmail = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
    let valid = patternEmail.test(email);
    if (valid) {
      this.setState({
        errorEmail: false,
      });
    } else {
      this.setState({
        errorEmail: true,
      });
    }
  };
  validationPassword = (password) => {
    const patternPassword = new RegExp(
      "^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{8,}$"
    );
    let valid = patternPassword.test(password);
    if (valid) {
      this.setState({
        errorPassword: false,
      });
    } else {
      this.setState({
        errorPassword: true,
      });
    }
  };
  validationRepassword = (repassword) => {
    const { newPassword } = this.state;
    if (newPassword === repassword) {
      this.setState({
        errorRepassword: false,
      });
    } else {
      this.setState({
        errorRepassword: true,
      });
    }
  };
  doEditProfile = () => {
    const { fullname, phone, email, password } = this.state;
    const { user } = this.props;
    // let date = moment(new Date()).format("YYYY-MM-DD HH:MM:SS");
    let userUpdate = {
      userName: fullname,
      phone: phone,
      email: email,
      password: password,
    };
    axios
      .put("http://localhost:8080/api/user/" + user.userCode, userUpdate)
      .then((res) => {
        // res.status === 200 && this.props.history.push("/login");
        res.status === 200 && alert("Update Success");
      })
      .catch((e) => {
        if (e.response !== undefined) {
          alert(e.response.data);
        }
      });

    this.setState({
      modal: false,
    });
  };
  toogleEdit = () => {
    this.setState({
      edit: !this.state.edit,
    });
  };
  toogleEditPassword = () => {
    this.setState({
      editPassword: !this.state.editPassword,
    });
  };
  getUser = () => {
    const { user } = this.props;
    axios.get("http://localhost:8080/api/user/" + user.userCode).then((res) => {
      const { userName, phone, email } = res.data;
      this.setState({ fullname: userName, phone, email });
    });
  };
  toggleModal = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  openModal = (e) => {
    e.preventDefault();
    this.toggleModal();
  };
  changePassword = (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, newPassword2 } = this.state;
    const { user } = this.props;
    if (oldPassword.length <= 0) {
      alert("old password cannot be empty");
    }
    if (window.confirm("are you sure to change the password")) {
      console.log("doChange Password");
      axios
        .put(
          "http://localhost:8080/api//user/change-password?id=" +
            user.userCode +
            "&oldPassword=" +
            oldPassword +
            "&newPassword=" +
            newPassword +
            "&newPassword2=" +
            newPassword2
        )
        .then((res) => {
          res.status === 200 && alert("Update Success");
        })
        .catch((e) => {
          if (e.response !== undefined) {
            alert(e.response.data);
          }
        });
    }
    // console.log(oldPassword, newPassword, newPassword2);
  };
  cancelAction = () => {
    this.setState({
      edit: false,
      editPassword: false,
    });
  };
  render() {
    const { buttonAdminStat, history, toogleMenu, classes } = this.props;
    const {
      errorEmail,
      errorFullname,
      errorPassword,
      errorRepassword,
      errorPhone,
      edit,
      editPassword,
      oldPassword,
      newPassword,
      newPassword2,
      fullname,
      phone,
      email,
      modal,
    } = this.state;
    return (
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid container item xs={12}>
          <Menu
            history={history}
            toogleMenu={toogleMenu}
            buttonAdminStat={buttonAdminStat}
          ></Menu>
        </Grid>
        <Grid container item xs={12}>
          <Grid container item xs={12}>
            <Grid item xs={4}>
              <ButtonGroup>
                <Button
                  disabled={editPassword || edit}
                  size="small"
                  type="submit"
                  style={{ width: 100 }}
                  variant="contained"
                  color="primary"
                  onClick={this.toogleEdit}
                >
                  edit
                </Button>
                <Button
                  disabled={editPassword || edit}
                  type="submit"
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={this.toogleEditPassword}
                >
                  change password
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid>
              {(edit || editPassword) && (
                <Button
                  type="submit"
                  size="small"
                  color="primary"
                  variant="contained"
                  disableElevation
                  startIcon={<ErrorOutlineIcon />}
                  style={{
                    width: 500,
                    pointerEvents: "none",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    color: "orange",
                  }}
                >
                  {edit ? "Edit Profile" : "Edit Password"} - Mode
                </Button>
              )}
            </Grid>
          </Grid>
          {!editPassword ? (
            <Grid container item xs={12} className={classes.margin}>
              <Paper
                elevation={3}
                style={{
                  marginTop: "10px",
                  width: "100%",
                  minHeight: "70vh",
                  padding: "10px",
                  backgroundColor: "rgba(255,255,255,0.7)",
                }}
              >
                <form
                  className={classes.form}
                  onSubmit={this.openModal}
                  style={{ width: "50%" }}
                >
                  <Grid item>
                    <TextField
                      InputProps={{
                        readOnly: !edit,
                      }}
                      // disabled
                      size="small"
                      margin="normal"
                      name="fullname"
                      required
                      fullWidth
                      label="Name"
                      value={fullname}
                      onChange={(e) => this.setValue(e)}
                      error={edit && errorFullname}
                      helperText={
                        edit && errorFullname
                          ? "name cannot be number or special character"
                          : ""
                      }
                    />
                  </Grid>

                  <Grid item>
                    <TextField
                      InputProps={{
                        readOnly: !edit,
                      }}
                      margin="dense"
                      size="small"
                      required
                      fullWidth
                      label="phone"
                      value={phone}
                      name="phone"
                      autoComplete="phone"
                      onChange={(e) => this.setValue(e)}
                      error={errorPhone}
                      helperText={
                        errorPhone
                          ? "minimum 8 number and cannot be letter"
                          : ""
                      }
                    />
                  </Grid>

                  <Grid item>
                    <TextField
                      InputProps={{
                        readOnly: !edit,
                      }}
                      margin="dense"
                      size="small"
                      required
                      fullWidth
                      value={email}
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={(e) => this.setValue(e)}
                      error={errorEmail}
                      helperText={errorEmail ? "incorrect email format" : ""}
                    />
                  </Grid>

                  {edit && (
                    <Grid item>
                      <ButtonGroup fullWidth>
                        <Button
                          type="submit"
                          fullWidth
                          hidden={true}
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                        >
                          save
                        </Button>
                        <Button
                          fullWidth
                          variant="contained"
                          color="secondary"
                          className={classes.submit}
                          onClick={this.cancelAction}
                        >
                          cancel
                        </Button>
                      </ButtonGroup>
                    </Grid>
                  )}
                </form>
              </Paper>
              <Dialog
                open={modal}
                onClose={() => {
                  this.setState({ modal: false });
                }}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">
                  Confirm Password
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    enter your password to change the profile
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    name="password"
                    type="password"
                    onChange={(e) => this.setValue(e)}
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.toggleModal} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={this.doEditProfile} color="primary">
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          ) : (
            <Grid container item xs={12} className={classes.margin}>
              <Paper
                elevation={3}
                style={{
                  marginTop: "10px",
                  width: "100%",
                  minHeight: "70vh",
                  padding: "10px",
                  backgroundColor: "rgba(255,255,255,0.7)",
                }}
              >
                <form
                  className={classes.form}
                  onSubmit={this.changePassword}
                  style={{ width: "50%" }}
                >
                  <Grid item>
                    <TextField
                      size="small"
                      margin="normal"
                      name="oldPassword"
                      required
                      fullWidth
                      value={oldPassword}
                      id="oldPassord"
                      label="Old Password"
                      type="password"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => this.setValue(e)}
                    />
                  </Grid>

                  <Grid item>
                    <TextField
                      margin="dense"
                      size="small"
                      required
                      fullWidth
                      value={newPassword}
                      name="newPassword"
                      label="New Password"
                      type="password"
                      id="Newpassword"
                      onChange={(e) => this.setValue(e)}
                      error={errorPassword}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      helperText={
                        errorPassword
                          ? "minimum 8 character, at least one number"
                          : ""
                      }
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      margin="dense"
                      size="small"
                      required
                      fullWidth
                      value={newPassword2}
                      name="newPassword2"
                      label="Re Enter Password"
                      type="password"
                      id="NewPassword2"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => this.setValue(e)}
                      error={errorRepassword}
                      helperText={
                        errorRepassword ? "password did not match" : ""
                      }
                    />
                  </Grid>

                  {editPassword && (
                    <Grid item>
                      <ButtonGroup fullWidth>
                        <Button
                          type="submit"
                          fullWidth
                          hidden={true}
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                        >
                          change password
                        </Button>
                        <Button
                          fullWidth
                          variant="contained"
                          color="secondary"
                          className={classes.submit}
                          onClick={this.cancelAction}
                        >
                          cancel
                        </Button>
                      </ButtonGroup>
                    </Grid>
                  )}
                </form>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Grid>
    );
  }
}
const mapStateToProps = (state) => {
  const { isLogin, user } = state.auth;
  return {
    isLogin: isLogin,
    user: user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doLogin: (payload) => dispatch({ type: "LOGIN", payload }),
    doLogout: () => dispatch({ type: "LOGOUT" }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(SellerAccount));
