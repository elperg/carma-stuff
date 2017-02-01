import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import { AddToCollection } from 'client/lib/components/add-to-collection';

import CollectionsFixtureJSON from 'fixtures/collections';

describe('Add to Collection Component', () => {

  let component, props, collections, currentCollection;

  beforeEach(() => {

    collections = CollectionsFixtureJSON.collections;

    props = {
      selectedCount : 2,
      action        : (key) => key,
      collections   : collections
    }


  });

  it('should render a drop down menu', () => {

    component = TestUtils.renderIntoDocument(<AddToCollection {...props} />);

    let toggle = TestUtils.findRenderedDOMComponentWithClass(component, 'dropdown__toggle');
    expect(toggle).not.toBeUndefined();

    expect(component.refs.menu.className).toEqual('menu');

  });

  it('should add "disabled" to the drop-down when selectedCount is 0', () => {

    props.selectedCount = 0;

    component = TestUtils.renderIntoDocument(<AddToCollection {...props} />);

    let toggle = TestUtils.findRenderedDOMComponentWithClass(component, 'collection-dropdown');

    expect(/disabled/.test(toggle.className)).toBeTruthy();

  });

  it('should NOT add "disabled" to the drop-down when selectedCount is greater than 0', () => {

    props.selectedCount = 2;

    component = TestUtils.renderIntoDocument(<AddToCollection {...props} />);

    let toggle = TestUtils.findRenderedDOMComponentWithClass(component, 'dropdown__toggle');

    expect(/disabled/.test(toggle.className)).toBeFalsy();

  });

  it('should render a "remove from collection" option if a currentCollection is provided', () => {

    props.currentCollection = collections[0];

    component = TestUtils.renderIntoDocument(<AddToCollection {...props} />);

    // check for "remove from collection" elements
    expect(component.refs['remove-heading']).not.toBeUndefined();
    expect(component.refs['remove-collection']).not.toBeUndefined();

    expect(component.refs['remove-collection'].innerHTML).toEqual(props.currentCollection.name);

  });

  it('should NOT render a "remove from collection" option if currentCollection is undefined', () =>{

    props.currentCollection = undefined;

    component = TestUtils.renderIntoDocument(<AddToCollection {...props} />);

    // check for "remove from collection" elements
    expect(component.refs['remove-heading']).toBeUndefined();
    expect(component.refs['remove-collection']).toBeUndefined();

  });

  it('should render "add to collection" options if a "collections" property is populated', () => {

    component = TestUtils.renderIntoDocument(<AddToCollection {...props} />);

    // check for "add to collection" elements
    expect(component.refs['add-heading']).not.toBeUndefined();

    let addToCollectionLis = TestUtils.scryRenderedDOMComponentsWithClass(component, 'add');

    // Loop through our props.collections and test against our scry'd LIs
    _.each(props.collections, (collection, i) => {
      expect(addToCollectionLis[i].innerHTML).toEqual(collection.name);
    });

  });

  it('should NOT render "add to collection" options if "collections" property is empty', () => {

    props.collections = [];

    component = TestUtils.renderIntoDocument(<AddToCollection {...props} />);

    // check for "add to from collection" elements
    expect(component.refs['add-heading']).toBeUndefined();

  });

  it('should always render an "add to new collection" option', () => {

    props.currentCollection = undefined;
    props.collections = [];

    component = TestUtils.renderIntoDocument(<AddToCollection {...props} />);

    // check for "remove from collection" elements
    expect(component.refs['add-to-new']).not.toBeUndefined();
    expect(/menu__item--new/.test(component.refs['add-to-new'].className)).toBeTruthy();

  });


  it('should call props.action with appropriate keys on click events', () => {

    props.currentCollection = collections[0];

    spyOn(props, 'action');

    component = TestUtils.renderIntoDocument(<AddToCollection {...props} />);

    // scry the add li's
    let addToCollectionLis = TestUtils.scryRenderedDOMComponentsWithClass(component, 'add');

    // test the remove collection
    TestUtils.Simulate.click(component.refs['remove-collection']);
    expect(props.action).toHaveBeenCalledWith('remove', props.currentCollection.id);

    // use the second element in the array to ensure matching id's when adding
    // also, because we're using the first element to remove
    TestUtils.Simulate.click(addToCollectionLis[1]);
    expect(props.action).toHaveBeenCalledWith('add', props.collections[1].id);

    // add should have NULL has its second param
    TestUtils.Simulate.click(component.refs['add-to-new']);
    expect(props.action).toHaveBeenCalledWith('new', null);

  });

});
