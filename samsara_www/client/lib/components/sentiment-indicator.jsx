import React, { PropTypes } from 'react';
import { Translate, Localize } from 'react-redux-i18n';
import { SentimentLevels } from 'lib/app-constants';

export class SentimentIndicator extends React.Component {


  static propTypes = {
    sentiment     : PropTypes.oneOf(SentimentLevels).isRequired,
    levels        : PropTypes.oneOf([3,5]),
    includeLabel  : PropTypes.bool,
    labelPosition : PropTypes.string
  };

  static defaultProps = {
    includeLabel  : true,
    levels        : 5,
    labelPosition : 'right'
  };

  constructor(props) {
    super(props);
  }

  render() {
    // i18n
    const { sentiment, levels, includeLabel } = this.props;

    const sentimentClassName = (levels === 3) ? sentiment.replace('somewhat_','') : sentiment;

    const sentimentLabel = (includeLabel === true) ? <span className='label'><Translate value={`sentiments.${sentiment}`} /></span> : undefined;

    const sentimentDotLevels = (levels === 3) ? _.without(SentimentLevels, SentimentLevels[1], SentimentLevels[3]) : SentimentLevels.slice(0);

    const sentimentDots = sentimentDotLevels.map((level) => {
      return (<span key={level} className={`icon ${level}`}></span>);
    });

    switch(this.props.labelPosition.toLowerCase()) {

      case 'left':
        return (
          <span className={`sentiment-indicator mini label-left ${sentimentClassName}`}>
            {sentimentLabel}
            {sentimentDots}
          </span>
        );


      default:
        return (
          <span className={`sentiment-indicator mini label-right ${sentimentClassName}`}>
            {sentimentDots}
            {sentimentLabel}
          </span>
        );
    }
  }

}

export default SentimentIndicator;
