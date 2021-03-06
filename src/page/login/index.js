import React, { Component } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
  Typography,
} from "@material-ui/core";
import { Copyright } from "../../component";
import { withStyles } from "@material-ui/core/styles";
import Recaptcha from "react-recaptcha";
import { Redirect } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { connect } from "react-redux";
import axios from "axios";
const useStyles = (theme) => ({
  paper: {
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  flexContainer: {
    display: "flex",
    width: "inherit",
    height: "inherit",
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVerified: false,
      email: "",
      password: "",
      showPassword: false,
    };
  }
  recaptchaLoaded = () => {
    console.log("captcha success loaded");
  };
  verifyCallback = (response) => {
    if (response) {
      this.setState({
        isVerified: true,
      });
    }
  };
  doLogin = (e) => {
    e.preventDefault();
    console.log("LOGIN");
    const { email, password } = this.state;
    if (this.state.isVerified) {
      // console.log(email,password, this.state);
      axios
        .post(
          "http://localhost:8080/api/login?email=" +
            email +
            "&password=" +
            password
        )
        .then((res) => {
          let payload = {
            userCode: res.data.userCode,
            fullName: res.data.userName,
          };
          this.props.doLogin(payload);
          // e.target.reset();
          if (payload.userCode.includes("ADMIN")) {
            this.props.history.push("/admin/home");
          } else {
            this.props.history.push("/seller/home");
          }
        })
        .catch((e) => {
          if (e.response !== undefined) {
            alert(e.response.data);
          }
        });
    } else {
      alert("please verified captcha");
    }
  };
  setValue = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    this.setState({
      [name]: value,
    });
  };
  tooglePassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };
  render() {
    const { classes, isLogin, user } = this.props;
    if (isLogin) {
      if (user.userCode.includes("ADMIN")) {
        return <Redirect to="/admin/home" />;
      }
      if (user.userCode.includes("SELLER")) {
        return <Redirect to="/seller/home" />;
      }
    }
    return (
      <div className={classes.flexContainer}>
        <Container
          // component="main"
          maxWidth="xs"
          style={{
            margin: "auto",
            backgroundColor: "white",
            borderRadius: "10px",
            paddingTop: "15px",
            paddingBottom: "15px",
          }}
        >
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <form className={classes.form} noValidate onSubmit={this.doLogin}>
              <TextField
                required
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => this.setValue(e)}
              />
              <FormControl
                variant="outlined"
                fullWidth
                style={{ marginBottom: "10px" }}
              >
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  name="password"
                  type={this.state.showPassword ? "text" : "password"}
                  onChange={(e) => this.setValue(e)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={this.tooglePassword}
                        edge="end"
                      >
                        {this.state.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={100}
                />
              </FormControl>
              <div style={{ display: "flex" }}>
                <div style={{ margin: "auto" }}>
                  <Recaptcha
                    sitekey="6Lfg3W0aAAAAAH_wKiduCg2ecTcyehEFQVpAf66N"
                    render="explicit"
                    onloadCallback={this.recaptchaLoaded}
                    verifyCallback={this.verifyCallback}
                  />
                </div>
              </div>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                LogIn
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Register"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      </div>
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
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Login));
