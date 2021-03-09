import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { Container } from "@material-ui/core";
import { AdminSeller, Login, Register } from "./page";

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
        this.setState({
          buttonAdminStat: newStat,
        });
        break;
      case "product":
        newStat = {
          home: false,
          product: true,
          seller: false,
          account: false,
        };
        this.setState({
          buttonAdminStat: newStat,
        });
        break;
      case "seller":
        newStat = {
          home: false,
          product: false,
          seller: true,
          account: false,
        };
        this.setState({
          buttonAdminStat: newStat,
        });
        break;
      default:
        newStat = {
          home: false,
          product: false,
          seller: false,
          account: true,
        };
        this.setState({
          buttonAdminStat: newStat,
        });
        break;
    }
  };
  render() {
    const { buttonAdminStat } = this.state;
    let adminPage = (
      <Container maxWidth="md" spacing={3}>
        <Route
          path="/admin/home"
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
          path="/admin/seller"
          exact
          component={() => {
            let history = useHistory();
            return <></>;
          }}
        />
        <Route
          path="/admin/product"
          exact
          component={() => {
            let history = useHistory();
            return <></>;
          }}
        />
        <Route
          path="/admin/info"
          exact
          component={() => {
            let history = useHistory();
            return <></>;
          }}
        />
      </Container>
    );
    let sellerPage = (
      <Container maxWidth="md" spacing={3}>
        <Route
          path="/seller/home"
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
          path="/seller/product"
          exact
          component={() => {
            let history = useHistory();
            return <></>;
          }}
        />
        <Route
          path="/seller/info"
          exact
          component={() => {
            let history = useHistory();
            return <></>;
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
            path="/login"
            exact
            component={() => {
              let history = useHistory();
              return <Login history={history}></Login>;
            }}
          />
          {adminPage}
        </Switch>
      </Router>
    );
  }
}

export default App;
//page
//--navbar
//--body
//----switch
//----content dari body
