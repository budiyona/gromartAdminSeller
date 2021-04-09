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

const useStyles = (theme) => ({
  margin: {
    marginBottom: theme.spacing(2),
  },
});
class AdminSellerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],

      userName: "",
      email: "",

      page: 0,
      currentPage: 1,
      status: "all",
      filterBy: "all",
      querySearch: "",
      searchField: "",
    };
  }
  componentDidMount() {
    const { id } = this.props;
    this.getProductWithFilter(
      "http://localhost:8080/api/product/seller/filter/" + id + "?"
    );
    this.getSellerInfo();
  }

  getSellerInfo = () => {
    axios.get("http://localhost:8080/api/user/" + this.props.id).then((res) => {
      const { userName, email } = res.data;
      this.setState({ userName, email });
    });
  };

  getProductWithFilter = (query, offset = 0) => {
    let queryOffset = "&offset=" + offset;
    axios.get(query + queryOffset).then((res) => {
      console.log(res.data);
      this.setState({
        products: res.data.product,
        page: Math.ceil(res.data.qty / 6),
        querySearch: query,
      });
    });
  };
  doSearch = () => {
    console.log("SEACRH");
    const { id } = this.props;
    const { fromDate, toDate, filterBy, searchField, status } = this.state;
    let endpoint =
      "http://localhost:8080/api/product/seller/filter/" + id + "?";

    if (filterBy === "productName") {
      endpoint += "productName=" + searchField;
    } else if (filterBy === "productCode") {
      endpoint += "productCode=" + searchField;
    } else if (filterBy === "status") {
      endpoint += "status=" + status;
    } else if (filterBy === "date") {
      endpoint += "fromDate=" + fromDate + "&toDate=" + toDate;
    }
    console.log(endpoint);
    this.getProductWithFilter(endpoint);
    this.setState({
      currentPage: 1,
    });
  };
  changePage = (event, page) => {
    console.log("changePage");
    const { querySearch } = this.state;
    let offset = (page - 1) * 6;
    this.getProductWithFilter(querySearch, offset);
    this.setState({
      currentPage: page,
    });
  };
  setFilterValue = (e) => {
    const { name, value } = e.target;
    const { id } = this.props;
    if (name === "filterBy") {
      this.setState({
        status: "all",
        searchField: "",
        fromDate: "",
        toDate: "",
      });
      if (value === "all") {
        this.getProductWithFilter(
          "http://localhost:8080/api/product/seller/filter/" + id + "?"
        );
      }
    }
    this.setState({
      [name]: value,
    });
  };
  render() {
    const { history, classes } = this.props;
    console.log(this.props.id);
    const {
      products,
      userName,
      email,
      page,
      currentPage,
      filterBy,
      status,
      searchField,
    } = this.state;

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
              value={searchField}
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
          <Grid item xs={1}>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => history.push("/admin/seller")}
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={3}>
            <ButtonGroup>
              <Button
                size="small"
                color="primary"
                style={{ width: "120px", cursor: "default" }}
              >
                {userName}
              </Button>
              <Button
                size="small"
                style={{ width: "170px", cursor: "default" }}
              >
                {email}
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid
            container
            item
            xs={8}
            justify="flex-start"
            spacing={3}
            alignItems="center"
          >
            <Grid item xs={2}>
              <FormControl
                className={classes.formControl}
                size="small"
                fullWidth
              >
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
                <ProductCard product={product}></ProductCard>
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

export default withStyles(useStyles)(AdminSellerDetail);
