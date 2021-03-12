import { Grid, ThemeProvider, withStyles } from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";
import { Menu, PaginationControlled, SellerCard } from "../../component";
import moment from "moment";
import { connect } from "react-redux";
const useStyles = (theme) => ({
  margin: {
    marginBottom: theme.spacing(2),
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
          prodQty: 0,
        },
      ],
      status: ["requested", "active", "inactive"],
      statusNow: "requested",
      sellerPage: 0,
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
          sellerCount: Math.ceil(res.data / 6),
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
    console.log("setvalue", e.target.name, e.target.value, idx);

    const { listSeller } = this.state;
    const currSeller = listSeller[idx];

    currSeller.prodQty = e.target.value;

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
  editQty = (idx) => {
    const { listSeller } = this.state;
    const { user } = this.props;
    let seller = listSeller[idx];
    let choise = window.confirm(
      "are you sure to change " + seller.userName + " product quantity"
    );
    if (choise) {
      axios
        .put(
          "http://localhost:8080/api/user/product-qty?id=" +
            seller.userCode +
            "&qty=" +
            seller.prodQty +
            "&idAdmin=" +
            user.userCode
        )
        .then((res) => {
          if (res.status) {
            alert("product has been change");
          }
        });
    }
    console.log(choise);
  };
  changePage = (page) => {
    console.log("changePage");
    let offset = (page - 1) * 6;
    this.getAllSeller(offset);
  };
  render() {
    const { buttonAdminStat, classes, history, toogleMenu } = this.props;
    const { listSeller, statusNow, sellerCount } = this.state;

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
        <Grid container item xs={12} className={classes.margin}>
          {listSeller.map((user, i) => {
            return (
              <Grid item xs={4} className={classes.margin} key={i}>
                <SellerCard
                  idx={i}
                  user={user}
                  history={history}
                  onClick={() => this.toogleStatus(i)}
                  statusNow={statusNow}
                  setQty={this.setQty}
                  editQty={() => this.editQty(i)}
                />
              </Grid>
            );
          })}
        </Grid>

        <Grid container item xs={12}>
          <PaginationControlled page={sellerCount} onClick={this.changePage} />
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
