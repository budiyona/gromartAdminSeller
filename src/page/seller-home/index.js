import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Paper,
  Typography,
  withStyles,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { Component } from "react";
import { Menu, PaginationControlled, ProductCard } from "../../component";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = () => ({
  margin: {
    marginBottom: "12px",
  },
  fullwidth: {
    width: "100%",
  },
  root: {
    minWidth: 255,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
class SellerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { classes } = this.props;
    const { buttonAdminStat, history, toogleMenu } = this.props;
    const bull = <span className={classes.bullet}>•</span>;
    return (
      <Grid container direction="row" justify="space-between">
        <Grid container item xs={12}>
          <Menu
            history={history}
            toogleMenu={toogleMenu}
            buttonAdminStat={buttonAdminStat}
          ></Menu>
        </Grid>
        <Grid container item xs={12}>
          <Typography variant="h6" component="h6">
            ADMIN DASBOARD
          </Typography>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <Grid container item xs={8} spacing={3}>
            <Grid item container xs={12}>
              <Alert
                className={classes.fullwidth}
                icon={<ShoppingCartIcon fontSize="inherit" />}
                severity="info"
              >
                Seller
              </Alert>
            </Grid>
            <Grid item container xs={12} spacing={2}>
              <Grid item>
                <Paper className={classes.root} elevation={3}>
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      Seller Active
                    </Typography>
                    <Typography variant="h4" component="h4">
                      1{bull}Seller
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Paper>
              </Grid>

              <Grid item>
                <Paper className={classes.root} elevation={3}>
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      Seller Active
                    </Typography>
                    <Typography variant="h4" component="h4">
                      1{bull}Seller
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Paper>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Alert
                className={classes.fullwidth}
                icon={<ShoppingCartIcon fontSize="inherit" />}
                severity="info"
              >
                Product - (ACTIVE : 50) (INACTIVE : 20)
              </Alert>
            </Grid>
            <Grid item container xs={12} spacing={2}>
              <Grid item>
                <Paper className={classes.root} elevation={3}>
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      Seller Active
                    </Typography>
                    <Typography variant="h4" component="h4">
                      1{bull}Seller
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Paper>
              </Grid>
              <Grid item>
                <Paper className={classes.root} elevation={3}>
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      Seller Active
                    </Typography>
                    <Typography variant="h4" component="h4">
                      1{bull}Seller
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid container item xs={4} spacing={3}>
            <Grid item>
              <Alert
                className={classes.fullwidth}
                icon={<ShoppingCartIcon fontSize="inherit" />}
                severity="info"
              >
                Product
              </Alert>
            </Grid>
            <Grid item>
              <Paper className={classes.root} elevation={3}>
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    Seller Active
                  </Typography>
                  <Typography variant="h4" component="h4">
                    1{bull}Seller
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Paper>
            </Grid>
            <Grid item>
              <Paper className={classes.root} elevation={3}>
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    Seller Active
                  </Typography>
                  <Typography variant="h4" component="h4">
                    1{bull}Seller
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Paper>
            </Grid>
            <Grid item>
              <Paper className={classes.root} elevation={3}>
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    Seller Active
                  </Typography>
                  <Typography variant="h4" component="h4">
                    1{bull}Seller
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(SellerHome);
