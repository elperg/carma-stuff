import React, { PropTypes } from 'react';
import { connect } from 'react-redux'

import login from '../actions/login';
import resetPassword from '../actions/reset-password';

import Login from '../components/login';

class LoginContainer extends React.Component {

  static propTypes = {
    isBusy        : PropTypes.bool.isRequired,
    isLoggedIn    : PropTypes.bool.isRequired,
    login         : PropTypes.func.isRequired,
    resetPassword : PropTypes.func.isRequired
  };

  static contextTypes = {
    router: React.PropTypes.object
  };


  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (<Login {...this.props} />);
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isBusy      : state.user.isBusy,
    isLoggedIn  : state.user.isLoggedIn,
    isPopulated : state.user.isPopulated
  };
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login : (email, password) => { dispatch(login(email, password)); },
    resetPassword : (email) => { dispatch(resetPassword(email)); }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

