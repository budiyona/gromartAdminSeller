import {
  FormControl,
  Grid,
  MenuItem,
  Select,
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
const useStyles = (theme) => ({
  margin: {
    marginBottom: theme.spacing(2),
  },
  formControl: {
    width: "100%",
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
      status: ["requested", "active", "inactive"],
      statusNow: "requested",
      sellerPage: 0,

      filterStatus: "all",
      filterRole: "userName",

      querySearch: "",
      searchingStatus: false,
    };
  }
  componentDidMount() {
    this.getAllSeller(0);
    this.countSellerByStatus("all");
  }
  countSellerByStatus = (status) => {
    axios
      .get("http://localhost:8080/api//user/count-seller?status=" + status)
      .then((res) => {
        this.setState({
          sellerPage: Math.ceil(res.data / 6),
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
    const { status, listSeller } = this.state;
    const { user } = this.props;
    let newStatusIndex = status.findIndex(
      (el) => listSeller[idx].status === el
    );
    if (newStatusIndex >= 2) {
      newStatusIndex = 0;
    } else {
      newStatusIndex++;
    }
    let newUser = {
      ...listSeller[idx],
      status: status[newStatusIndex],
    };
    let newListSeller = listSeller;
    newListSeller.splice(idx, 1, newUser);
    if (
      window.confirm(
        "are you sure to change " + newUser.userName + " product Qty"
      )
    ) {
      axios
        .put(
          "http://localhost:8080/api/user/status?id=" +
            newUser.userCode +
            "&status=" +
            status[newStatusIndex] +
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
  editQty = (idx, curlimit) => {
    const { listSeller } = this.state;
    const { user } = this.props;
    let seller = listSeller[idx];

    if (seller.productLimit >= curlimit) {
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
  changePage = (page) => {
    console.log("changePage");
    const { searchingStatus, querySearch } = this.state;
    let offset = (page - 1) * 6;
    if (searchingStatus) {
      this.getSellerWithFilter(querySearch, offset);
    } else {
      this.getAllSeller(offset);
    }
  };
  doSearch = (target) => {
    const { filterStatus, filterRole } = this.state;
    let endpoint =
      "http://localhost:8080/api/user/filter?status=" +
      filterStatus +
      "&field=" +
      filterRole +
      "&target=" +
      target;
    // console.log("endpointnksjdfndj", endpoint);
    this.getSellerWithFilter(endpoint, 0);
  };
  getSellerWithFilter = (query, offset) => {
    let queryOffset = "&offset=" + offset;
    axios.get(query + queryOffset).then((res) => {
      console.log(res.data);
      this.setState({
        listSeller: res.data.seller,
        sellerPage: Math.ceil(res.data.qty / 6),
      });
    });
    this.setState({ searchingStatus: true, querySearch: query });
  };
  setFilterValue = (e) => {
    const { name, value } = e.target;
    console.log(value, name);
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
    const { buttonAdminStat, classes, history, toogleMenu} = this.props;
    const {
      listSeller,
      statusNow,
      sellerPage,
      filterStatus,
      filterRole,
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
          />
        </Grid>

        <Grid
          container
          item
          xs={12}
          justify="center"
          className={classes.margin}
          spacing={3}
        >
          <Grid item xs={3}>
            <FormControl className={classes.formControl} size="small">
              <Select
                size="small"
                value={filterStatus}
                name="filterStatus"
                onChange={(e) => this.setFilterValue(e)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl className={classes.formControl} size="small">
              <Select
                size="small"
                name="filterRole"
                value={filterRole}
                onChange={(e) => this.setFilterValue(e)}
              >
                <MenuItem value="userName">Name</MenuItem>
                <MenuItem value="userCode">UserCode</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <SearchField
              onClick={this.doSearch}
              resetData={this.resetData}
            ></SearchField>
          </Grid>
        </Grid>

        <Grid container item xs={12}>
          {listSeller.map((user, i) => {
            return (
              <Grid
                item
                xs={4}
                className={classes.margin}
                key={i}
                align="center"
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
          <PaginationControlled page={sellerPage} onClick={this.changePage} />
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
