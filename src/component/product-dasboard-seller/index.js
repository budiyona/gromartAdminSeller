import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import product from "../../static/product.jpg";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "70%",
  },
  cover: {
    width: "30%",
  },
}));

export default function ProductDasboardSeller(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent>
          <Typography variant="h6">{props.title}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Rp.{props.price}
          </Typography>
        </CardContent>
      </div>
      <CardMedia className={classes.cover} image={product} />
    </Card>
  );
}
