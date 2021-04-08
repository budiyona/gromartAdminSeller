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
import React, { Component } from "react";
import { Menu, PaginationControlled, ProductCard } from "../../component";
import { red } from "@material-ui/core/colors";

const useStyles = (theme) => ({
  margin: {
    marginBottom: theme.spacing(2),
  },
  redOff: {
    color: red[500],
  },
  redOn: {
    color: red[200],
  },
  buttonRed: {
    backgroundColor: red[500],
    color: "white",
  },
  formControl: {
    width: "100%",
    // height: "24px",
  },
});
class AdminProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listProduct: [],

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
    this.getProductWithFilter(
      "http://localhost:8080/api/product/filter?productName="
    );
  }

  changePage = (event, page) => {
    const { querySearch } = this.state;
    let offset = (page - 1) * 6;
    this.getProductWithFilter(querySearch, offset);
    this.setState({
      currentPage: page,
    });
  };

  setFilterValue = (e) => {
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
          "http://localhost:8080/api/product/filter?productName="
        );
      }
    }
    this.setState({
      [name]: value,
    });
  };
  doSearch = () => {
    const { fromDate, toDate, filterBy, searchField, status } = this.state;
    let endpoint = "http://localhost:8080/api/product/filter?";
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
    this.getProductWithFilter(endpoint);
    this.setState({
      currentPage: 1,
    });
  };
  getProductWithFilter = (query, offset = 0) => {
    let queryOffset = "&offset=" + offset;
    axios.get(query + queryOffset).then((res) => {
      console.log(res.data);
      this.setState({
        listProduct: res.data.product,
        page: Math.ceil(res.data.qty / 6),
        querySearch: query,
      });
    });
  };

  render() {
    const { history, classes } = this.props;
    const { listProduct, currentPage, page, filterBy, status } = this.state;
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
              fullWidth
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
            <FormControl className={classes.formControl} size="small" fullWidth>
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
              onChange={(e) => this.setFilterValue(e)}
              style={{ marginRight: "12px" }}
            ></TextField>
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
          <Grid container item xs={10} spacing={3} style={{ height: "54px" }}>
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
          {listProduct.length > 0 &&
            listProduct.map((prod, i) => (
              <Grid item xs={4} key={i} className={classes.margin}>
                <ProductCard product={prod}></ProductCard>
              </Grid>
            ))}
        </Grid>
        <Grid container item xs={12}>
          <PaginationControlled
            count={page}
            page={currentPage}
            onChange={this.changePage}
          ></PaginationControlled>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(AdminProduct);
