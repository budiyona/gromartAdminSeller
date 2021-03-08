import React, { Component } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Copyright } from "../../component";
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
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
  doRegister = (e) => {
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
  render() {
    const { classes } = this.props;
    const {
      errorEmail,
      errorFullname,
      errorPassword,
      errorRepassword,
      errorPhone,
    } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.doRegister}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  name="fullname"
                  variant="outlined"
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
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
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
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
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
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
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
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="repassword"
                  label="Reenter Password"
                  type="password"
                  id="repassword"
                  autoComplete="current-password"
                  onChange={(e) => this.setValue(e)}
                  error={errorRepassword}
                  helperText={errorRepassword ? "password did not match" : ""}
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
        </div>
        <Box mt={5}>
          <Copyright></Copyright>
        </Box>
      </Container>
    );
  }
}

export default withStyles(useStyles)(Register);
