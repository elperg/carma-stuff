import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import fetchLatestPosts from '../actions/fetch-latest-posts';

import Loader from 'lib/components/loader';

import ProjectNavigationContainer from '../../nav/containers/project-navigation-container';

import SMEnavigationContainer from '../containers/sme-nav-container';

import ExpertsPosts from '../components/experts-posts';

import ExpertsHeroPosts from '../components/experts-hero-posts';


class ExpertsIndexAppContainer extends React.Component {

  static propTypes = {
    isBusy  : PropTypes.bool.isRequired,
    data :   PropTypes.array,

    fetchLatestPosts   : PropTypes.func.isRequired
  };

  static contextTypes = {
    router: React.PropTypes.object
  };


  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
      this.props.fetchLatestPosts();
  }



  render() {

    const { data } = this.props;
    const postArr = this.props.data.posts;

    return (

  <div className='industry-experts'>

  <SMEnavigationContainer  {...this.props} />

  <div className='expert-hero'>

  <ExpertsHeroPosts  {...this.props}  />
  </div>

    <div className="expert-bio">Author-- provide unique insights into the news and trends that impact your industry. Leveraging meaningful data coupled with their own extensive experience, our team delivers what matters.
      </div>

      <div className="expert-section-content">
      <ExpertsPosts  {...this.props}  />
      </div>

</div>

    );
  }
};

//data={data.featuredArticle}

const mapStateToProps = (state, ownProps) => {

//console.log('get projectUid==>'+ state.experts.data);

  return {
  isBusy    : state.experts.isBusy,
  data   : state.experts.data,
  retrieved : state.experts.retrieved
  };
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  fetchLatestPosts: () => {
    const projectUid= (ownProps.params.projectUid);
   dispatch(fetchLatestPosts(projectUid) );
    }
  }
}
//mapStateToProps, mapDispatchToProps
export default connect(mapStateToProps, mapDispatchToProps )(ExpertsIndexAppContainer);
