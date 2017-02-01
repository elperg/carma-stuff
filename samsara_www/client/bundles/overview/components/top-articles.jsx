import React, { PropTypes } from 'react';
import _ from 'lodash';
import { Translate, Localize } from 'react-redux-i18n';

class TopArticles extends React.Component {

  static propTypes = {
    data : PropTypes.shape({
              online      : PropTypes.array.isRequired,
              traditional : PropTypes.array.isRequired
            }).isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {

    const { online, traditional } = this.props.data;

    let traditionalColumn, onlineColumn;

    //if(traditional.length > 0) {

      traditionalColumn = (
        <div className='traditional balanced-content'>
          <h3><Translate value='overviews.top_articles.traditional' /></h3>
        </div>
      );

   // }


   // if(online.length > 0) {

      onlineColumn = (
        <div className='online balanced-content'>
          <h3><Translate value='overviews.top_articles.online' /></h3>
        </div>
      );
  //  }


    return (
      <div className='top-articles'>
        <h2><Translate value='overviews.top_articles.heading' /></h2>

        <div className='flex-1to1'>
          {traditionalColumn}
          {onlineColumn}
        </div>

      </div>
    );

  }
}


export default TopArticles;

