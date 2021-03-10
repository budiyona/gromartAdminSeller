import { Button, Grid, Link, TextField, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { Menu, PaginationControlled, ProductCard } from "../../component";
import axios from "axios";
import moment from "moment";
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
  menuprofile: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
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

      errorFullname: false,
      errorPhone: false,
      errorEmail: false,
      errorPassword: false,
      errorRepassword: false,
    };
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
      case "password":
        this.validationPassword(value);
        break;
      default:
        this.validationRepassword(value);
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
    const patterPhone = new RegExp("[0-9]{9,12}");
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
    const patternEmail = new RegExp(
      "^[a-zA-Z0-9-_]+@[a-zA-Z0-9]+\\.[a-zA-Z]{2,}$"
    );
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
    const { password } = this.state;
    if (password === repassword) {
      this.setState({
        errorRepassword: false,
      });
    } else {
      this.setState({
        errorRepassword: true,
      });
    }
  };
  doEditProfile = (e) => {
    e.preventDefault();
    const { fullname, phone, email, password } = this.state;
    let date = moment(new Date()).format("YYYY-MM-DD HH:MM:SS");
    let user = {
      userName: fullname,
      phone: phone,
      email: email,
      password: password,
      createdDate: date,
      updateDate: date,
    };
    axios
      .post("http://localhost:8080/api/user", user)
      .then((res) => {
        res.status === 200 && this.props.history.push("/login");
      })
      .catch((e) => {
        if (e.response !== undefined) {
          alert(e.response.data);
        }
      });

    console.log("Register", date, user);
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
        <Grid container item xs={12} className={classes.margin}>
          <Grid container item xs={12} className={classes.menuprofile}>
            <Button
              size="small"
              type="submit"
              variant="contained"
              color={edit ? "" : "primary"}
              className={classes.submit}
              onClick={this.toogleEdit}
            >
              edit
            </Button>
            <Button
              type="submit"
              size="small"
              variant="contained"
              color={editPassword ? "" : "secondary"}
              className={classes.submit}
              onClick={this.toogleEditPassword}
            >
              change password
            </Button>
          </Grid>
          {!editPassword ? (
            <Grid container item xs={6} className={classes.margin}>
              <form
                className={classes.form}
                noValidate
                onSubmit={this.doEditProfile}
              >
                <Grid item>
                  <TextField
                    size="small"
                    margin="normal"
                    autoComplete="fname"
                    name="fullname"
                    required
                    fullWidth
                    id="fullname"
                    label="Name"
                    autoFocus
                    onChange={(e) => this.setValue(e)}
                    error={errorFullname}
                    helperText={
                      errorFullname
                        ? "name cannot be number or special character"
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
                    id="phone"
                    label="phone"
                    name="phone"
                    autoComplete="phone"
                    onChange={(e) => this.setValue(e)}
                    error={errorPhone}
                    helperText={
                      errorPhone ? "minimum 8 number and cannot be letter" : ""
                    }
                  />
                </Grid>
                <Grid item>
                  <TextField
                    margin="dense"
                    size="small"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => this.setValue(e)}
                    error={errorEmail}
                    helperText={errorEmail ? "incorrect email format" : ""}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    margin="dense"
                    size="small"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => this.setValue(e)}
                    error={errorPassword}
                    helperText={
                      errorPassword
                        ? "minimum 8 character, at least one number"
                        : ""
                    }
                  />
                </Grid>

                {edit && (
                  <Grid item>
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
                  </Grid>
                )}
              </form>
            </Grid>
          ) : (
            <Grid container item xs={6} className={classes.margin}>
              <form
                className={classes.form}
                noValidate
                onSubmit={this.doEditProfile}
              >
                <Grid item>
                  <TextField
                    size="small"
                    margin="normal"
                    autoComplete="fname"
                    name="fullname"
                    required
                    fullWidth
                    id="fullname"
                    label="Password"
                    autoFocus
                    onChange={(e) => this.setValue(e)}
                    error={errorFullname}
                    helperText={
                      errorFullname
                        ? "name cannot be number or special character"
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
                    name="Newpassword"
                    label="New Password"
                    type="password"
                    id="Newpassword"
                    autoComplete="current-password"
                    onChange={(e) => this.setValue(e)}
                    error={errorPassword}
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
                    name="NewPassword2"
                    label="Re Enter Password"
                    type="password"
                    id="NewPassword2"
                    autoComplete="current-password"
                    onChange={(e) => this.setValue(e)}
                    error={errorPassword}
                    helperText={
                      errorPassword
                        ? "minimum 8 character, at least one number"
                        : ""
                    }
                  />
                </Grid>

                {editPassword && (
                  <Grid item>
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
                  </Grid>
                )}
              </form>
            </Grid>
          )}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(SellerAccount);
