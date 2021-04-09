import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import { DasboardTitle, Menu, ProductDasboardSeller } from "../../component";
import GradeIcon from "@material-ui/icons/Grade";
import axios from "axios";
import { connect } from "react-redux";

class SellerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expensiveProd: [],
      cheapestProd: [],
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
      .then((res) => {
        console.log(res);
        this.setState({ expensiveProd: res.data });
      });
  };
  getCheapestProduct = () => {
    axios
      .get(
        "http://localhost:8080/api/product/seller/cheapest/" +
          this.props.user.userCode
      )
      .then((res) => {
        console.log(res);
        this.setState({ cheapestProd: res.data });
      });
  };
  componentDidMount = () => {
    this.getSellerSumary();
    this.getCheapestProduct();
    this.getExpensiveProduct();
  };
  getSellerSumary = () => {
    axios
      .get(
        "http://localhost:8080/api/product/seller-summary?id=" +
          this.props.user.userCode
      )
      .then((res) => {
        this.setState({
          summary: res.data,
        });
      });
  };

  render() {
    const { expensiveProd, cheapestProd, summary } = this.state;
    const { history } = this.props;
    return (
      <Grid container>
        <Grid container item xs={12} className="bottom-spacing">
          <Grid item xs={12}>
            <Menu history={history}></Menu>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={12}
          justify="space-between"
          className="bottom-spacing"
        >
          <Grid item xs={2}>
            <DasboardTitle
              fullwidth
              color="info"
              icon={<GradeIcon fontSize="inherit" />}
              title={"All Product : " + summary.all}
            />
          </Grid>
          <Grid item xs={2}>
            <DasboardTitle
              fullwidth
              color="success"
              icon={<GradeIcon fontSize="inherit" />}
              title={"Product Active : " + summary.active}
            />
          </Grid>
          <Grid item xs={2}>
            <DasboardTitle
              fullwidth
              color="warning"
              icon={<GradeIcon fontSize="inherit" />}
              title={"Product Inactive : " + summary.inactive}
            />
          </Grid>
          <Grid item xs={2}>
            <DasboardTitle
              fullwidth
              color="error"
              icon={<GradeIcon fontSize="inherit" />}
              title={"Limit : " + summary.limit}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} className="bottom-spacing">
          <DasboardTitle
            fullwidth
            color="warning"
            icon={<GradeIcon fontSize="inherit" />}
            title="Most Expensive Product"
          />
        </Grid>
        <Grid
          container
          item
          justify="space-between"
          spacing={3}
          className="bottom-spacing"
        >
          {expensiveProd.length > 0 &&
            expensiveProd.map((product, i) => (
              <Grid item key={i} xs={4}>
                <ProductDasboardSeller
                  title={product.productName}
                  price={product.price}
                />
              </Grid>
            ))}
        </Grid>
        <Grid item xs={12} className="bottom-spacing">
          <DasboardTitle
            fullwidth
            color="warning"
            icon={<GradeIcon fontSize="inherit" />}
            title="Cheapest Product"
          />
        </Grid>
        <Grid container item justify="space-between" spacing={3}>
          {cheapestProd.length > 0 &&
            cheapestProd.map((product, i) => (
              <Grid item key={i} xs={4}>
                <ProductDasboardSeller
                  title={product.productName}
                  price={product.price}
                />
              </Grid>
            ))}
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
export default connect(mapStatToProps)(SellerHome);
