import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Translate, Localize } from 'react-redux-i18n';

import ExpertsHeroPostItem from './expert-post-hero-item'

class ExpertsHeroPosts extends React.Component {

  static propTypes = {
    data : PropTypes.array,
    posts : PropTypes.array
  };

  state = {
    data: {},
      posts : []
  };

  componentDidMount() {
  }

  constructor(props, context) {
    super(props, context);
  }


render() {

 const { posts } = this.props.data;

 const postArr = this.props.data.posts;

 const featuredHeadline = [];

 //
        const firstPost =  _.head(postArr);


      //  const firstObj = _.find(firstPost, function(obj) { return obj.title });

           console.log('here is firstPost ==>'+ JSON.stringify(firstPost) );

      const postTitle = _.filter(firstPost, function(obj) { return obj;  });

      // const findTitle = _.find(postTitle,  { 'title':102  });



  _.each(postTitle, (findTitle, i) => {
    featuredHeadline.push(
      );
    return featuredHeadline
    })
  //  const findTitle = _.find(renderedTitle,  { 'title':102  });
  const renderedTitle = 'How Asset Management Giants Cause Volatility'

  // hard-coded for time restraints
    return (
<div>
    <h1 dangerouslySetInnerHTML={ {__html: renderedTitle} } />
  <ul className="article-links-list">
    <ExpertsHeroPostItem {...this.props} />
  </ul>
</div>
    );
  }
}

// Export the translate() wrapped version
export default ExpertsHeroPosts;
