import React, { PropTypes } from 'react';
import { connect } from 'react-redux'

import logout from '../actions/logout';

class LogoutContainer extends React.Component {

  static propTypes = {
    logout      : PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.props.logout();
  }

  render() {
    return (<div></div>);
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout : () => { dispatch(logout()); }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutContainer);

