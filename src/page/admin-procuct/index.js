import { Grid, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { Menu, PaginationControlled, ProductCard } from "../../component";

const useStyles = () => ({
  margin: {
    marginBottom: "12px",
  },
});
class AdminProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { classes } = this.props;
    const { buttonAdminStat, history, toogleMenu } = this.props;
    return (
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid container item xs={12}>
          <Menu
            history={history}
            toogleMenu={toogleMenu}
            buttonAdminStat={buttonAdminStat}
          ></Menu>
        </Grid>
        <Grid container item xs={12} className={classes.margin}>
          <Grid item xs={4}>
            <ProductCard></ProductCard>
          </Grid>
          <Grid item xs={4}>
            <ProductCard></ProductCard>
          </Grid>
          <Grid item xs={4}>
            <ProductCard></ProductCard>
          </Grid>
        </Grid>
        <Grid container item xs={12} className={classes.margin}>
          <Grid item xs={4}>
            <ProductCard></ProductCard>
          </Grid>
          <Grid item xs={4}>
            <ProductCard></ProductCard>
          </Grid>
          <Grid item xs={4}>
            <ProductCard></ProductCard>
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <PaginationControlled page={10}></PaginationControlled>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(AdminProduct);
