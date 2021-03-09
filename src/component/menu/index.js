import { AppBar, Toolbar, Typography, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { green, red } from "@material-ui/core/colors";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import { connect } from "react-redux";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
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
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    "&.focus": {
      color: "black",
    },
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
    const { toogleMenu } = this.props;
    switch (buttonName) {
      case "home":
        toogleMenu("home");
        this.props.history.push("/hoooome");
        break;
      case "product":
        toogleMenu("product");
        this.props.history.push("/admin/home");
        break;
      case "seller":
        toogleMenu("seller");
        this.props.history.push("/two");
        break;
      default:
        toogleMenu("account");
        this.props.history.push("/admin/home");
        break;
    }
  };
  render() {
    const { classes, buttonAdminStat } = this.props;

    return (
      <>
        <AppBar
          position="static"
          style={{
            color: red[500],
            backgroundColor: "white",
            marginBottom: 20,
          }}
        >
          <Toolbar>
            <LocalMallIcon
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </LocalMallIcon>
            <Typography variant="h6" className={classes.title}>
              Gromart
            </Typography>
            <IconButton
              color="inherit"
              disabled={buttonAdminStat.home}
              onClick={() => this.toogleMenu("home")}
            >
              <HomeIcon className={buttonAdminStat.home && classes.red} />
            </IconButton>

            <IconButton
              color="inherit"
              disabled={buttonAdminStat.seller}
              onClick={() => this.toogleMenu("seller")}
            >
              <SupervisorAccountIcon
                className={buttonAdminStat.seller && classes.red}
              />
            </IconButton>
            <IconButton
              color="inherit"
              disabled={buttonAdminStat.product}
              onClick={() => this.toogleMenu("product")}
            >
              <ShoppingCartIcon
                className={buttonAdminStat.product && classes.red}
              />
            </IconButton>
            <IconButton
              color="inherit"
              disabled={buttonAdminStat.account}
              onClick={() => this.toogleMenu("account")}
            >
              <AccountCircle
                className={buttonAdminStat.account && classes.red}
              />
            </IconButton>
            <IconButton color="inherit">
              <ExitToAppIcon
                className={classes.logout}
                onClick={this.doLogout}
              ></ExitToAppIcon>
            </IconButton>
          </Toolbar>
        </AppBar>
      </>
    );
  }
}
const mapStatToProps = (state) => {
  return {
    isLogin: state.auth.isLogin,
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
