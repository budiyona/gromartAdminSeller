import { Grid, withStyles } from "@material-ui/core";
import axios from "axios";
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
    this.state = {
      listProduct: [
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
    };
  }
  componentDidMount() {
    this.getAllProduct();
  }
  getAllProduct = () => {
    axios.get("http://localhost:8080/api/product").then((res) => {
      this.setState({ listProduct: res.data });
    });
  };
  render() {
    const { buttonAdminStat, history, toogleMenu, classes } = this.props;
    const { listProduct } = this.state;
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
          {listProduct &&
            listProduct.map((prod, i) => (
              <Grid item xs={4} key={i}>
                <ProductCard product={prod}></ProductCard>
              </Grid>
            ))}
        </Grid>
        <Grid container item xs={12}>
          <PaginationControlled page={10}></PaginationControlled>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(AdminProduct);
