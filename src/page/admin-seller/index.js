import { Grid, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { Menu, PaginationControlled, SellerCard } from "../../component";
const useStyles = () => ({
  margin: {
    marginBottom: "12px",
  },
});
class AdminSeller extends Component {
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
          />
        </Grid>
        <Grid container item xs={12} className={classes.margin}>
          <Grid item xs={4}>
            <SellerCard />
          </Grid>
          <Grid item xs={4}>
            <SellerCard />
          </Grid>
          <Grid item xs={4}>
            <SellerCard />
          </Grid>
        </Grid>
        <Grid container item xs={12} className={classes.margin}>
          <Grid item xs={4}>
            <SellerCard />
          </Grid>
          <Grid item xs={4}>
            <SellerCard />
          </Grid>
          <Grid item xs={4}>
            <SellerCard />
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <PaginationControlled page={10} />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(AdminSeller);
