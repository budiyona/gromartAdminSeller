import { CardContent, Paper, Typography, withStyles } from "@material-ui/core";
import React, { Component } from "react";
const useStyles = () => ({
  cardCount: {
    minWidth: 250,
    height: "120px",
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
class CountCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { number, title, classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;
    return (
      <Paper className={classes.cardCount} elevation={3}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {title}
          </Typography>
          <Typography variant="h4" component="h4">
            {number}
            {bull}Product
          </Typography>
        </CardContent>
      </Paper>
    );
  }
}

export default withStyles(useStyles)(CountCard);
