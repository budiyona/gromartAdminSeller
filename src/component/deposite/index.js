import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Card, Grid, Paper } from "@material-ui/core";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export default function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid item xs={12} md={4} lg={3}>
        <Paper elevation={3}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Recent Deposits
          </Typography>
          <Typography component="p" variant="h4">
            $3,024.00
          </Typography>
          <Typography color="textSecondary" className={classes.depositContext}>
            on 15 March, 2019
          </Typography>
          <div>
            <Link color="primary" href="#" onClick={preventDefault}>
              View balance
            </Link>
          </div>
        </Paper>
      </Grid>
    </React.Fragment>
  );
}
