import React, { PropTypes } from 'react';
import { connect } from 'react-redux'

import Loader from 'lib/components/loader';

import changePassword from '../actions/change-password';
import fetchDigests from '../actions/fetch-digests';
import updateDigests from '../actions/update-digests';
import updateProfile from '../actions/update-profile';


import Profile from '../components/profile';

class ProfileAppContainer extends React.Component {

  static propTypes = {
    user              : PropTypes.object.isRequired,
    digestsByProject  : PropTypes.array,
    projects          : PropTypes.array,

    isUpdatingProfile   : PropTypes.bool.isRequired,
    isUpdatingDigests   : PropTypes.bool.isRequired,

    passwordErrors  : PropTypes.array,

    fetchDigests  : PropTypes.func.isRequired,
    updateProfile : PropTypes.func.isRequired,
    updateDigests : PropTypes.func.isRequired,
    changePassword: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.props.fetchDigests();
  }

  render() {
    return (
      <Loader loaded={(!this.props.isUpdatingProfile && !this.props.isUpdatingDigests)}>
        <Profile {...this.props} />
      </Loader>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user                : state.user.data,
    digestsByProject    : state.digests.data,
    projects            : state.projects.data,

    isUpdatingProfile   : state.user.isBusy,
    isUpdatingPassword  : state.user.isBusy,
    isUpdatingDigests   : state.digests.isBusy,

    passwordErrors      : state.user.passwordErrors
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchDigests  : () => { dispatch(fetchDigests()); },
    updateProfile : (newProps) => { dispatch(updateProfile(newProps)); },
    updateDigests : (newProps) => { dispatch(updateDigests(newProps)); },
    changePassword: (oldPassword, newPassword) => { dispatch(changePassword(oldPassword, newPassword)); },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAppContainer);

