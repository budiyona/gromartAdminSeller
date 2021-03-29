import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";
import ClearIcon from "@material-ui/icons/Clear";
import {
  Menu,
  PaginationControlled,
  ProductCard,
} from "../../component";
import { red } from "@material-ui/core/colors";

const useStyles = (theme) => ({
  margin: {
    marginBottom: theme.spacing(2),
  },
  buttonRed: {
    backgroundColor: red[500],
    color: "white",
  },
});
class AdminSellerDetail extends Component {
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
      currentPage: 1,
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
        this.props.id +
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
    axios.get("http://localhost:8080/api/user/" + this.props.id).then((res) => {
      const { userName, email } = res.data;
      this.setState({ userName, email });
    });
  };
  setTarget = (e) => {
    console.log(e.target.value);
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
        this.props.id +
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
    const { searchingStatus } = this.state;
    let offset = (page - 1) * 6;
    if (searchingStatus) {
      this.getProductWithFilter(offset);
    } else {
      this.getSellerProduct(offset);
    }
  };
  setFilterValue = (e) => {
    console.log(e.target.value);
    console.log(e.target.name);
    // const { name, value } = e.target;
    // if (name === "filterBy") {
    //   this.setState({
    //     status: "all",
    //     searchField: "",
    //     fromDate: "",
    //     toDate: "",
    //   });
    //   if (value === "all") {
    //     this.getProductWithFilter("http://localhost:8080/api/product/filter?productName=")
    //   }
    // }
    // this.setState({
    //   [name]: value,
    // });
  };
  render() {
    const { buttonAdminStat, history, toogleMenu, classes } = this.props;
    const {
      products,
      target,
      showClear,
      userName,
      email,
      page,
      currentPage,
      filterBy,
      status
    } = this.state;
    console.log(this.state);
    let buttonGo = (
      <Button
        size="small"
        variant="contained"
        color="secondary"
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
        <Grid container item xs={12} className={classes.margin}>
          <Grid item xs={2}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => history.push("/admin/seller")}
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={4}>
            <ButtonGroup>
              <Button size="small" color="primary">
                {userName}
              </Button>
              <Button size="small">
                {email}
              </Button>
            </ButtonGroup>
          </Grid>
          {/* <Grid item xs={5}>
            <Typography>
              user : {userName} ( {email} )
            </Typography>
          </Grid> */}
          {/* <Grid item xs={3}>
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

          <Grid item xs={1}>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={this.doSearch}
            >
              Search
            </Button>
          </Grid> */}
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
        <Grid container item xs={12}>
          {products &&
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
            onClick={this.changePage} />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(AdminSellerDetail);