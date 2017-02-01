import React, { PropTypes } from 'react';
import moment from 'moment';
import _ from 'lodash';
import { Translate, Localize } from 'react-redux-i18n';
import { Link } from 'react-router';


class ExpertsHeroPostItem extends React.Component {

  static propTypes = {
          //  key : PropType.string,
            data    :  PropTypes.array

  };

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {

    const { data } =  this.props.data;

    const postMarkup = []

    const expertPostData = this.props.data.posts

    const publicUrl = window.location.origin + '/a/' + data;

  _.each(expertPostData, (eachPost, i) => {

      let workingStr = eachPost
//still have to do the links
    //  const postLink = {eachPost.link}
      //return console.log('each post data==>'+ JSON.stringify(eachPost) );
//<span dangerouslySetInnerHTML={ {__html: workingStr} } />

      postMarkup.push(
        <li className="article-links">
  <h4 classNames="date">{eachPost.date} </h4>
    <p className="title">{eachPost.title.rendered}</p>
  <h5 className="">
    READ MORE
  </h5>
</li>

       );

    return postMarkup;
    })

  //
  return (
    <ul className='post-item'>
      {postMarkup}
    </ul>

    )
  }
}

export default ExpertsHeroPostItem;
