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
import React, { Component } from "react";
import { Menu, PaginationControlled, SellerCard } from "../../component";
import { connect } from "react-redux";
import { red } from "@material-ui/core/colors";
const useStyles = () => ({
  margin: {
    marginBottom: "5px",
  },
  formControl: {
    width: "100%",
  },
  buttonRed: {
    backgroundColor: red[500],
    color: "white",
  },
});
class AdminSeller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listSeller: [],
      ListStatus: ["requested", "active", "inactive"],

      page: 0,
      currentPage: 1,

      searchField: "",
      fromDate: "",
      toDate: "",

      querySearch: "",
      filterBy: "all",
      status: "all",
    };
  }
  componentDidMount() {
    this.getSellerWithFilter("http://localhost:8080/api/user/filter?userName=");
  }
  toogleStatus = (idx) => {
    console.log("toogle status");
    const { ListStatus, listSeller } = this.state;
    const { user } = this.props;
    let newStatusIndex = ListStatus.findIndex(
      (el) => listSeller[idx].status === el
    );
    if (newStatusIndex >= 2) {
      newStatusIndex = 1;
    } else {
      newStatusIndex++;
    }
    let newUser = {
      ...listSeller[idx],
      status: ListStatus[newStatusIndex],
    };
    let newListSeller = [...listSeller];
    newListSeller.splice(idx, 1, newUser);
    if (
      window.confirm("are you sure to change " + newUser.userName + " status")
    ) {
      axios
        .put(
          "http://localhost:8080/api/user/status?id=" +
            newUser.userCode +
            "&status=" +
            ListStatus[newStatusIndex] +
            "&idAdmin=" +
            user.userCode
        )
        .then((res) => {
          if (res.status) {
            this.setState({
              listSeller: newListSeller,
            });
          }
        });
    }
  };

  editQty = (idx, productActive, currentLimit) => {
    const { listSeller } = this.state;
    const { user } = this.props;
    let seller = listSeller[idx];

    if (currentLimit >= productActive) {
      let choise = window.confirm(
        "are you sure to change " + seller.userName + " product quantity"
      );
      if (choise) {
        axios
          .put(
            "http://localhost:8080/api/user/product-limit?id=" +
              seller.userCode +
              "&limitProduct=" +
              currentLimit +
              "&idAdmin=" +
              user.userCode
          )
          .then((res) => {
            if (res.status) {
              alert("product has been change");
            }
          });
      }
    } else {
      alert("limit must be more than or equal with active");
    }
  };

  changePage = (event, page) => {
    console.log("changePage");
    const { searchingStatus, querySearch } = this.state;
    let offset = (page - 1) * 6;
    this.getSellerWithFilter(querySearch, offset);
    this.setState({
      currentPage: page,
    });
  };
  doSearch = () => {
    const { filterBy, fromDate, toDate, status, searchField } = this.state;
    let endpoint = "http://localhost:8080/api/user/filter?";

    switch (filterBy) {
      case "userName":
        endpoint += "userName=" + searchField;
        break;
      case "userCode":
        endpoint += "userCode=" + searchField;
        break;
      case "status":
        endpoint += "status=" + status;
        break;
      case "date":
        endpoint += "fromDate=" + fromDate + "&toDate=" + toDate;
        break;
    }
    this.getSellerWithFilter(endpoint);
    this.setState({
      currentPage: 1,
    });
  };
  getSellerWithFilter = (query, offset = 0) => {
    let queryOffset = "&offset=" + offset;
    axios.get(query + queryOffset).then((res) => {
      console.log(res.data);
      this.setState({
        listSeller: res.data.seller,
        page: Math.ceil(res.data.qty / 6),
        querySearch: query,
      });
    });
  };
  setFilterValue = (e) => {
    const { name, value } = e.target;
    console.log(value, name);
    if (name === "filterBy") {
      this.setState({
        status: "all",
        searchField: "",
        fromDate: "",
        toDate: "",
      });
      if (value === "all") {
        this.getSellerWithFilter(
          "http://localhost:8080/api/user/filter?status="
        );
      }
    }
    this.setState({
      [name]: value,
    });
  };

  rejectSeller = (id) => {
    let choise = window.confirm(
      "Are you sure to reject the seller? rejected account will be deleted permanently"
    );
    if (choise)
      axios
        .delete("http://localhost:8080/api/user/" + id)
        .then((response) => {
          console.log(response.status);
          console.log(response.status.ok);
          if (response.status === 200) {
            alert("Succesfully reject seller");
            this.getSellerWithFilter(
              "http://localhost:8080/api/user/filter?status="
            );
          }
        })
        .catch((errorResponse) => {
          console.log("erroooor", errorResponse);

          if (errorResponse.response !== undefined) {
            alert(errorResponse.response.data);
          }
        });
  };
  render() {
    const { classes, history } = this.props;
    const { listSeller, page, currentPage, filterBy, status } = this.state;
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
    if (filterBy === "userName" || filterBy === "userCode") {
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
                <MenuItem value="requested">Requested</MenuItem>
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
          <Menu history={history} />
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
                <MenuItem value="userName">Name</MenuItem>
                <MenuItem value="userCode">Code</MenuItem>
                <MenuItem value="status">Status</MenuItem>
                <MenuItem value="date">Date</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {formFilter}
        </Grid>

        <Grid container item xs={12} style={{ minHeight: "73vh" }}>
          {listSeller.length > 0 &&
            listSeller.map((user, i) => {
              return (
                <Grid item xs={4} className={classes.margin} key={i}>
                  <SellerCard
                    idx={i}
                    user={user}
                    history={history}
                    toggleStatus={this.toogleStatus}
                    editQty={this.editQty}
                    rejectSeller={this.rejectSeller}
                  />
                </Grid>
              );
            })}
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
  const { user } = state.auth;
  return {
    user: user,
  };
};
export default connect(mapStateToProps)(withStyles(useStyles)(AdminSeller));
