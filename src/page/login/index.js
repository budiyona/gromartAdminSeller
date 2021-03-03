import React, { Component } from 'react';
import { Copyright } from '../../component';
import { withStyles } from "@material-ui/core/styles";
import Recaptcha from "react-recaptcha";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVerified: false,
      email: "",
      password: ""
    }
  }
  recaptchaLoaded = () => {
    console.log("captcha success loaded");
  }
  verifyCallback = response => {
    if (response) {
      this.setState({
        isVerified: true
      })
    }
  }
  doLogin = (e) => {
    e.preventDefault()
    console.log("LOGIN");
    e.target.reset()
  }
  setValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    console.log(this.state);
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
        </Typography>
          <form className={classes.form} noValidate onSubmit={this.doLogin}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={e => this.setValue(e)}
            />
            <TextField
              onChange={e => this.setValue(e)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Recaptcha
              sitekey="6Lfg3W0aAAAAAH_wKiduCg2ecTcyehEFQVpAf66N"
              render="explicit"
              onloadCallback={this.recaptchaLoaded}
              verifyCallback={this.verifyCallback}
            />

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
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
              </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>

          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

export default withStyles(useStyles)(Login);