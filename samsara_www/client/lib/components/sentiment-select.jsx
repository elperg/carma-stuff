import React, { PropTypes } from 'react';
import { Translate, Localize } from 'react-redux-i18n';

import _ from 'lodash';

import { SentimentLevels } from 'lib/app-constants';

export class SentimentSelect extends React.Component {

  static propTypes = {
    values        : PropTypes.array,
    levels        : PropTypes.oneOf([3,5]),
    onChange      : PropTypes.func.isRequired
  };

  static defaultProps = {
    levels        : 3
  };

  state = {
    selectedValues  : []
  }

  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'onClickSentiment');
  }

  componentWillMount() {
    this.setState({ selectedValues: this.props.values || [] });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ selectedValues: nextProps.values });
  }

  onClickSentiment(sentimentIndex, shouldInclude) {

    // Start with an array of the sentiments we're going to add/remove
    let modifyingSentiments = [SentimentLevels[sentimentIndex]];

    // If we're only using 3 levels, we'll want to add "somewhat_[sentiment]" to modifying values
    if(this.props.levels === 3 && (sentimentIndex !== 2)) {

      if(sentimentIndex === 0) {

        // if negative, add "somewhat_negative"
        modifyingSentiments.push(SentimentLevels[1]);

      } else if(sentimentIndex === 4) {

        // if positive, add "somewhat_positive"
        modifyingSentiments.push(SentimentLevels[3]);

      }

    }

    // make a copy of our state's selectedValues to add/remove to
    let includedSentiments = this.state.selectedValues.slice(0);

    // To include the sentiments, find the union of current state and the new sentiments
    // To remove them, find the difference
    if(shouldInclude === true) {
      includedSentiments = _.union(includedSentiments, modifyingSentiments);
    } else {
      includedSentiments = _.difference(includedSentiments, modifyingSentiments);
    }

    // Update state
    this.setState({ selectedValues: includedSentiments });

    // fire the 'onChange' method from props with the new selected values
    this.props.onChange(includedSentiments);

  }

  render() {

    const sentimentOptionLevels = (this.props.levels === 3) ? _.without(SentimentLevels, SentimentLevels[1], SentimentLevels[3]) : SentimentLevels.slice(0);

    // compose a set of checkbox-style elements
    const sentimentOptions = sentimentOptionLevels.map((sentiment) => {

      const sentimentIndex = SentimentLevels.indexOf(sentiment);

      // it's checked if the sentiment is in our selectedValues state
      const isChecked = (this.state.selectedValues.indexOf(sentiment) > -1);
      const labelClassName = (isChecked === true) ? 'checked' : '';

      const idAttr = `article_filter_sentiments_${sentiment}`;

      return (
              <span
                ref={`${sentiment}-checkbox`}
                key={`${sentiment}-checkbox`}
                className='checkbox toggle'
                onClick={(e) => { e.preventDefault(); this.onClickSentiment(sentimentIndex, !isChecked); }}
              >
                <label htmlFor={idAttr} className={labelClassName}>
                  <input
                    className='toggle_check_boxes optional toggle__input'
                    type='checkbox'
                    value={sentiment}
                    checked={isChecked}
                    name='article_filter[sentiments][]'
                    id={idAttr}
                    readOnly
                  />
                  <span className='toggle__label'><Translate value={`sentiments.${sentiment}`} /></span>
                </label>
              </span>
              );
    });

    return (
      <div className='input toggle_check_boxes optional article_filter_sentiments'>
        {sentimentOptions}
      </div>
    );
  }

}


export default SentimentSelect;

