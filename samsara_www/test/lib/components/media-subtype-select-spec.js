import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import { MediaSubtypes } from 'client/lib/app-constants';

import { MediaSubtypeSelect } from 'client/lib/components/media-subtype-select';

describe('Media Subtype Select', () => {

  let component, props;

  beforeEach(() => {

    props ={
      mediaSubtypes : MediaSubtypes,
      values        : [],
      onChange      : (newVals) => newVals
    };

  });

  it('should render checkbox <span>s for each media subtype', () => {

    component = TestUtils.renderIntoDocument(<MediaSubtypeSelect {...props} />);

    _.each(MediaSubtypes, (subtype) => {
      let refName = `${subtype}-checkbox`;
      expect(component.refs[refName]).not.toBeUndefined();
    });

  });

  it('should set render label elements with className="checked" if its included in props.values', () => {

    // pick a subtype to remove from props before we render
    const missingSubtype = MediaSubtypes[0];
    props.values = _.without(props.mediaSubtypes, missingSubtype);

    component = TestUtils.renderIntoDocument(<MediaSubtypeSelect {...props} />);

    _.each(MediaSubtypes, (subtype) => {
      let subtypeSpan = component.refs[`${subtype}-checkbox`];

      if(subtype === missingSubtype) {
        // should NOT have class 'checked'
        expect(/checked/.test(subtypeSpan.children[0].className)).toBeFalsy();
      } else {
        // should have class 'checked'
        expect(/checked/.test(subtypeSpan.children[0].className)).toBeTruthy();
      }
    });

  });

  it('should call props.onChange() with an array of selected values when an item is checked/unchecked', () => {

    // populate with 0 elements selected
    props.values = [];

    spyOn(props, 'onChange');

    component = TestUtils.renderIntoDocument(<MediaSubtypeSelect {...props} />);

    const subtypeToAdd = MediaSubtypes[0];
    const subtypeSpan = component.refs[`${subtypeToAdd}-checkbox`];

    // Click an element to check it
    TestUtils.Simulate.click(subtypeSpan);

    // Expect an array populated with a single element
    expect(props.onChange).toHaveBeenCalledWith([subtypeToAdd]);


    // Click it again to uncheck it
    TestUtils.Simulate.click(subtypeSpan);

    // Expect an array populated with a single element
    expect(props.onChange).toHaveBeenCalledWith([]);

  });

});
