import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import product from "../../static/product.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "500px",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "55%",
  },
  cover: {
    width: "45%",
  },
}));

export default function ProductDasboard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent>
          <Typography variant="h6">{props.title}</Typography>
          <Typography variant="caption" color="textSecondary">
            Rp.{props.price}
          </Typography>
        </CardContent>
      </div>
      <CardMedia
        className={classes.cover}
        image={product}
        title="Live from space album cover"
      />
    </Card>
  );
}
