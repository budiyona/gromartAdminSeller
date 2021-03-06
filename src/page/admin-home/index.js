import React, { Component } from "react";
import { Grid, withStyles } from "@material-ui/core";
import {
  CountCard,
  DasboardTitle,
  Menu,
  ProductDasboard,
} from "../../component";
import axios from "axios";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import GradeIcon from "@material-ui/icons/Grade";
import InboxIcon from "@material-ui/icons/Inbox";
import clsx from "clsx";

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
    width: "100%",
  },
  paddingRightLabel: {
    paddingRight: "10px",
  },
});
class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sellerCard: {
        active: 0,
        inactive: 0,
      },
      productCard: {
        active: 0,
        inactive: 0,
      },
      expensiveProd: [],
      cheapestProd: [],
      isExpesive: false,
    };
  }
  getExpensiveProduct = () => {
    axios
      .get("http://localhost:8080/api/product/most-expensive")
      .then((res) => this.setState({ expensiveProd: res.data }));
  };
  getCheapestProduct = () => {
    axios
      .get("http://localhost:8080/api/product/cheapest")
      .then((res) => this.setState({ cheapestProd: res.data }));
  };
  componentDidMount = () => {
    this.getProductActive();
    this.getProductInactive();
    this.getSellerActive();
    this.getSellerInactive();
    this.getCheapestProduct();
    this.getExpensiveProduct();
  };
  getSellerActive = () => {
    axios
      .get("http://localhost:8080/api/user/count-seller?status=active")
      .then((res) =>
        this.setState({
          sellerCard: {
            ...this.state.sellerCard,
            active: res.data,
          },
        })
      );
  };
  getSellerInactive = () => {
    axios
      .get("http://localhost:8080/api/user/count-seller?status=inactive")
      .then((res) =>
        this.setState({
          sellerCard: {
            ...this.state.sellerCard,
            inactive: res.data,
          },
        })
      );
  };
  getProductActive = () => {
    axios
      .get("http://localhost:8080/api/product/count-by-status?status=active")
      .then((res) =>
        this.setState({
          productCard: {
            ...this.state.productCard,
            active: res.data,
          },
        })
      );
  };
  getProductInactive = () => {
    axios
      .get("http://localhost:8080/api/product/count-by-status?status=inactive")
      .then((res) =>
        this.setState({
          productCard: {
            ...this.state.productCard,
            inactive: res.data,
          },
        })
      );
  };
  isExpesiveToogle = () => {
    console.log("is EXpemsive", this.state.isExpesive);
    this.setState({
      isExpesive: !this.state.isExpesive,
    });
  };
  render() {
    console.log(this.state);
    const {
      sellerCard,
      productCard,
      expensiveProd,
      cheapestProd,
      isExpesive,
    } = this.state;
    const { history, classes } = this.props;
    return (
      <Grid container>
        <Grid item xs={12} className="bottom-spacing">
          <Menu history={history}></Menu>
        </Grid>

        <Grid container item xs={12} spacing={0}>
          <Grid container item xs={6}>
            <Grid
              container
              item
              xs={12}
              className={clsx(
                classes.label,
                classes.paddingRightLabel,
                "bottom-spacing"
              )}
            >
              <DasboardTitle
                fullwidth
                color={"info"}
                icon={<SupervisorAccountIcon fontSize="inherit" />}
                title={"Seller"}
              />
            </Grid>
            <Grid
              item
              container
              xs={12}
              spacing={3}
              className={clsx(classes.cardCount, "bottom-spacing")}
            >
              <Grid item>
                <CountCard
                  title={"Seller Active"}
                  number={sellerCard.active}
                  unit="Seller"
                />
              </Grid>
              <Grid item>
                <CountCard
                  title={"Seller Inactive"}
                  number={sellerCard.inactive}
                  unit="Seller"
                />
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={12}
              className={clsx(
                classes.label,
                classes.paddingRightLabel,
                "bottom-spacing"
              )}
            >
              <DasboardTitle
                fullwidth
                color={"info"}
                icon={<InboxIcon fontSize="inherit" />}
                title={"Product"}
              />
            </Grid>
            <Grid
              item
              container
              xs={12}
              spacing={3}
              className={clsx(classes.cardCount, "bottom-spacing")}
            >
              <Grid item>
                <CountCard
                  title={"Product Active"}
                  number={productCard.active}
                  unit="Product"
                />
              </Grid>
              <Grid item>
                <CountCard
                  title={"Product Inactive"}
                  number={productCard.inactive}
                  unit="Product"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container item xs={6} spacing={0}>
            <Grid item xs={12} className="bottom-spacing">
              <DasboardTitle
                pointer
                fullwidth
                color={"warning"}
                icon={<GradeIcon fontSize="inherit" />}
                title={
                  "Hot Product " +
                  (isExpesive ? "(Most Expensive)" : "(Cheapest)")
                }
                onClick={this.isExpesiveToogle}
              />
            </Grid>
            {isExpesive
              ? expensiveProd.length > 0 &&
                expensiveProd.map((product, i) => (
                  <Grid item key={i} className="bottom-spacing">
                    <ProductDasboard
                      title={product.productName}
                      price={product.price}
                    />
                  </Grid>
                ))
              : cheapestProd.length > 0 &&
                cheapestProd.map((product, i) => (
                  <Grid item key={i} className="bottom-spacing">
                    <ProductDasboard
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
export default withStyles(useStyles)(AdminHome);
