import React, { PropTypes } from 'react';
import _ from 'lodash';
import { Translate, Localize } from 'react-redux-i18n';

class RegionalSentiment extends React.Component {

  static propTypes = {
    data    : PropTypes.array.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {

    const { data } = this.props;

    return (
      <div>
        <h2 className='section__heading'><Translate value='overviews.regional_sentiment.heading' /></h2>

        <div id='overview-regional-sentiment-map' style={ { width:'100%', height: '200px' } }>
          MAP GOES HERE
        </div>

      </div>
    );

  }
}


export default RegionalSentiment;

