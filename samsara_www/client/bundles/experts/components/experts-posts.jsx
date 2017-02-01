import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Translate, Localize } from 'react-redux-i18n';

import ExpertsPostItem from './expert-post-item'

class ExpertsPosts extends React.Component {

  static propTypes = {
    data : PropTypes.array,
    posts : PropTypes.array
  };

  state = {
    data: {},
      posts : []
  };

  componentDidMount() {
  //  this.setState({
    //   data: this.props.data
    // });
  }

  constructor(props, context) {
    super(props, context);
  }


render() {

 const { posts } = this.props.data;

 const postArr = this.props.data.posts;

  // console.log('here is the posts ==>'+ posts  );

//    console.log('here is the postArr ==>'+ postArr  );



    return (

  <ul className='profile flex-1to1'>
<ExpertsPostItem {...this.props} />
  </ul>

    );

  }
}

// Export the translate() wrapped version
export default ExpertsPosts;
