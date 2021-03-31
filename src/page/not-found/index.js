import { Button, Container, Typography, withStyles } from "@material-ui/core";
import React, { Component } from "react";
const useStyles = () => ({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  head: {
    fontSize: "110px",
    fontWeight: "bold",
  },
  button: {
    margin: "20px",
    width: "150px",
  },
});
class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { classes, history } = this.props;
    return (
      <Container className={classes.container}>
        <Typography variant="h1" className={classes.head}>
          404 :'(
        </Typography>
        <Typography variant="h5">Page Not Found</Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          onClick={() => history.push("/")}
        >
          back
        </Button>
      </Container>
    );
  }
}

export default withStyles(useStyles)(NotFound);
