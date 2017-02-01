import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import SMEnavigation from '../components/sme-nav'

import fetchLatestPosts from '../actions/fetch-latest-posts';



class ExpertsAuthorContainer extends React.Component {

  static propTypes = {
     projectUid      : PropTypes.string,
     organization    : PropTypes.object,
     selectedProject : PropTypes.object,
     user            : PropTypes.object
  };

  static contextTypes = {
    router: React.PropTypes.object
  };


  constructor(props, context) {
    super(props, context);
  }

  render() {

    return (

  <div className='article-list-app flex-1to4'>

        <SMEnavigation  {...this.props} />

<h1>Experts</h1>

<Experts className='expert-index'/>

</div>
    );
  }
};

const ownProps = {
  projectUid : 1234
}
//ownProps.projectUid
const mapStateToProps = (state, ownProps) => {

  const selectedCategory =  { catID: 76547  };

  return {
    organization    : state.organization.data,
    selectedCategory : selectedCategory,
    user            : state.user.data
  };
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  fetchLatestPosts: () => { dispatch(fetchLatestPosts(ownProps.params.projectUid) ); }
  }
}

//mapStateToProps, mapDispatchToProps
export default connect(mapStateToProps, mapDispatchToProps )(ExpertsAuthorContainer);
