import React, { PropTypes } from 'react';
import moment from 'moment';
import _ from 'lodash';
import { Translate, Localize } from 'react-redux-i18n';
import { Link } from 'react-router';


class ExpertsPostItem extends React.Component {

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

    //  const postLink = {eachPost.link}

      //return console.log('each post data==>'+ JSON.stringify(eachPost) );
//<span dangerouslySetInnerHTML={ {__html: workingStr} } />

      postMarkup.push(
        <li value='' className="expert-article">
        <h4 className="date"> {eachPost.date} </h4>
        <h5 className="byline">
          {eachPost.author.name}
        </h5>
        <h1 className="title">{eachPost.title.rendered}</h1>
        <p dangerouslySetInnerHTML={ {__html: eachPost.excerpt.rendered} } />

      </li>

       );

    return postMarkup;
    })

/*

<h5 className="byline">
  <Link to={postLink}>Amy Whyte</Link>
</h5>
<h1><Link to={postLink}>{eachPost.title}</Link></h1>

<p>Large trades made by the industry’s biggest firms can translate into “substantial price pressure,” according to research. America’s largest asset managers can have an outsized impact on volatility&nbsp;and pricing in equity markets, research has suggested. Given the sheer size of their holdings, trades made by these managers “leave a large footprint in the market,” found … <a href="https://carmaexperts.wpengine.com/archives/102" class="more-link">Continue reading<span class="screen-reader-text"> “How Asset Management Giants Cause Volatility”</span></a></p>


    const eachPost = _.forEach( projectElems, function(value) {
return  console.log( 'each post data==>'+ JSON.stringify( value.id ) );
      (<li>{value.id}</li>);
});
*/

  //
  return (
    <ul className='post-item'>
      {postMarkup}
    </ul>

  )


  }
}


export default ExpertsPostItem;
