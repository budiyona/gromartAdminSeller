import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import product from "../../static/product.jpg";
import { formatToRupiah } from "../../util";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    width: "500px",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "60%",
  },
  cover: {
    width: "40%",
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
            {formatToRupiah(props.price)}
          </Typography>
        </CardContent>
      </div>
      <CardMedia className={classes.cover} image={product} />
    </Card>
  );
}
