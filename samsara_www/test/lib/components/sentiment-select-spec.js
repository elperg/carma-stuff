import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import { SentimentLevels } from 'client/lib/app-constants';

import { SentimentSelect } from 'client/lib/components/sentiment-select';

describe('Sentiment Select', () => {

  let component, props, sentimentLevels;

  beforeEach(() => {

    props ={
      levels        : 3,
      values        : [],
      onChange      : (newVals) => newVals
    };

  });

  it('should render checkbox <span>s for each sentiment when levels are 3', () => {

    sentimentLevels = _.without(SentimentLevels, SentimentLevels[1], SentimentLevels[3]);
    props.levels = sentimentLevels.length;

    component = TestUtils.renderIntoDocument(<SentimentSelect {...props} />);

    _.each(sentimentLevels, (sentiment) => {
      let refName = `${sentiment}-checkbox`;
      expect(component.refs[refName]).not.toBeUndefined();
    });

  });

  it('should render checkbox <span>s for each sentiment when levels are 5', () => {

    sentimentLevels = SentimentLevels.slice(0);
    props.levels = sentimentLevels.length;

    component = TestUtils.renderIntoDocument(<SentimentSelect {...props} />);

    _.each(sentimentLevels, (sentiment) => {
      let refName = `${sentiment}-checkbox`;
      expect(component.refs[refName]).not.toBeUndefined();
    });

  });

  it('should set render label elements with className="checked" if its included in props.values', () => {

    sentimentLevels = _.without(SentimentLevels, SentimentLevels[1], SentimentLevels[3]);
    props.levels = sentimentLevels.length;

    // pick a sentiment to remove from props before we render
    const missingSentiment = sentimentLevels[0];
    props.values = _.without(sentimentLevels, missingSentiment);

    component = TestUtils.renderIntoDocument(<SentimentSelect {...props} />);

    _.each(sentimentLevels, (sentiment) => {
      let sentimentSpan = component.refs[`${sentiment}-checkbox`];

      if(sentiment === missingSentiment) {
        // should NOT have class 'checked'
        expect(/checked/.test(sentimentSpan.children[0].className)).toBeFalsy();
      } else {
        // should have class 'checked'
        expect(/checked/.test(sentimentSpan.children[0].className)).toBeTruthy();
      }
    });

  });

  it('should call props.onChange() with an array of selected values when an item is checked/unchecked', () => {

    // populate with 0 elements selected
    props.values = [];

    spyOn(props, 'onChange');

    component = TestUtils.renderIntoDocument(<SentimentSelect {...props} />);

    const sentimentToAdd = sentimentLevels[0];
    const sentimentSpan = component.refs[`${sentimentToAdd}-checkbox`];

    // Click an element to check it
    TestUtils.Simulate.click(sentimentSpan);

    // Expect an array populated with a single element
    expect(props.onChange).toHaveBeenCalledWith([sentimentToAdd]);


    // Click it again to uncheck it
    TestUtils.Simulate.click(sentimentSpan);

    // Expect an array populated with a single element
    expect(props.onChange).toHaveBeenCalledWith([]);

  });

});
