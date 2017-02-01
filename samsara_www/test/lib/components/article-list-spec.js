import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import { ArticleList } from 'client/lib/components/article-list';
import { ArticleListItem } from 'client/lib/components/article-list-item';

import ArticlesFixtureJSON from 'fixtures/articles';

describe('Article List Component', () => {

  let componentWrapperElem, props;
  var shallowRenderer;

  beforeEach(() => {

    props = {
      articles          : ArticlesFixtureJSON.data.articles,
      selectedArticleIds: [],
      selectionActions  : {
                            select  : jasmine.createSpy('selection-select'),
                            deselect: jasmine.createSpy('selection-deselect')
                          }
    };

    // Setup a shallow renderer so that we're not rendering <ArticleListItems />s
    shallowRenderer = TestUtils.createRenderer();

    shallowRenderer.render(
       <ArticleList {...props} />
    );

    componentWrapperElem = shallowRenderer.getRenderOutput();

  });

  it("should render <ArticleListItem />s inside of a <ul>", () => {

    // Check wrapper element type and className
    expect(componentWrapperElem.type).toEqual('div');
    expect(componentWrapperElem.props.className).toEqual('article-list');

    // Check the expected <ul>
    let expectedUl = componentWrapperElem.props.children;
    expect(expectedUl.type).toEqual('ul');

    // Check the list items
    let articleListItems = expectedUl.props.children;
    expect(articleListItems.length).toEqual(props.articles.length);

    // Finally, check that ArticleListItem was rendered correctly
    expect(articleListItems[0].type).toEqual(ArticleListItem);
    expect(articleListItems[0].props.data).toEqual(ArticlesFixtureJSON.data.articles[0]);
    expect(articleListItems[0].props.isSelected).toBeFalsy();

  });

});
