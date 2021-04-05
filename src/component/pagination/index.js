// import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import React, { Component } from "react";

const useStyles = (theme) => ({
  root: {
    marginTop: theme.spacing(1),
    width: "100%",
    display: "flex",
    flexDirection: "column",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  page: {
    marginLeft: 0,
  },
  center: {
    margin: "auto",
  },
});
class PaginationControlled extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { count, page, onChange, classes } = this.props;
    return (
      <div className={classes.root}>
        <div>
          <Typography className={classes.page} variant="body2">
            Page: {page}
          </Typography>
        </div>
        <div className={classes.center}>
          <Pagination count={count} page={page} onChange={onChange} />
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(PaginationControlled);
