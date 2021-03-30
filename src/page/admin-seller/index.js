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
import {
  Menu,
  PaginationControlled,
  SearchField,
  SellerCard,
} from "../../component";
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
      listSeller: [
        {
          userCode: "",
          userName: "",
          phone: "",
          email: "",
          status: "requested",
          createdBy: "",
          createdDate: "",
          updateBy: "",
          updateDate: "",
          productLimit: 0,
        },
      ],
      ListStatus: ["requested", "active", "inactive"],
      statusNow: "requested",
      page: 0,
      currentPage: 1,

      filterStatus: "all",
      filterRole: "userName",

      querySearch: "",
      searchingStatus: false,
      filterBy: "all",
      currentPage: 1,
      status: "all"
    };
  }
  componentDidMount() {
    // this.getAllSeller(0);
    this.getSellerWithFilter("http://localhost:8080/api/user/filter?userName=")
    this.countSellerByStatus("all");
  }
  countSellerByStatus = (status) => {
    axios
      .get("http://localhost:8080/api//user/count-seller?status=" + status)
      .then((res) => {
        this.setState({
          page: Math.ceil(res.data / 6),
        });
      });
  };
  getAllSeller = (offset) => {
    axios
      .get("http://localhost:8080/api/user/seller?offset=" + offset)
      .then((res) =>
        this.setState({
          listSeller: res.data,
        })
      );
  };
  toogleStatus = (idx) => {
    const { ListStatus, listSeller } = this.state;
    const { user } = this.props;
    let newStatusIndex = ListStatus.findIndex(
      (el) => listSeller[idx].status === el
    );
    if (newStatusIndex >= 2) {
      newStatusIndex = 0;
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
      window.confirm(
        "are you sure to change " + newUser.userName + " status"
      )
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
  setQty = (e, idx) => {
    console.log("setvalueQTYYYYY", e.target.name, e.target.value, idx);

    const { listSeller } = this.state;
    const currSeller = listSeller[idx];

    currSeller.productLimit = e.target.value;

    let newListSeller = listSeller;
    newListSeller.splice(idx, 1, currSeller);

    this.setState({
      listSeller: newListSeller,
    });
  };
  validationNumber = (num) => {
    const patterPhone = new RegExp("[0-9]");
    let valid = patterPhone.test(num);
    if (valid) {
      return true;
    }
    return false;
  };
  editQty = (idx, prodActive) => {
    const { listSeller } = this.state;
    const { user } = this.props;
    let seller = listSeller[idx];

    if (seller.productLimit >= prodActive) {
      let choise = window.confirm(
        "are you sure to change " + seller.userName + " product quantity"
      );
      if (choise) {
        axios
          .put(
            "http://localhost:8080/api/user/product-limit?id=" +
            seller.userCode +
            "&limitProduct=" +
            seller.productLimit +
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
  doSearch = (target) => {
    const {
      filterStatus,
      filterRole,
      filterBy,
      fromDate,
      toDate,
      status,
      searchField } = this.state;
    let endpoint = "http://localhost:8080/api/user/filter?"
    // let endpoint =
    //   "http://localhost:8080/api/user/filter?status=" +
    //   filterStatus +
    //   "&field=" +
    //   filterRole +
    //   "&target=" +
    //   target;
    switch (filterBy) {
      case "userName":
        endpoint += "userName=" + searchField;
        break
      case "userCode":
        endpoint += "userCode=" + searchField;
        break
      case "status":
        endpoint += "status=" + status;
        break
      case "date":
        endpoint += "fromDate=" + fromDate + "&toDate=" + toDate;
        break
    }
    // if (filterBy === "userName") {
    //   endpoint += "userName=" + searchField;
    // } else if (filterBy === "userCode") {
    //   endpoint += "userCode=" + searchField;
    // } else if (filterBy === "status") {
    //   endpoint += "status=" + status;
    // } else if (filterBy === "date") {
    //   endpoint += "fromDate=" + fromDate + "&toDate=" + toDate;
    // }
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
      });
    });
    this.setState({ searchingStatus: true, querySearch: query });
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
        this.getSellerWithFilter("http://localhost:8080/api/user/filter?status=")
      }
    }
    this.setState({
      [name]: value,
    });
  };
  resetData = () => {
    this.getAllSeller(0);
    this.countSellerByStatus("all");
    this.setState({
      searchingStatus: false,
    });
  };
  render() {
    const { buttonAdminStat, classes, history, toogleMenu } = this.props;
    const {
      listSeller,
      statusNow,
      page,
      currentPage,
      filterStatus,
      filterRole,
      filterBy,
      // currentPage,
      status
    } = this.state;
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
        style={{ margin: 0 }}

      >
        <Grid container item xs={12}>
          <Menu
            history={history}
            toogleMenu={toogleMenu}
            buttonAdminStat={buttonAdminStat}
          />
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

        <Grid container item xs={12} style={{minHeight: "70vh"}}>
          {listSeller.map((user, i) => {
            return (
              <Grid
                item
                xs={4}
                className={classes.margin}
                key={i}
              // align="center"
              >
                <SellerCard
                  idx={i}
                  user={user}
                  history={history}
                  onClick={() => this.toogleStatus(i)}
                  onChange={this.setQty}
                  statusNow={statusNow}
                  editQty={this.editQty}
                />
              </Grid>
            );
          })}
        </Grid>

        <Grid container item xs={12}>
          <PaginationControlled count={page}
            page={currentPage} onChange={this.changePage} />
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
