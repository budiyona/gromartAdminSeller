import React, { Component } from 'react';
import { Menu } from './component';
import Login from './page/login';
import Signup from './page/register';
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import Register from './page/register';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={
            () => {
              let history = useHistory()
              return <Menu history={history}></Menu>
            }
          } />
          <Route path="/register" exact component={
            () => {
              let history = useHistory()
              return <Register history={history}></Register>
            }
          } />

          <Route path="/login" exact component={
            () => {
              let history = useHistory()
              return <Login  history={history}></Login>
            }
          } />

          <Route path="/signup" exact component={
            () => {
              let history = useHistory()
              return <Menu history={history}></Menu>
            }
          } />
        </Switch>
      </Router>
    );
  }
}

export default App;