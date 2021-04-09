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
  withStyles,
} from "@material-ui/core";
import axios from "axios";
import ReactToPrint from "react-to-print";
import React, { Component } from "react";
import { Menu, TableProduct } from "../../component";
import { blue } from "@material-ui/core/colors";
import { connect } from "react-redux";
import { CSVLink } from "react-csv";

const useStyles = (theme) => ({
  margin: {
    marginBottom: theme.spacing(1),
  },
  formControl: {
    width: "100%",
  },
  pagebreak: {
    display: "none",
  },
  paperToPrint: {
    width: "821px",
    height: "1063px",
    marginTop: "0px",
    boxSizing: "border-box",
    backgroundColor: "white",
  },
  marginProductTable: {
    margin: "20px 20px 10px 20px",
  },
  buttonExportCSV: {
    borderRadius: "0px 5px 5px 0px",
    backgroundColor: blue[500],
    color: "white",
  },
  containerPaper: {
    display: "flex",
    justifyContent: "space-around",
    overflow: "hidden",
    padding: "10px",
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
    const { listProduct, status, filterBy, searchField } = this.state;
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
      <Grid item xs={2}>
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

    let maxPaper = Math.ceil(listProduct.length / 10);
    let dataToDisplay = [];
    let i = 0;
    while (i < maxPaper) {
      dataToDisplay.push(
        <Box key={i} border={1} className={classes.paperToPrint}>
          <div className={classes.marginProductTable}>
            <TableProduct
              user={user}
              page={{
                pageTotal: maxPaper,
                pageNow: i + 1,
              }}
              listProduct={listProduct.slice(i * 10, i * 10 + 10)}
            />
            <div className={classes.pageBreak} />
          </div>
        </Box>
      );
      i++;
    }

    return (
      <Grid container justify="center" alignItems="center" spacing={2}>
        <Grid item xs={12}>
          <Menu history={history}></Menu>
        </Grid>

        <Grid container item xs={12} justify="space-between">
          <Grid item xs={2}>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              disableElevation
              onClick={() => history.push("/seller/product")}
            >
              BACK
            </Button>
          </Grid>

          <Grid
            container
            item
            xs={8}
            justify="flex-start"
            spacing={3}
            alignItems="center"
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

          <Grid item xs={2} style={{ textAlign: "right" }}>
            <ButtonGroup>
              <ReactToPrint
                trigger={() => {
                  return (
                    <Button
                      style={{ borderRadius: "5px 0px 0px 5px" }}
                      size="small"
                      variant="contained"
                      color="primary"
                    >
                      PRINT TO PDF
                    </Button>
                  );
                }}
                content={() => this.componentRef}
              />

              <CSVLink {...csvExport} style={{ textDecoration: "none" }}>
                <Button
                  size="small"
                  variant="contained"
                  className={classes.buttonExportCSV}
                >
                  Export CSV
                </Button>
              </CSVLink>
            </ButtonGroup>
          </Grid>
        </Grid>
        <Grid container item xs={12} justify="center" alignItems="center">
          <Grid item xs={8} style={{ backgroundColor: "white" }}>
            <div className={classes.containerPaper}>
              <GridList
                id="ContainerElementID"
                style={{
                  width: 860,
                  height: 520,
                }}
                cols={1}
              >
                <div ref={(el) => (this.componentRef = el)}>
                  {dataToDisplay.map((e) => e)}
                </div>
              </GridList>
            </div>
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
