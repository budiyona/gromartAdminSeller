import {
  Box,
  Button,
  Collapse,
  Grid,
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
import { red } from "@material-ui/core/colors";

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
      productPage: 0,
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
    };
  }
  componentDidMount() {
    this.getAllProduct(0);
  }
  getAllProduct = (offset) => {
    axios
      .get("http://localhost:8080/api/product?offset=" + offset)
      .then((res) => {
        this.setState({
          listProduct: res.data.product,
          productPage: Math.ceil(res.data.qty / 6),
        });
        // console.log(res.data.product);
      });
  };
  changePage = (page) => {
    const { searchingStatus, querySearch } = this.state;
    console.log("changePage");
    let offset = (page - 1) * 6;
    if (searchingStatus) {
      this.getProductWithFilter(querySearch, offset);
    } else {
      this.getAllProduct(offset);
    }
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
    this.setState({
      [name]: value,
    });
  };

  doSearch = (target) => {
    console.log("doSearch target", target);
    const {
      filterByStatus,
      filterByCode,
      filterByName,
      filterByDate,
      statusFilter,
      fromDate,
      toDate,
    } = this.state;
    let endpoint = "http://localhost:8080/api/product/filter?";
    let arrayEndPoint = [];
    if (filterByStatus) {
      arrayEndPoint.push("status=" + statusFilter);
    }
    if (filterByName) {
      arrayEndPoint.push("productName=" + target);
    }
    if (filterByCode) {
      arrayEndPoint.push("productCode=" + target);
    }
    if (filterByDate) {
      arrayEndPoint.push("fromDate=" + fromDate + "&toDate=" + toDate);
    }
    if (!filterByStatus && !filterByName && !filterByCode && !filterByDate) {
      arrayEndPoint.push("productName=" + target);
    }

    let finalEndPoint = endpoint + arrayEndPoint.join("&");

    console.log(finalEndPoint);
    this.getProductWithFilter(finalEndPoint, 0);
  };
  getProductWithFilter = (query, offset) => {
    let queryOffset = "&offset=" + offset;
    axios.get(query + queryOffset).then((res) => {
      console.log(res.data);
      this.setState({
        listProduct: res.data.product,
        productPage: Math.ceil(res.data.qty / 6),
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
      productPage,
      filterByStatus,
      filterByCode,
      filterByName,
      filterByDate,
      statusFilter,
    } = this.state;
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
        </Grid>
        <Grid container item xs={12} spacing={2}>
          {listProduct &&
            listProduct.map((prod, i) => (
              <Grid
                item
                xs={4}
                key={i}
                className={classes.margin}
                align="center"
              >
                <ProductCard product={prod}></ProductCard>
              </Grid>
            ))}
        </Grid>
        <Grid container item xs={12}>
          <PaginationControlled
            page={productPage}
            onClick={this.changePage}
          ></PaginationControlled>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(AdminProduct);
