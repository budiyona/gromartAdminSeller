import { Typography } from "@material-ui/core";
import React, { Component } from "react";
class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="not-found">
        <Typography variant="h1">404</Typography>
      </div>
    );
  }
}

export default NotFound;
