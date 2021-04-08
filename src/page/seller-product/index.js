import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  Grid,
  Input,
  MenuItem,
  Select,
  TextField,
  withStyles,
} from "@material-ui/core";
import axios from "axios";
import { Menu, PaginationControlled, ProductCard } from "../../component";
import React, { Component } from "react";
import { blue, red } from "@material-ui/core/colors";
import { connect } from "react-redux";

const useStyles = (theme) => ({
  margin: {
    marginBottom: theme.spacing(2),
  },
  buttonRed: {
    backgroundColor: red[500],
    color: "white",
  },
  formControl: {
    width: "100%",
  },
});
class SellerProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      searchField: "",

      fromDate: "",
      toDate: "",

      querySearch: "",
      filterBy: "all",
      page: 0,
      currentPage: 1,
      status: "all",
    };
  }
  componentDidMount() {
    const { user } = this.props;
    this.getProductWithFilter(
      "http://localhost:8080/api/product/seller/filter/" + user.userCode + "?"
    );
  }
  setFilterValue = (e) => {
    console.log(e.target.value);
    const { user } = this.props;
    const { name, value } = e.target;
    if (name === "filterBy") {
      this.setState({
        status: "all",
        searchField: "",
        fromDate: "",
        toDate: "",
      });
      if (value === "all") {
        this.getProductWithFilter(
          "http://localhost:8080/api/product/seller/filter/" +
            user.userCode +
            "?"
        );
      }
    }
    this.setState({
      [name]: value,
    });
  };

  getProductWithFilter = (query, offset = 0) => {
    let queryOffset = "&offset=" + offset;
    axios.get(query + queryOffset).then((res) => {
      console.log("data get", res.data);
      this.setState({
        products: res.data.product,
        page: Math.ceil(res.data.qty / 6),
        querySearch: query,
      });
    });
  };
  doSearch = () => {
    const { user } = this.props;
    const { fromDate, toDate, filterBy, searchField, status } = this.state;
    let endpoint =
      "http://localhost:8080/api/product/seller/filter/" + user.userCode + "?";

    switch (filterBy) {
      case "productName":
        endpoint += "productName=" + searchField;
        break;
      case "productCode":
        endpoint += "productCode=" + searchField;
        break;
      case "status":
        endpoint += "status=" + status;
        break;
      case "date":
        endpoint += "fromDate=" + fromDate + "&toDate=" + toDate;
        break;
      default:
        break;
    }
    console.log(endpoint);
    this.getProductWithFilter(endpoint);
    this.setState({
      currentPage: 1,
    });
  };
  changePage = (event, page) => {
    console.log("changePage", page);
    const { querySearch } = this.state;
    let offset = (page - 1) * 6;
    this.getProductWithFilter(querySearch, offset);
    this.setState({
      currentPage: page,
    });
  };

  deleteProductById = (id) => {
    const { user } = this.props;
    let choise = window.confirm("are you sure want to delete product");
    if (choise) {
      axios.delete("http://localhost:8080/api/product/" + id).then((res) => {
        if (res.status === 200) {
          alert("succesfully deleted product");
          this.getProductWithFilter(
            "http://localhost:8080/api/product/seller/filter/" +
              user.userCode +
              "?"
          );
        } else {
          alert("delete failed");
        }
      });
    }
  };
  render() {
    const { history, classes } = this.props;
    const { products, currentPage, page, filterBy, status } = this.state;
    console.log(this.state);
    let buttonGo = (
      <Grid item xs={3}>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={this.doSearch}
        >
          Go
        </Button>
      </Grid>
    );
    let formFilter;
    if (filterBy === "productName" || filterBy === "productCode") {
      formFilter = (
        <>
          <Grid item xs={3}>
            <Input
              placeholder="search"
              style={{ height: "29px" }}
              name="searchField"
              onChange={(e) => this.setFilterValue(e)}
            />
          </Grid>
          {buttonGo}
        </>
      );
    } else if (filterBy === "status") {
      formFilter = (
        <>
          <Grid item xs={3}>
            <FormControl className={classes.formControl} size="small">
              <Select
                size="small"
                value={status}
                name="status"
                onChange={(e) => this.setFilterValue(e)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {buttonGo}
        </>
      );
    } else if (filterBy === "date") {
      formFilter = (
        <>
          <Grid item>
            <TextField
              type="date"
              name="fromDate"
              size="small"
              onChange={(e) => this.setFilterValue(e)}
            />
          </Grid>
          <Grid item>
            <Box ml={2} mr={2}>
              to
            </Box>
          </Grid>
          <Grid item>
            <TextField
              type="date"
              name="toDate"
              size="small"
              onChange={(e) => this.setFilterValue(e)}
              style={{ marginRight: "12px" }}
            />
          </Grid>
          {buttonGo}
        </>
      );
    } else {
      formFilter = <Grid item xs={3}></Grid>;
    }
    return (
      <Grid container justify="center">
        <Grid item xs={12} className="bottom-spacing">
          <Menu history={history}></Menu>
        </Grid>
        <Grid
          container
          item
          xs={12}
          justify="flex-start"
          className="bottom-spacing"
        >
          <Grid item xs={2}>
            <ButtonGroup>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => history.push("/seller/product/report")}
                style={{ width: 100 }}
              >
                Report
              </Button>
              <Button
                variant="contained"
                size="small"
                style={{
                  width: 100,
                  backgroundColor: blue[500],
                  color: "white",
                }}
                onClick={() => history.push("/seller/product/create")}
              >
                Add
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid container item xs={10} spacing={3}>
            <Grid item xs={3}>
              <FormControl className={classes.formControl} size="small">
                <Select
                  size="small"
                  value={filterBy}
                  name="filterBy"
                  onChange={(e) => this.setFilterValue(e)}
                >
                  <MenuItem value="all">Filter</MenuItem>
                  <MenuItem value="productName">Name</MenuItem>
                  <MenuItem value="productCode">Code</MenuItem>
                  <MenuItem value="status">Status</MenuItem>
                  <MenuItem value="date">Date</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {formFilter}
          </Grid>
        </Grid>

        <Grid container item xs={12} style={{ minHeight: "73vh" }}>
          {products.length > 0 &&
            products.map((product, i) => (
              <Grid item xs={4} key={i} className={classes.margin}>
                <ProductCard
                  history={history}
                  product={product}
                  deleteProductById={this.deleteProductById}
                ></ProductCard>
              </Grid>
            ))}
        </Grid>
        <Grid container item xs={12}>
          <PaginationControlled
            count={page}
            page={currentPage}
            onChange={this.changePage}
          />
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
