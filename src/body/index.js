import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Switch } from 'react-router-dom';
import { Menu } from '../component';

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    console.log(this.props.isLogin);
    if (!this.props.isLogin) {
      return(
        <Redirect to='/login'/>
      )
    } else {
      return (
        <>
          <Switch>
            <Menu history={this.props.history}></Menu>

          </Switch>
        </>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return ({
    isLogin: state.auth.isLogin
  })
}
export default connect(mapStateToProps)(Body);