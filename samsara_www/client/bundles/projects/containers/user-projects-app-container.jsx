import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import ProjectList from '../components/project-list';

class UserProjectsAppContainer extends React.Component {

  static propTypes = {
    projects: PropTypes.array.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
  }

  render() {

    return (
      <div className='projects-list'>
        <ProjectList projects={this.props.projects} />
      </div>
    );
  }

}



const mapStateToProps = (state, ownProps) => {
  return {
    projects: state.projects.data
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}



export default connect(mapStateToProps, mapDispatchToProps)(UserProjectsAppContainer);
