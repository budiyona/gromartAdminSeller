import {
  Box,
  Button,
  Collapse,
  FormControl,
  Grid,
  GridList,
  GridListTile,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";
import {
  Menu,
  PaginationControlled,
  ProductCard,
  SearchField,
  TableProduct,
} from "../../component";
import FilterListIcon from "@material-ui/icons/FilterList";
import { red } from "@material-ui/core/colors";
import { connect } from "react-redux";
import moment from "moment";
import Pdf from "react-to-pdf";
import ReactToPrint from "react-to-print";
import { CSVLink, CSVDownload } from "react-csv";

const useStyles = (theme) => ({
  margin: {
    marginBottom: theme.spacing(0),
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
});
const ref = React.createRef();
const options = {
  orientation: "portrait",
  unit: "in",
  format: [4, 2],
};

class SellerReport extends Component {
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
      // productPage: 0,
      qty: 0,

      status: "all",

      searchField: "",

      fromDate: "",
      toDate: "",

      filterBy: "all",
      querySearch: "",
      offset: 0,
    };
  }

  componentDidMount() {
    this.getProductWithFilter(
      "http://localhost:8080/api/product/report/" +
        this.props.user.userCode +
        "?"
    );
  }
  changePage = (page) => {
    console.log("changePage");
    let offset = (page - 1) * 6;
    this.setState({
      offset,
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
    if (name == "filterBy") {
      this.setState({
        status: "all",
        searchField: "",
        fromDate: "",
        toDate: "",
      });
      if (value) {
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
      console.log("data get", res.data);
      this.setState({
        listProduct: res.data.product,
        qty: res.data.qty,
      });
    });
    this.setState({ querySearch: query });
  };
  resetData = () => {
    this.getProductWithFilter(
      "http://localhost:8080/api/product/report/" +
        this.props.user.userCode +
        "?"
    );
  };
  // exportCSV = () => {
  //   <CSVLink {...csvExport}>Export to CSV</CSVLink>;
  // };
  render() {
    console.log(this.state);
    const { buttonAdminStat, history, toogleMenu, classes, user } = this.props;
    const { listProduct, qty, status, filterBy, offset } = this.state;
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
      listProduct.map((product) => {
        data.push({
          productCode: product.productCode,
          productName: product.productName,
          price: product.price,
          stock: product.stock,
          description: product.description,
          seller: {
            userCode: product.seller.userCode,
            userName: product.seller.userName,
          },
        });
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
    console.log(formFilter);
    console.log("hadeerr", header);
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
        >
          <Grid item xs={8}>
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
          <Grid item xs={2} align="right">
            <Pdf targetRef={ref} filename="code-example.pdf">
              {({ toPdf }) => (
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  disableElevation
                  onClick={toPdf}
                >
                  EXPORT PDF
                </Button>
              )}
            </Pdf>
          </Grid>

          {/* <CSVLink data={data}>Export to CSV</CSVLink> */}
          <Grid item xs={2} align="right">
            <CSVLink {...csvExport}>
              <Button
                size="small"
                variant="contained"
                color="primary"
                disableElevation
              >
                Export CSV
              </Button>
            </CSVLink>
          </Grid>
          {/* <CSVDownload data={data}>Export to CSV</CSVDownload> */}
          {/* <br /> */}
          {/* <Pdf targetRef={ref} filename="code-example.pdf">
            {({ toPdf }) => <Button onClick={toPdf}>Generate CSV</Button>}
          </Pdf> */}
        </Grid>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
        >
          <Grid container item xs={12}>
            <GridList
              // cellHeight={270}
              className={classes.gridList}
              style={{ width: "100%", height: 420 }}
              // align="center"
              cols={3}
            >
              <Box
                border={1}
                ref={ref}
                style={{
                  width: "793.7007874px",
                  height: "1122.519685px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                {/* <Typography variant="h6" gutterBottom align="center">
                  REPORT#{user.userCode}
                </Typography>
                <hr /> */}
                <div
                  style={{
                    marginLeft: "20px",
                    marginRight: "20px",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <TableProduct
                    user={user}
                    page={{
                      pageTotal: Math.ceil(qty / 20),
                      pageNow: offset / 20 + 1,
                    }}
                    listProduct={listProduct.slice(offset, offset + 20)}
                  />
                </div>
              </Box>
            </GridList>
          </Grid>
        </Grid>
        <Grid container item>
          <PaginationControlled
            page={Math.ceil(qty / 20)}
            onClick={this.changePage}
          ></PaginationControlled>
        </Grid>
        {/* <Pdf targetRef={ref} filename="code-example.pdf">
          {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
        </Pdf> */}
        {/* <ReactToPrint
          trigger={() => <button>Print this out!</button>}
          content={() => this.componentRef}
          // content={() => <>HELLOOO</>}
        /> */}
        {/* <ComponentToPrint ref={(el) => (this.componentRef = el)} /> */}
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
