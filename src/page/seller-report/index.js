import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  Grid,
  GridList,
  Input,
  MenuItem,
  Select,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import axios from "axios";
import ReactToPrint from "react-to-print";
import React, { Component } from "react";
import { Menu, TableProduct } from "../../component";
import { red } from "@material-ui/core/colors";
import { connect } from "react-redux";
import { CSVLink } from "react-csv";
import Pagination from "@material-ui/lab/Pagination";
import { scroller } from "react-scroll";

const useStyles = (theme) => ({
  margin: {
    marginBottom: theme.spacing(1),
  },
  redOff: {
    color: red[500],
  },
  redOn: {
    color: red[200],
  },
  formControl: {
    width: "100%",
  },
  buttonRed: {
    backgroundColor: red[500],
    color: "white",
  },
  pagebreak: {
    display: "none",
  },
});
class SellerReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listProduct: [],
      page: 0,

      status: "all",

      searchField: "",

      fromDate: "",
      toDate: "",

      filterBy: "all",
      querySearch: "",
      currentPage: 1,
    };
  }

  componentDidMount() {
    this.getProductWithFilter(
      "http://localhost:8080/api/product/report/" +
        this.props.user.userCode +
        "?"
    );
  }
  changePage = (event, page) => {
    console.log("changePage " + page);
    scroller.scrollTo("page" + page, {
      duration: 1000,
      delay: 100,
      smooth: true,
      containerId: "ContainerElementID",
    });
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
          "http://localhost:8080/api/product/report/" + this.props.user.userCode
        );
      }
    }
    this.setState({
      [name]: value,
    });
  };

  doSearch = () => {
    console.log("doSearch");
    const { user } = this.props;
    const { fromDate, toDate, filterBy, searchField, status } = this.state;
    let endpoint =
      "http://localhost:8080/api/product/report/" + user.userCode + "?";
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
  };
  getProductWithFilter = (query) => {
    axios.get(query).then((res) => {
      this.setState({
        listProduct: res.data.product,
        page: Math.ceil(res.data.qty / 6),
        querySearch: query,
      });
    });
  };
  render() {
    const { history, classes, user } = this.props;
    const {
      listProduct,
      status,
      filterBy,
      currentPage,
      page,
      searchField,
    } = this.state;
    const header = [
      { label: "Product Code", key: "productCode" },
      { label: "Product Name", key: "productName" },
      { label: "Price", key: "price" },
      { label: "Stock", key: "stock" },
      { label: "Description", key: "description" },
      { label: "Seller Code", key: "seller.userCode" },
      { label: "Seller Name", key: "seller.userName" },
    ];
    const data = [];
    listProduct.length > 0 &&
      listProduct.forEach((product) => {
        let userToAdd = {};
        for (const property in product) {
          userToAdd = { ...userToAdd, [property]: product[property] };
        }
        data.push(userToAdd);
      });

    const csvExport = {
      data: data,
      headers: header,
      filename: "data.csv",
    };
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
            <Input
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

    let maxPaper = Math.ceil(listProduct.length / 5);
    let dataToDisplay = [];
    let i = 0;
    while (i < maxPaper) {
      dataToDisplay.push(
        <Box
          name={"page" + (i + 1)}
          border={1}
          style={{
            width: "811px",
            height: "1055px",
            marginTop: "0px",
            boxSizing: "border-box",
            backgroundColor: "white",
          }}
        >
          <div
            style={{
              marginLeft: "20px",
              marginRight: "20px",
              marginTop: "20px",
              marginBottom: "10px",
            }}
          >
            <TableProduct
              user={user}
              page={{
                pageTotal: maxPaper,
                pageNow: i + 1,
              }}
              listProduct={listProduct.slice(i * 5, i * 5 + 5)}
            />
            <div className={classes.pageBreak} />
          </div>
        </Box>
      );
      i++;
    }

    return (
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid container item xs={12}>
          <Menu history={history}></Menu>
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
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-end"
          spacing={2}
          className={classes.margin}
        >
          <Grid item xs={3}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              disableElevation
              onClick={() => history.push("/seller/product")}
            >
              BACK
            </Button>
          </Grid>

          <Grid item xs={3} style={{ display: "flex", alignItems: "center" }}>
            <Typography>Page : </Typography>
            <Pagination
              count={page}
              page={currentPage}
              onChange={this.changePage}
            />
          </Grid>

          <Grid item xs={4} align="right">
            <ButtonGroup>
              <ReactToPrint
                trigger={() => {
                  return (
                    <Button
                      style={{ borderRadius: "5px 0px 0px 5px" }}
                      size="small"
                      variant="contained"
                      color="primary"
                      disableElevation
                    >
                      PRINT TO PDF
                    </Button>
                  );
                }}
                content={() => this.componentRef}
              />

              <CSVLink {...csvExport} style={{ textDecoration: "none" }}>
                <Button
                  style={{ borderRadius: "0px 5px 5px 0px" }}
                  size="small"
                  variant="contained"
                  color="secondary"
                  disableElevation
                >
                  Export CSV
                </Button>
              </CSVLink>
            </ButtonGroup>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
          style={{
            // backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "rgba(238, 238, 238,0.8)",
          }}
        >
          <Grid container item xs={12}>
            <GridList
              id="ContainerElementID"
              className={classes.gridList}
              style={{
                width: "100%",
                height: 450,
                overflowX: "hidden",
              }}
              cols={3}
            >
              <div ref={(el) => (this.componentRef = el)}>
                {dataToDisplay.map((e) => e)}
              </div>
            </GridList>
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
export default connect(mapStatToProps)(withStyles(useStyles)(SellerReport));
