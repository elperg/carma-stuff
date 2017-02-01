import React, { PropTypes } from 'react';
import _ from 'lodash';
import Tooltip from 'lib/components/tooltip';

class MediaTypeSentimentBar extends React.Component {

  static propTypes = {
    label       : PropTypes.string.isRequired,
    sentiments  : PropTypes.arrayOf(PropTypes.shape({
                    label     : PropTypes.string.isRequired,
                    className : PropTypes.oneOf(['negative', 'somewhat_negative', 'neutral', 'positive', 'somewhat_positive']).isRequired,
                    pct       : PropTypes.number.isRequired,
                    tooltip   : PropTypes.string.isRequired
                  })).isRequired
  };

  constructor(props, context) {
    super(props, context);
  }


  render() {

    const { label, sentiments } = this.props;

    // generate a unique ID for the bar tooltip to avoid conflicts
    const idPrefix = _.uniqueId('media-type-sentiment-bar_');

    const barSegments = sentiments.map((sentiment) => {

      const id = idPrefix + '-' + sentiment.label;

      return (
        <span
          className={`bar-chart__segment bar-chart__segment--${sentiment.className} hint--right`}
          style={ {width: (sentiment.pct*100)+'%' } }
          data-tip
          data-for={id}
        >
          <Tooltip id={id}>{tooltip}</Tooltip>
        </span>
      );

    });

    return (
      <li className='bar-chart__bar'>>
        <span className='bar-chart__label'>{label}</span>
        {barSegments}
      </li>
    );

  }
}


export default MediaTypeSentimentBar;

