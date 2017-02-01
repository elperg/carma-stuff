import React, { PropTypes } from 'react';
import { connect } from 'react-redux'

import ProjectNavigation from '../components/project-navigation';

class ProjectNavigationContainer extends React.Component {

  static propTypes = {
    projectUid      : PropTypes.string,
    organization    : PropTypes.object,
    selectedProject : PropTypes.object,
    user            : PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
  }

  render() {
    return (
      <ProjectNavigation {...this.props} />
    );
  }
}

const mapStateToProps = (state, ownProps) => {

  const selectedProject = _.find(state.projects.data, { uid: ownProps.projectUid });

  return {
    organization    : state.organization.data,
    selectedProject : selectedProject,
    user            : state.user.data
  };
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectNavigationContainer);
