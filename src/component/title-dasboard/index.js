import { Alert } from "@material-ui/lab";
import React, { Component } from "react";

class DasboardTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { icon, onClick, pointer, color, title } = this.props;
    return (
      <div style={{ width: "100%" }}>
        <Alert
          style={pointer && { cursor: "pointer" }}
          icon={icon}
          severity={color}
          onClick={onClick && onClick}
        >
          {title}
        </Alert>
      </div>
    );
  }
}

export default DasboardTitle;
