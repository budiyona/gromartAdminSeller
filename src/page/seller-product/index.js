import {
  Box,
  Button,
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
  formControl: {
    width: "100%",
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
      filterBy: "all",
      currentPage: 1,
    };
  }
  componentDidMount() {
    const { user } = this.props;
    // this.getSellerProduct(0);
    // this.getSellerInfo();
    this.getProductWithFilter(
      "http://localhost:8080/api/product/seller/filter/" + user.userCode + "?"
    );
  }
  setFilterValue = (e) => {
    console.log(e.target.value);
    const { user } = this.props;
    const { name, value } = e.target;
    if (name == "filterBy") {
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
  // getSellerProduct = (offset) => {
  //   axios
  //     .get(
  //       "http://localhost:8080/api/product/seller?id=" +
  //         this.props.user.userCode +
  //         "&offset=" +
  //         offset
  //     )
  //     .then((res) =>
  //       this.setState({
  //         products: res.data.product,
  //         page: Math.ceil(res.data.qty / 6),
  //       })
  //     );
  // };
  // getSellerInfo = () => {
  //   axios
  //     .get("http://localhost:8080/api/user/" + this.props.user.userCode)
  //     .then((res) => {
  //       const { userName, email } = res.data;
  //       this.setState({ userName, email });
  //     });
  // };
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
    // this.getSellerProduct(0);
  };
  getProductWithFilter = (query, offset = 0) => {
    let queryOffset = "&offset=" + offset;
    axios.get(query + queryOffset).then((res) => {
      console.log("data get", res.data);
      this.setState({
        products: res.data.product,
        page: Math.ceil(res.data.qty / 6),
      });
    });
    this.setState({ querySearch: query });

    // axios
    //   .get(
    //     "http://localhost:8080/api/product/seller/filter?" +
    //       "id=" +
    //       this.props.user.userCode +
    //       "&target=" +
    //       this.state.target +
    //       "&offset=" +
    //       offset
    //   )
    //   .then((res) => {
    //     console.log(res.data);
    //     this.setState({
    //       products: res.data.product,
    //       page: Math.ceil(res.data.qty / 6),
    //     });
    //   });

    // this.setState({ searchingStatus: true });
  };
  doSearch = () => {
    // this.getProductWithFilter(0);
    const { user } = this.props;
    const { fromDate, toDate, filterBy, searchField, status } = this.state;
    let endpoint =
      "http://localhost:8080/api/product/seller/filter/" + user.userCode + "?";
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
    console.log("changePage", page);
    const { user } = this.props;
    const { searchingStatus, querySearch } = this.state;
    let offset = (page - 1) * 6;
    this.getProductWithFilter(querySearch, offset);
    if (searchingStatus) {
    } else {
      this.getProductWithFilter(
        "http://localhost:8080/api/product/seller/filter/" +
          user.userCode +
          "?",
        offset
      );
    }
    this.setState({
      currentPage: page,
    });
  };
  render() {
    const { buttonAdminStat, history, toogleMenu, classes } = this.props;
    const {
      products,
      target,
      showClear,
      userName,
      currentPage,
      page,
      filterBy,
      status,
    } = this.state;
    console.log(this.state);
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
          {/* <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => history.push("/admin/seller")}
            >
              Back
            </Button>
          </Grid> */}

          {/* <Grid item xs={6}>
            <Typography>
              user : {userName} ( {email} )
            </Typography>
          </Grid> */}
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
          {/* <Grid item xs={2}>
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
          </Grid> */}
          <Grid item xs={2}>
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
        {/* <Grid
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
        </Grid> */}

        <Grid container item xs={12}>
          {products &&
            products.map((product, i) => (
              <Grid item xs={4} key={i} className={classes.margin}>
                <ProductCard history={history} product={product}></ProductCard>
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
