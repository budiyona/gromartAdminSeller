import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { blue, green, red } from "@material-ui/core/colors";
import DoneIcon from "@material-ui/icons/Done";
import product from "../../static/product.jpg";

const useStyles = () => ({
  root: {
    maxWidth: 248,
    fontSize: 1,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  green: {
    color: green[500],
  },
  red: {
    color: red[500],
  },
  blue: {
    color: blue[500],
  },
});

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ["requested", "active", "inactive"],
      statusNow: "requested",
    };
  }
  status = () => {
    const { status, statusNow } = this.state;
    console.log("toogle status");
    console.log(statusNow);
    let newStatusIndex = status.findIndex((el) => statusNow === el);
    if (newStatusIndex >= 2) {
      newStatusIndex = 0;
    } else {
      newStatusIndex++;
    }
    this.setState({
      statusNow: status[newStatusIndex],
    });
  };
  render() {
    const { classes } = this.props;
    const { statusNow } = this.state;
    return (
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardMedia
          className={classes.media}
          image={product}
          title="Paella dish"
        />
        <CardActions disableSpacing>
          <IconButton onClick={this.status} aria-label="share">
            <DoneIcon
              className={
                statusNow === "active"
                  ? classes.green
                  : statusNow === "inactive"
                  ? classes.red
                  : classes.blue
              }
            />
          </IconButton>
          <Typography>{statusNow}</Typography>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(useStyles)(ProductCard);
