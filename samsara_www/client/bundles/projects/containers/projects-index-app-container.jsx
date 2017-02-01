import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'


import fetchProjects from '../actions/fetch-projects';
import Loader from 'lib/components/loader';

import ProjectList from '../components/project-list';

class ProjectsIndexAppContainer extends React.Component {

  static propTypes = {
    isCarmaStaff    : PropTypes.bool,
    isBusy          : PropTypes.bool.isRequired,
    projects        : PropTypes.array.isRequired,
    fetchProjects   : PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    if(this.props.isCarmaStaff === true) {
      this.props.fetchProjects(this.props.params.organizationId);
    } else {
      // re-route to project listing if their not carma staff
      browserHistory.push('/projects');
    }
  }

  render() {

    return (
      <div className='projects-list-app'>
        <Loader loaded={!this.props.isBusy}>
          <ProjectList projects={this.props.projects} />
        </Loader>
      </div>
    );
  }

}



const mapStateToProps = (state, ownProps) => {
  return {
    isCarmaStaff  : state.user.data.carmaStaff,
    isBusy        : state.projectsIndex.isBusy,
    projects      : state.projectsIndex.data
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchProjects: (organizationId) => { dispatch(fetchProjects(organizationId)); }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(ProjectsIndexAppContainer);
