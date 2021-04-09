import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  useParams,
} from "react-router-dom";
import {
  AdminProduct,
  AdminSeller,
  Login,
  Register,
  AdminHome,
  AdminSellerDetail,
  SellerProduct,
  SellerHome,
  SellerReport,
  CreateProduct,
  NotFound,
  UserInfo,
} from "./page";
import { Container } from "@material-ui/core";
import { connect } from "react-redux";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let isAdmin = this.props.userCode.includes("ADMIN");
    let isSeller = this.props.userCode.includes("SELLER");

    let adminPage = [];
    adminPage.push(
      <Route
        path="/admin/home"
        exact
        component={() => {
          let history = useHistory();
          return <AdminHome history={history} />;
        }}
      />
    );
    adminPage.push(
      <Route
        path="/admin/seller"
        exact
        component={() => {
          let history = useHistory();
          return <AdminSeller history={history} />;
        }}
      />
    );
    adminPage.push(
      <Route
        path="/admin/product"
        exact
        component={() => {
          let history = useHistory();
          return <AdminProduct history={history} />;
        }}
      />
    );
    adminPage.push(
      <Route
        path="/admin/account"
        exact
        component={() => {
          let history = useHistory();
          return <UserInfo history={history} />;
        }}
      />
    );
    adminPage.push(
      <Route
        path="/admin/seller/product/:id"
        exact
        component={() => {
          let history = useHistory();
          const { id } = useParams();
          return <AdminSellerDetail history={history} id={id} />;
        }}
      />
    );

    let sellerPage = [];
    sellerPage.push(
      <Route
        path="/seller/home"
        exact
        component={() => {
          let history = useHistory();
          return <SellerHome history={history} />;
        }}
      />
    );
    sellerPage.push(
      <Route
        path="/seller/product"
        exact
        component={() => {
          let history = useHistory();
          return <SellerProduct history={history} />;
        }}
      />
    );
    sellerPage.push(
      <Route
        path="/seller/account"
        exact
        component={() => {
          let history = useHistory();
          return <UserInfo history={history} />;
        }}
      />
    );
    sellerPage.push(
      <Route
        path="/seller/product/report"
        exact
        component={() => {
          let history = useHistory();
          return <SellerReport history={history} />;
        }}
      />
    );
    sellerPage.push(
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
            />
          );
        }}
      />
    );
    return (
      <Container maxWidth="xl" className="container">
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
            {isAdmin && adminPage.map((e) => e)}
            {isSeller && sellerPage.map((e) => e)}
            <Route
              component={() => {
                let history = useHistory();
                return <NotFound history={history}></NotFound>;
              }}
            />
          </Switch>
        </Router>
      </Container>
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
