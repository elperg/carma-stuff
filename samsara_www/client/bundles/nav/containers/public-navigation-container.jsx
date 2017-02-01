import React, { PropTypes } from 'react';
import { connect } from 'react-redux'

import PublicNavigation from '../components/public-navigation';

class PublicNavigationContainer extends React.Component {

  static propTypes = {
    organization  : PropTypes.object,
    user          : PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
  }

  render() {
    return (
      <PublicNavigation {...this.props} />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    organization  : state.organization.data,
    user          : state.user.data
  };
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicNavigation);

