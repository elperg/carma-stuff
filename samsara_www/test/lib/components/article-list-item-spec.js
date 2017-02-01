import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';

import _ from 'lodash';

import { ArticleListItem } from 'client/lib/components/article-list-item';

import { SentimentIndicator } from 'client/lib/components/sentiment-indicator';
import TagCloud from 'client/lib/components/tag-cloud';

import ArticlesFixtureJSON from 'fixtures/articles';


describe('Article List Item Component', () => {

  let component, props, articleData;

  beforeEach(() => {

    articleData = ArticlesFixtureJSON.data.articles[0];

    props = {
      data              : articleData,
      selectionActions  : {
                            select  : jasmine.createSpy('selection-select'),
                            deselect: jasmine.createSpy('selection-deselect')
                          },
      isSelected        : false
    };

  });


  it('should render a selection section', () => {

    component = TestUtils.renderIntoDocument(<ArticleListItem {...props} />);

    // Check the 'selectionDiv' for a checkbox and onClick action
    let selectionDiv = component.refs.selection;

    expect(selectionDiv.className).toEqual('article-list__select');
    let checkbox = component.refs.checkbox;
    expect(checkbox.className).toEqual('checkbox');

  });

  it('should render an outlet info and thumbnail section', () => {

    component = TestUtils.renderIntoDocument(<ArticleListItem {...props} />);

    // Now check the outlet info and thumbnail
    let outletDiv = component.refs.outlet;

    // outletDiv.children is NOT an array, it's an object, keyed by int's, hence the _.valuesIn() (smh)
    let [ outletNameH2, metaUl, thumbnailA ] = _.valuesIn(outletDiv.children);

    expect(outletDiv.className).toEqual('article-list__outlet');

    expect(outletNameH2.className).toEqual('article-list__outlet-name');
    expect(metaUl.className).toEqual('meta-list');

    // react seems to prepend 'http://[server]/' to the front of the URL, so regex the url
    let urlRegex = new RegExp(articleData.url);
    expect(urlRegex.test(thumbnailA.href)).toBeTruthy();

  });

  it('should render a main content section', () => {

    component = TestUtils.renderIntoDocument(<ArticleListItem {...props} />);

    // Finally, evaluate the content div
    let contentDiv = component.refs.content;
    expect(contentDiv.className).toEqual('article-list__content');


    // Check the sentiment indicator
    let sentimentIndicator = component.refs['sentiment-indicator'];
    expect(TestUtils.isCompositeComponentWithType(sentimentIndicator, SentimentIndicator)).toBeTruthy();
    expect(sentimentIndicator.props.sentiment).toEqual(articleData.sentiment);
    expect(sentimentIndicator.props.levels).toEqual(3);
    expect(sentimentIndicator.props.includeLabel).toEqual(true);


    let metaUl = contentDiv.children[0];

    // Second should be equal to impressions
    expect(metaUl.children[1].innerHTML).toEqual(t('impressions', {count: articleData.impressions.toLocaleString()}));

    // third should be ave
    expect(metaUl.children[2].innerHTML).toEqual(articleData.ave.toLocaleString(undefined, { style: 'currency', currency: 'USD' }));



    // now check the headline and child <a />
    let headlineH1 = component.refs.headline;

    expect(headlineH1.className).toEqual('article-list__headline');

    // react seems to prepend 'http://[server]/' to the front of the URL, so regex the url
    let urlRegex = new RegExp(articleData.url);
    expect(urlRegex.test(headlineH1.children[0].href)).toBeTruthy();

    expect(headlineH1.children[0].innerHTML).toEqual(articleData.headline);


    // check the summary
    let summaryDiv = component.refs.summary;
    expect(summaryDiv.className).toEqual('article-list__summary');

    // it should show the 'summary_snippet' property if there is no arabic_summary
    expect(summaryDiv.innerHTML).toEqual(articleData.summary_snippet);


    // now check article content metadata
    let metaDiv = component.refs['content-metadata'];

    expect(metaDiv.className).toEqual('article-list__meta');

    // first <p> should be article-list__date with published at
    expect(metaDiv.children[0].className).toEqual('article-list__data');

    let published_at_date = new Date(articleData.published_at);
    expect(metaDiv.children[0].innerHTML).toEqual(published_at_date.toLocaleString('en-US'));

    // 2nd should be a <TagCloud />
    let tagCloud = component.refs['tag-cloud'];
    expect(tagCloud).not.toBeUndefined();
    expect(TestUtils.isCompositeComponentWithType(tagCloud, TagCloud)).toBeTruthy();
    expect(tagCloud.props.tags).toEqual(articleData.tags);

  });

  it('should respond to "isSelected" property and state', () => {

    component = TestUtils.renderIntoDocument(<ArticleListItem {...props} />);

    let componentElem = ReactDOM.findDOMNode(component);

    // set to unselected
    component.setState({ isSelected: false });
    expect(/selected/.test(componentElem.className)).toBeFalsy();

    // set to selected
    component.setState({ isSelected: true });
    expect(/selected/.test(componentElem.className)).toBeTruthy();

  });


  it('should call props.(de)select when clicking the checkbox and state.isSelected is false', () => {

    component = TestUtils.renderIntoDocument(<ArticleListItem {...props} />);

    let checkbox = component.refs.checkbox;

    // Select the article item
    component.setState({ isSelected: false });
    TestUtils.Simulate.click(checkbox);

    // should pass an actionType of 'select' with data.id
    expect(props.selectionActions.select).toHaveBeenCalledWith(articleData.id);

    // De-select the article item
    component.setState({ isSelected: true });
    TestUtils.Simulate.click(checkbox);
    expect(props.selectionActions.deselect).toHaveBeenCalledWith(articleData.id);

  });




















});



