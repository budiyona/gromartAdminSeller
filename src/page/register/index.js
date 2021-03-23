import React, { Component } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Copyright } from "../../component";
import axios from "axios";
import moment from "moment";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { Alert } from "@material-ui/lab";
const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(1, 3, 1, 3),
    borderRadius: 20,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
});

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      phone: "",
      email: "",
      password: "",

      errorFullname: false,
      errorPhone: false,
      errorEmail: false,
      errorPassword: false,
      errorRepassword: false,

      errorMsg: "",
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
        errorMsg: "name cannot be number or special character",
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
        errorMsg: "minimum 8 number and cannot be letter",
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
        errorMsg: "incorrect email format",
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
        errorMsg: "minimum 8 character, at least one number",
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
        errorMsg: "password did not match",
      });
    }
  };
  doRegister = (e) => {
    e.preventDefault();
    const { fullname, phone, email, password } = this.state;
    let user = {
      userName: fullname,
      phone: phone,
      email: email,
      password: password,
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
  };
  render() {
    const { classes, isLogin, user } = this.props;
    const {
      errorEmail,
      errorFullname,
      errorPassword,
      errorRepassword,
      errorPhone,
      errorMsg,
    } = this.state;
    if (isLogin) {
      if (user.userCode.includes("ADMIN")) {
        return <Redirect to="/admin/home" />;
      }
      return <Redirect to="/seller/home" />;
    }
    let error = () => {
      return (
        errorEmail ||
        errorFullname ||
        errorPassword ||
        errorRepassword ||
        errorPhone
      );
    };
    return (
      <Container component="main" maxWidth="xs">
        <Paper elevation={3}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h5" variant="h5">
              Register
            </Typography>

            {error() ? (
              <Box style={{ height: "10px" }} mt={2}>
                <Typography variant="caption" color="error" align="center">
                  {errorMsg}
                </Typography>
              </Box>
            ) : (
              <Box style={{ height: "10px" }} mt={2}></Box>
            )}
            <form
              className={classes.form}
              noValidate
              onSubmit={this.doRegister}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="fname"
                    size="small"
                    name="fullname"
                    required
                    fullWidth
                    id="fullname"
                    label="Name"
                    autoFocus
                    onChange={(e) => this.setValue(e)}
                    error={errorFullname}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="small"
                    required
                    fullWidth
                    id="phone"
                    label="phone"
                    name="phone"
                    autoComplete="phone"
                    onChange={(e) => this.setValue(e)}
                    error={errorPhone}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="small"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => this.setValue(e)}
                    error={errorEmail}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
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
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="small"
                    required
                    fullWidth
                    name="repassword"
                    label="Reenter Password"
                    type="password"
                    id="repassword"
                    autoComplete="current-password"
                    onChange={(e) => this.setValue(e)}
                    error={errorRepassword}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Register
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link
                    href="#"
                    variant="body2"
                    onClick={() => this.props.history.push("/login")}
                  >
                    Already have an account? Login
                  </Link>
                </Grid>
              </Grid>
            </form>
            <Box mt={2}>
              <Copyright></Copyright>
            </Box>
          </div>
        </Paper>
      </Container>
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
export default connect(mapStateToProps)(withStyles(useStyles)(Register));