import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import { FormSelectSingle } from 'client/lib/components/form-select-single';

describe('Can we get it running?', () => {

  let component, props;

  beforeEach(() => {

    props = {
      onChange  : (e) => {},
      options   : [ { key: 'key0', val: 'val0' }, { key: 'key1', val: 'val1' } ],
      name      : 'test'
    };

    component = TestUtils.renderIntoDocument(
       <FormSelectSingle {...props} />
    );

  });

  it('should render a <select> element', () => {
    let select = TestUtils.findRenderedDOMComponentWithTag(
       component, 'select'
    );

    expect(select).not.toBeUndefined();
  });

});
