import {
  Button,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  Typography,
  withStyles,
} from "@material-ui/core";
import axios from "axios";
import ClearIcon from "@material-ui/icons/Clear";
import {
  Menu,
  PaginationControlled,
  ProductCard,
  SearchField,
} from "../../component";
import React, { Component } from "react";
import { red } from "@material-ui/core/colors";
import { connect } from "react-redux";

const useStyles = (theme) => ({
  margin: {
    marginBottom: theme.spacing(2),
  },
  buttonRed: {
    backgroundColor: red[500],
    color: "white",
  },
});
class SellerProduct extends Component {
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
      target: "",
      showClear: false,

      userName: "",
      email: "",

      searchingStatus: false,
      page: 0,
    };
  }
  componentDidMount() {
    this.getSellerProduct(0);
    this.getSellerInfo();
  }

  getSellerProduct = (offset) => {
    axios
      .get(
        "http://localhost:8080/api/product/seller?id=" +
          this.props.user.userCode +
          "&offset=" +
          offset
      )
      .then((res) =>
        this.setState({
          products: res.data.product,
          page: Math.ceil(res.data.qty / 6),
        })
      );
  };
  getSellerInfo = () => {
    axios
      .get("http://localhost:8080/api/user/" + this.props.user.userCode)
      .then((res) => {
        const { userName, email } = res.data;
        this.setState({ userName, email });
      });
  };
  setTarget = (e) => {
    console.log(e.target.value);
    const { target } = this.state;
    const { value } = e.target;
    let clear = false;
    this.setState({ target: value });
    value.length > 0 && (clear = true);

    this.setState({ showClear: clear });
  };
  clearButton = () => {
    this.setState({
      target: "",
      showClear: false,
      searchingStatus: false,
    });
    this.getSellerProduct(0);
  };
  getProductWithFilter = (offset) => {
    axios
      .get(
        "http://localhost:8080/api//product/seller/filter?" +
          "id=" +
          this.props.user.userCode +
          "&target=" +
          this.state.target +
          "&offset=" +
          offset
      )
      .then((res) => {
        console.log(res.data);
        this.setState({
          products: res.data.product,
          page: Math.ceil(res.data.qty / 6),
        });
      });

    this.setState({ searchingStatus: true });
  };
  doSearch = () => {
    this.getProductWithFilter(0);
  };
  changePage = (page) => {
    console.log("changePage");
    const { searchingStatus, querySearch } = this.state;
    let offset = (page - 1) * 6;
    if (searchingStatus) {
      this.getProductWithFilter(offset);
    } else {
      this.getSellerProduct(offset);
    }
  };
  render() {
    const { buttonAdminStat, history, toogleMenu, classes } = this.props;
    const { products, target, showClear, userName, email, page } = this.state;
    console.log(this.state);
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
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => history.push("/admin/seller")}
            >
              Back
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Typography>
              user : {userName} ( {email} )
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <FormControl>
              <Input
                fullWidth
                placeholder="search..."
                onChange={(e) => this.setTarget(e)}
                value={target}
                endAdornment={
                  showClear && (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={this.clearButton}
                      >
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }
              />
            </FormControl>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              className={classes.buttonRed}
              size="small"
              onClick={this.doSearch}
            >
              Search
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={12}
          justify="flex-end"
          spacing={2}
          className={classes.margin}
        >
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => history.push("/seller/report")}
            >
              Report
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => history.push("/seller/product/create")}
            >
              Add
            </Button>
          </Grid>
        </Grid>

        <Grid container item xs={12}>
          {products &&
            products.map((product, i) => (
              <Grid item xs={4} key={i} className={classes.margin}>
                <ProductCard history={history} product={product}></ProductCard>
              </Grid>
            ))}
        </Grid>
        <Grid container item xs={12}>
          <PaginationControlled page={page} onClick={this.changePage} />
        </Grid>
      </Grid>
    );
  }
}
const mapStateToProps = (state) => {
  const { isLogin, user } = state.auth;
  return {
    isLogin: isLogin,
    user: user,
  };
};
export default connect(mapStateToProps)(withStyles(useStyles)(SellerProduct));
