import {
  Box,
  Button,
  ButtonGroup,
  Collapse,
  FormControl,
  Grid,
  Input,
  MenuItem,
  Paper,
  Select,
  TextField,
  withStyles,
} from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";
import {
  Menu,
  PaginationControlled,
  ProductCard,
  SearchField,
} from "../../component";
import FilterListIcon from "@material-ui/icons/FilterList";
import { blue, red } from "@material-ui/core/colors";

const useStyles = () => ({
  margin: {
    marginBottom: "12px",
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
      currentPage: 1,
      page: 0,
      filterSwitch: false,
      filterByStatus: false,
      filterByCode: false,
      filterByName: false,
      filterByDate: false,
      statusFilter: "",

      searchField: "",
      searchingStatus: false,

      fromDate: "",
      toDate: "",

      querySearch: "",
      filterBy: "all", status: "",
      page: 0,
      filterBy: "all",
      currentPage: 1,
      status: "all"
    };
  }
  componentDidMount() {
    // this.getAllProduct(0);
    this.getProductWithFilter("http://localhost:8080/api/product/filter?productName=")
  }
  getAllProduct = (offset) => {
    axios
      .get("http://localhost:8080/api/product?offset=" + offset)
      .then((res) => {
        this.setState({
          listProduct: res.data.product,
          page: Math.ceil(res.data.qty / 6),
        });
        // console.log(res.data.product);
      });
  };
  changePage = (event, page) => {
    const { searchingStatus, querySearch } = this.state;
    console.log("changePage");
    let offset = (page - 1) * 6;
    this.getProductWithFilter(querySearch, offset);
    // console.log(offset, page);
    // if (searchingStatus) {
    //   this.getProductWithFilter(querySearch, offset);
    // } else {
    //   this.getAllProduct(offset);
    // }
    this.setState({
      currentPage: page,
    });
  };
  toogleFilter = (buttonName) => {
    console.log(buttonName);
    this.setState({
      [buttonName]: !this.state[buttonName],
    });
  };
  setFilterValue = (e) => {
    console.log(e.target.value);
    console.log(e.target.name);
    const { name, value } = e.target;
    if (name === "filterBy") {
      this.setState({
        status: "all",
        searchField: "",
        fromDate: "",
        toDate: "",
      });
      if (value === "all") {
        this.getAllProduct(0)
      }
    }
    this.setState({
      [name]: value,
    });
  };
  doSearch = () => {
    const { user } = this.props;
    const { fromDate, toDate, filterBy, searchField, status } = this.state;
    let endpoint =
      "http://localhost:8080/api/product/filter?";
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
  // doSearch = (target) => {
  //   console.log("doSearch target", target);
  //   const {
  //     filterByStatus,
  //     filterByCode,
  //     filterByName,
  //     filterByDate,
  //     statusFilter,
  //     fromDate,
  //     toDate,
  //   } = this.state;
  //   let endpoint = "http://localhost:8080/api/product/filter?";
  //   let arrayEndPoint = [];
  //   if (filterByStatus) {
  //     arrayEndPoint.push("status=" + statusFilter);
  //   }
  //   if (filterByName) {
  //     arrayEndPoint.push("productName=" + target);
  //   }
  //   if (filterByCode) {
  //     arrayEndPoint.push("productCode=" + target);
  //   }
  //   if (filterByDate) {
  //     arrayEndPoint.push("fromDate=" + fromDate + "&toDate=" + toDate);
  //   }
  //   if (!filterByStatus && !filterByName && !filterByCode && !filterByDate) {
  //     arrayEndPoint.push("productName=" + target);
  //   }

  //   let finalEndPoint = endpoint + arrayEndPoint.join("&");

  //   console.log(finalEndPoint);
  //   this.getProductWithFilter(finalEndPoint, 0);
  // };
  getProductWithFilter = (query, offset = 0) => {
    let queryOffset = "&offset=" + offset;
    axios.get(query + queryOffset).then((res) => {
      console.log(res.data);
      this.setState({
        listProduct: res.data.product,
        page: Math.ceil(res.data.qty / 6),
      });
    });
    this.setState({ searchingStatus: true, querySearch: query });
  };
  resetData = () => {
    this.getAllProduct(0);
    this.setState({
      searchingStatus: false,
      filterByStatus: false,
      filterByCode: false,
      filterByName: false,
      filterByDate: false,
    });
  };
  render() {
    // console.log(this.state);
    const { buttonAdminStat, history, toogleMenu, classes } = this.props;
    const {
      listProduct,
      filterSwitch,
      currentPage,
      page,
      filterByStatus,
      filterByCode,
      filterByName,
      filterByDate,
      statusFilter,
      filterBy, status
    } = this.state;
    let buttonGo = (
      <Button
        size="small"
        variant="contained"
        className={classes.buttonRed}
        onClick={this.doSearch}
      >
        Go
      </Button>
    );
    let formFilter;
    if (filterBy === "productName" || filterBy === "productCode") {
      formFilter = (
        <>
          <Grid item xs={3}>
            <Input fullWidth
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
          <TextField
            type="date"
            name="fromDate"
            onChange={(e) => this.setFilterValue(e)}
          ></TextField>
          <Box ml={2} mr={2}>
            to
          </Box>
          <TextField
            type="date"
            name="toDate"
            onChange={(e) => this.setFilterValue(e)}
            style={{ marginRight: "12px" }}
          ></TextField>
          {buttonGo}
        </>
      );
    } else {
      formFilter = <Grid item xs={3}></Grid>;
    }
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


        <Grid
          container
          item
          xs={12}
          justify="flex-start"
          alignItems="center"
          className={classes.margin}
          spacing={3}
        >


          <Grid item xs={3}>
            <FormControl className={classes.formControl} size="small" fullWidth>
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

        {/* <Grid
          container
          item
          xs={12}
          justify="space-between"
          className={classes.margin}
        >
          <Grid item>
            <FilterListIcon
              style={{ cursor: "pointer" }}
              onClick={() => this.setState({ filterSwitch: !filterSwitch })}
              className={!filterSwitch ? classes.redOff : classes.redOn}
            ></FilterListIcon>
          </Grid>
          <Grid item>
            <SearchField
              onClick={this.doSearch}
              resetData={this.resetData}
            ></SearchField>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.margin}>
          <Collapse in={filterSwitch}>
            <Paper elevation={4} className={classes.paper}>
              <Grid
                container
                xs={12}
                alignItems="center"
                direction="column"
                spacing={1}
              >
                <Grid container item direction="column" xs={4}>
                  <Button
                    variant="contained"
                    size="small"
                    color={filterByCode ? "primary" : "default"}
                    onClick={() => this.toogleFilter("filterByCode")}
                  >
                    Product Code
                  </Button>
                </Grid>
                <Grid container item direction="column" xs={4}>
                  <Button
                    variant="contained"
                    size="small"
                    color={filterByName ? "primary" : "default"}
                    onClick={() => this.toogleFilter("filterByName")}
                  >
                    Product Name
                  </Button>
                </Grid>
                <Grid container item direction="column" xs={4}>
                  <Button
                    variant="contained"
                    size="small"
                    color={filterByStatus ? "primary" : "default"}
                    onClick={() => this.toogleFilter("filterByStatus")}
                  >
                    Status
                  </Button>
                  <Select
                    value={statusFilter}
                    name="statusFilter"
                    disabled={!filterByStatus}
                    onChange={(e) => this.setFilterValue(e)}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">InActive</MenuItem>
                  </Select>
                </Grid>
                <Grid container item direction="column" xs={4}>
                  <Button
                    variant="contained"
                    size="small"
                    color={filterByDate ? "primary" : "default"}
                    onClick={() => this.toogleFilter("filterByDate")}
                  >
                    Date
                  </Button>
                </Grid>

                <Grid container item xs={12}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: "auto",
                    }}
                  >
                    <TextField
                      type="date"
                      name="fromDate"
                      disabled={!filterByDate}
                      onChange={(e) => this.setFilterValue(e)}
                    ></TextField>
                    <Box ml={2} mr={2}>
                      to
                    </Box>
                    <TextField
                      type="date"
                      name="toDate"
                      disabled={!filterByDate}
                      onChange={(e) => this.setFilterValue(e)}
                    ></TextField>
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </Collapse>
        </Grid> */}
        <Grid container item xs={12} spacing={2} >
          {listProduct &&
            listProduct.map((prod, i) => (
              <Grid
                item
                xs={4}
                key={i}
                className={classes.margin}
              >
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
