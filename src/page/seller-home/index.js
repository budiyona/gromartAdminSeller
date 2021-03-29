import { Grid, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import {
  DasboardTitle,
  Menu,
  ProductDasboardSeller,
} from "../../component";
import GradeIcon from "@material-ui/icons/Grade";
import axios from "axios";
import { connect } from "react-redux";

const useStyles = () => ({
  fullwidth: {
    width: "100%",
  },
  cardCount: {
    minWidth: 250,
    height: "120px",
  },
  cardProduct: {
    minWidth: 250,
  },
  label: {
    height: "25px",
  },
});
class SellerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expensiveProd: [
        {
          productCode: "",
          productName: "",
          price: 0,
          stock: 0,
          description: "",
          seller: {
            userCode: "",
            userName: "",
          },
        },
      ],
      cheapestProd: [
        {
          productCode: "",
          productName: "",
          price: 0,
          stock: 0,
          description: "",
          seller: {
            userCode: "",
            userName: "",
          },
        },
      ],
      isExpesive: false,
      summary: {
        active: 0,
        inactive: 0,
        all: 0,
        limit: 0,
      },
    };
  }
  getExpensiveProduct = () => {
    axios
      .get(
        "http://localhost:8080/api/product/seller/most-expensive/" +
        this.props.user.userCode
      )
      .then((res) => this.setState({ expensiveProd: res.data }));
  };
  getCheapestProduct = () => {
    axios
      .get(
        "http://localhost:8080/api/product/seller/cheapest/" +
        this.props.user.userCode
      )
      .then((res) => this.setState({ cheapestProd: res.data }));
  };
  componentDidMount = () => {
    this.getSellerSumary();
    this.getCheapestProduct();
    this.getExpensiveProduct();
  };
  getSellerSumary = () => {
    // console.log("iddd", id);
    axios
      .get(
        "http://localhost:8080/api/product/seller-summary?id=" +
        this.props.user.userCode
      )
      .then((res) => {
        // console.log("dateget", res.data.limit);
        this.setState({
          summary: res.data,
        });
      });
  };

  render() {
    console.log(this.state);
    const {

      expensiveProd,
      cheapestProd,

      summary,
    } = this.state;
    const { buttonAdminStat, history, toogleMenu, classes } = this.props;
    return (
      <Grid container direction="row" justify="space-between">
        <Grid container item xs={12}>
          <Menu
            history={history}
            toogleMenu={toogleMenu}
            buttonAdminStat={buttonAdminStat}
          ></Menu>
        </Grid>

        <Grid container item xs={12} spacing={3}>
          <Grid
            item
            container
            xs={12}
            spacing={3}
            className={classes.cardCount}
          // direction="column"
          >
            <Grid item xs={3}>
              <DasboardTitle
                // pointer
                fullwidth
                color="info"
                icon={<GradeIcon fontSize="inherit" />}
                title={"All Product : " + summary.all}
              />
            </Grid>
            <Grid item xs={3}>
              <DasboardTitle
                // pointer
                fullwidth
                color="success"
                icon={<GradeIcon fontSize="inherit" />}
                title={"Product Active : " + summary.active}
              />
            </Grid>
            <Grid item xs={3}>
              <DasboardTitle
                // pointer
                fullwidth
                color="warning"
                icon={<GradeIcon fontSize="inherit" />}
                title={"Product Inactive : " + summary.inactive}
              />
            </Grid>
            <Grid item xs={3}>
              <DasboardTitle
                // pointer
                fullwidth
                color="error"
                icon={<GradeIcon fontSize="inherit" />}
                title={"Limit : " + summary.limit}
              />
            </Grid>
            <Grid item xs={12}>
              <DasboardTitle
                // pointer
                fullwidth
                color="warning"
                icon={<GradeIcon fontSize="inherit" />}
                title="Most Expensive Product"
              />
            </Grid>

            {expensiveProd.map((product, i) => (
              <Grid item key={i} xs={4}>
                <ProductDasboardSeller
                  title={product.productName}
                  price={product.price}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <DasboardTitle
                // pointer
                fullwidth
                color="warning"
                icon={<GradeIcon fontSize="inherit" />}
                title="Cheapest Product"
              />
            </Grid>
            {cheapestProd.map((product, i) => (
              <Grid item key={i} xs={4}>
                <ProductDasboardSeller
                  title={product.productName}
                  price={product.price}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
const mapStatToProps = (state) => {
  const { user } = state.auth;
  return {
    user,
  };
};
export default connect(mapStatToProps)(withStyles(useStyles)(SellerHome));