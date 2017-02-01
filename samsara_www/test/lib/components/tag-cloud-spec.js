import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import TagCloud from 'client/lib/components/tag-cloud';

describe('Tag Cloud', () => {

  let component, props;

  beforeEach(() => {

    props = {
      tags  : {
                "organizations" : [ "org1", "org2", "org3" ],
                "competitors"   : [ "competitors1" ]
              }
    }

    component = TestUtils.renderIntoDocument(<TagCloud {...props} />);

  });

  it('should render <spans> for each tag type', () => {

      expect(component.props.tags).toEqual(props.tags);

      let orgTags = TestUtils.scryRenderedDOMComponentsWithClass(component, 'tag-organizations');
      let compTags = TestUtils.scryRenderedDOMComponentsWithClass(component, 'tag-competitors');

      expect(orgTags[0].className).toEqual('tag tag-organizations');
      expect(orgTags[0].innerHTML).toEqual('org1');
      expect(orgTags[1].innerHTML).toEqual('org2');
      expect(orgTags[2].innerHTML).toEqual('org3');

      expect(compTags[0].className).toEqual('tag tag-competitors');
      expect(compTags[0].innerHTML).toEqual('competitors1');
  });


});
