import { withStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { Component } from "react";
const useStyles = (theme) => ({
  margin: {
    marginBottom: theme.spacing(2),
  },
  fullwidth: {
    width: "100%",
  },
  cardCount: {
    minWidth: 250,
    height: "120px",
  },
  cardProduct: {
    minWidth: 250,
  },
  label: {
    height: "25px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
});
class DasboardTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      classes,
      icon,
      onClick,
      pointer,
      color,
      fullwidth,
      title,
    } = this.props;
    return (
      <Alert
        style={pointer && { cursor: "pointer" }}
        className={fullwidth && classes.fullwidth}
        icon={icon}
        severity={color}
        onClick={onClick && onClick}
      >
        {title}
      </Alert>
    );
  }
}

export default withStyles(useStyles)(DasboardTitle);
