import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'


import fetchOrganizations from '../actions/fetch-organizations';
import Loader from 'lib/components/loader';

import OrganizationList from '../components/organization-list';

class OrganizationsAppContainer extends React.Component {

  static propTypes = {
    isCarmaStaff        : PropTypes.bool,
    isBusy              : PropTypes.bool.isRequired,
    organizations       : PropTypes.array.isRequired,
    fetchOrganizations  : PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    if(this.props.isCarmaStaff === true) {
      this.props.fetchOrganizations();
    } else {
      // re-route to project listing if their not carma staff
      browserHistory.push('/projects');
    }
  }

  render() {

    return (
      <div className='organization-app'>
        <Loader loaded={!this.props.isBusy}>
          <OrganizationList organizations={this.props.organizations} />
        </Loader>
      </div>
    );
  }

}



const mapStateToProps = (state, ownProps) => {
  return {
    isCarmaStaff  : state.user.data.carmaStaff,
    isBusy        : state.organizationsIndex.isBusy,
    organizations : state.organizationsIndex.data
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchOrganizations: () => { dispatch(fetchOrganizations()); }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(OrganizationsAppContainer);
