import React, { PropTypes } from 'react';
import { connect } from 'react-redux'

import Social from '../components/social';

class SocialContainer extends React.Component {

  static propTypes = {
    talkwalkerUserId : PropTypes.string
  };

  static contextTypes = {
    router: React.PropTypes.object
  };


  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (<Social {...this.props} />);
  }
}

const mapStateToProps = (state, ownProps) => {

  const selectedProject = _.find(state.projects.data, { uid: ownProps.params.projectUid });

  return {
    talkwalkerUserId  : selectedProject.talkwalkerUserId
  };
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SocialContainer);

