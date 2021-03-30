import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  useParams,
} from "react-router-dom";
import { Container } from "@material-ui/core";
import {
  AdminInfo,
  AdminProduct,
  AdminSeller,
  Login,
  Register,
  AdminHome,
  AdminSellerDetail,
  SellerAccount,
  SellerProduct,
  SellerHome,
  SellerReport,
  CreateProduct,
} from "./page";
import { connect } from "react-redux";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonAdminStat: {
        home: true,
        product: false,
        seller: false,
        account: false,
      },
    };
  }
  toogleMenu = (buttonName) => {
    let newStat = {};
    switch (buttonName) {
      case "home":
        newStat = {
          home: true,
          product: false,
          seller: false,
          account: false,
        };
        break;
      case "product":
        newStat = {
          home: false,
          product: true,
          seller: false,
          account: false,
        };
        break;
      case "seller":
        newStat = {
          home: false,
          product: false,
          seller: true,
          account: false,
        };
        break;
      default:
        newStat = {
          home: false,
          product: false,
          seller: false,
          account: true,
        };

        break;
    }
    this.setState({
      buttonAdminStat: newStat,
    });
  };
  render() {
    const { buttonAdminStat } = this.state;
    let isAdmin = this.props.userCode.includes("ADMIN");
    let adminPage = (
      <Container maxWidth="xl" spacing={3}>
        <Route
          path="/admin/home"
          exact
          component={() => {
            let history = useHistory();
            return (
              <AdminHome
                history={history}
                buttonAdminStat={buttonAdminStat}
                toogleMenu={this.toogleMenu}
              />
            );
          }}
        />
        <Route
          path="/admin/seller"
          exact
          component={() => {
            let history = useHistory();
            return (
              <AdminSeller
                history={history}
                buttonAdminStat={buttonAdminStat}
                toogleMenu={this.toogleMenu}
              />
            );
          }}
        />
        <Route
          path="/admin/product"
          exact
          component={() => {
            let history = useHistory();
            return (
              <AdminProduct
                history={history}
                buttonAdminStat={buttonAdminStat}
                toogleMenu={this.toogleMenu}
              />
            );
          }}
        />
        <Route
          path="/admin/account"
          exact
          component={() => {
            let history = useHistory();
            return (
              <AdminInfo
                history={history}
                buttonAdminStat={buttonAdminStat}
                toogleMenu={this.toogleMenu}
              />
            );
          }}
        />
        <Route
          path="/admin/product/:id"
          exact
          component={() => {
            let history = useHistory();
            const { id } = useParams();
            return (
              <AdminSellerDetail
                history={history}
                id={id}
                buttonAdminStat={buttonAdminStat}
                toogleMenu={this.toogleMenu}
              />
            );
          }}
        />
      </Container>
    );
    let sellerPage = (
      <Container maxWidth="xl"  spacing={3}>
        <Route
          path="/seller/home"
          exact
          component={() => {
            let history = useHistory();
            return (
              <SellerHome
                history={history}
                buttonAdminStat={buttonAdminStat}
                toogleMenu={this.toogleMenu}
              />
            );
          }}
        />
        <Route
          path="/seller/product"
          exact
          component={() => {
            let history = useHistory();
            return (
              <SellerProduct
                history={history}
                buttonAdminStat={buttonAdminStat}
                toogleMenu={this.toogleMenu}
              />
            );
          }}
        />
        <Route
          path="/seller/account"
          exact
          component={() => {
            let history = useHistory();
            return (
              <SellerAccount
                history={history}
                buttonAdminStat={buttonAdminStat}
                toogleMenu={this.toogleMenu}
              />
            );
          }}
        />
        <Route
          path="/seller/report"
          exact
          component={() => {
            let history = useHistory();
            return (
              <SellerReport
                history={history}
                buttonAdminStat={buttonAdminStat}
                toogleMenu={this.toogleMenu}
              />
            );
          }}
        />
        <Route
          path="/seller/product/:toDo"
          exact
          component={() => {
            let history = useHistory();
            const { toDo } = useParams();

            return (
              <CreateProduct
                history={history}
                toDo={
                  toDo === "create" ? "create" : toDo === "update" && "update"
                }
                buttonAdminStat={buttonAdminStat}
                toogleMenu={this.toogleMenu}
              />
            );
          }}
        />
      </Container>
    );
    return (
      <Router>
        <Switch>
          <Route
            path="/register"
            exact
            component={() => {
              let history = useHistory();
              return <Register history={history}></Register>;
            }}
          />
          <Route
            path="/"
            exact
            component={() => {
              let history = useHistory();
              return <Login history={history}></Login>;
            }}
          />
          <Route
            path="/login"
            exact
            component={() => {
              let history = useHistory();
              return <Login history={history}></Login>;
            }}
          />
          {isAdmin ? adminPage : sellerPage}
        </Switch>
      </Router>
    );
  }
}
const mapStatToProps = (state) => {
  const { user } = state.auth;
  return {
    userCode: user.userCode,
  };
};
export default connect(mapStatToProps)(App);
