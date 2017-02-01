import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import { SentimentLevels } from 'client/lib/app-constants';

import { SentimentIndicator } from 'client/lib/components/sentiment-indicator';

describe('Sentiment Indicator', () => {

  let component, props;

  beforeEach(() => {

    props = {
      levels        : 5,
      includeLabel  : true
    }

  });

  it('should render for accepted sentiment values', () => {

    for(let level in SentimentLevels) {

      component = TestUtils.renderIntoDocument(<SentimentIndicator sentiment={SentimentLevels[level]} {...props} />);
      expect(component.props.sentiment).toEqual(SentimentLevels[level]);
      expect(TestUtils.isCompositeComponentWithType(component, SentimentIndicator)).toBeTruthy();

    }

  });

  it('should render 3 dots when level is set to 3', () => {

    props.levels = 3;
    props.includeLabel = false;

    component = TestUtils.renderIntoDocument(<SentimentIndicator sentiment={SentimentLevels[0]} {...props}  />);

    // get all spans and remove the top one (wrapper)
    let allSpans = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span').slice(1);
    expect(allSpans.length).toEqual(3);

  });

  it('should render 5 dots when level is set to 5', () => {

    props.levels = 5;
    props.includeLabel = false;

    component = TestUtils.renderIntoDocument(<SentimentIndicator sentiment={SentimentLevels[1]} {...props}  />);

    // get all spans and remove the top one (wrapper)
    let allSpans = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span').slice(1);
    expect(allSpans.length).toEqual(5);

  });

  it('should render a label when includeLabel is set to true', () => {

    props.levels = 5;
    props.includeLabel = true;

    component = TestUtils.renderIntoDocument(<SentimentIndicator sentiment={SentimentLevels[1]} {...props}  />);

    let labelSpan = TestUtils.findRenderedDOMComponentWithClass(component, 'sentiment-indicator__label');

    expect(labelSpan.innerHTML).toEqual(`sentiments.${SentimentLevels[1]}`);

  });

  it('should omit a label when includeLabel is set to false', () => {

    props.levels = 5;
    props.includeLabel = false;

    component = TestUtils.renderIntoDocument(<SentimentIndicator sentiment={SentimentLevels[1]} {...props}  />);

    // get all spans and remove the top one (wrapper)
    let allSpans = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span').slice(1);
    expect(allSpans.length).toEqual(5);

  });

});
