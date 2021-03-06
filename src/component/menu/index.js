import {
  AppBar,
  Toolbar,
  Tooltip,
  Typography,
  withStyles,
  IconButton,
} from "@material-ui/core";
import React, { Component } from "react";
import { green, red } from "@material-ui/core/colors";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { connect } from "react-redux";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import InboxIcon from "@material-ui/icons/Inbox";
import StoreIcon from "@material-ui/icons/Store";
const useStyles = (theme) => ({
  logout: {
    "&:hover": {
      backgroundColor: red[500],
      color: "white",
      cursor: "pointer",
    },
  },
  menu: {
    color: green[500],
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  red: {
    color: red[200],
  },
});

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleChange = (event, newValue) => {
    console.log(newValue);

    this.setState({
      value: newValue,
    });
  };
  doLogout = () => {
    this.props.doLogout();
    this.props.history.push("/login");
  };
  toogleMenu = (buttonName) => {
    const { userCode, history } = this.props;
    let isAdmin = userCode.includes("ADMIN");
    let url;
    switch (buttonName) {
      case "home":
        isAdmin ? (url = "/admin/home") : (url = "/seller/home");
        break;
      case "product":
        isAdmin ? (url = "/admin/product") : (url = "/seller/product");
        break;
      case "seller":
        url = "/admin/seller";
        break;
      default:
        isAdmin ? (url = "/admin/account") : (url = "/seller/account");
        break;
    }
    history.push(url);
  };
  render() {
    const { classes, userCode, history } = this.props;
    const currentPathName = history.location.pathname.split("/")[2];
    let isAdmin = userCode.includes("ADMIN");
    console.log("location", this.props.history.location.pathname);

    return (
      <>
        <AppBar
          position="static"
          style={{
            color: red[500],
            backgroundColor: "white",
          }}
        >
          <Toolbar variant="dense">
            <StoreIcon
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </StoreIcon>
            <Typography variant="h6" className={classes.title}>
              Gromart
            </Typography>
            <Tooltip title="Home">
              <IconButton
                color="inherit"
                onClick={() => this.toogleMenu("home")}
              >
                <HomeIcon
                  className={currentPathName === "home" && classes.red}
                />
              </IconButton>
            </Tooltip>
            {isAdmin && (
              <Tooltip title="Seller">
                <IconButton
                  color="inherit"
                  onClick={() => this.toogleMenu("seller")}
                >
                  <SupervisorAccountIcon
                    className={currentPathName === "seller" && classes.red}
                  />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Product">
              <IconButton
                color="inherit"
                onClick={() => this.toogleMenu("product")}
              >
                <InboxIcon
                  className={currentPathName === "product" && classes.red}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Account">
              <IconButton
                color="inherit"
                onClick={() => this.toogleMenu("account")}
              >
                <AccountCircle
                  className={currentPathName === "account" && classes.red}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Logout">
              <IconButton color="inherit">
                <ExitToAppIcon
                  className={classes.logout}
                  onClick={this.doLogout}
                ></ExitToAppIcon>
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </>
    );
  }
}
const mapStatToProps = (state) => {
  const { user } = state.auth;
  return {
    userCode: user.userCode,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    doLogout: () => dispatch({ type: "LOGOUT" }),
  };
};
export default connect(
  mapStatToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Menu));
