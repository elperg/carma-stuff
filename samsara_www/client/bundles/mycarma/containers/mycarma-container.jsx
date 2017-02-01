import React, { PropTypes } from 'react';
import { connect } from 'react-redux'

import MyCarma from '../components/mycarma';

class MyCarmaContainer extends React.Component {

  static propTypes = {
    myCarmaUserToken : PropTypes.string
  };

  static contextTypes = {
    router: React.PropTypes.object
  };


  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (<MyCarma {...this.props} />);
  }
}

const mapStateToProps = (state, ownProps) => {

  const selectedProject = _.find(state.projects.data, { uid: ownProps.params.projectUid });

  return {
    myCarmaUserToken  : selectedProject.myCarmaUserToken
  };
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCarmaContainer);

