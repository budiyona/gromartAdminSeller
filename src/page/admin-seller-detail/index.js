import { Grid, withStyles } from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";
import { Menu, PaginationControlled, ProductCard } from "../../component";

const useStyles = () => ({
  margin: {
    marginBottom: "12px",
  },
});
class AdminSellerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
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
    console.log(this.props.id);
    axios
      .get("http://localhost:8080/api/product/seller?id=" + this.props.id)
      .then((res) =>
        this.setState({
          products: res.data,
        })
      );
  }
  render() {
    const { buttonAdminStat, history, toogleMenu, classes } = this.props;
    const { products } = this.state;
    console.log(this.state.products);
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
          {products &&
            products.map((product, i) => (
              <Grid item xs={4} key={i} className={classes.margin}>
                <ProductCard product={product}></ProductCard>
              </Grid>
            ))}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(AdminSellerDetail);
