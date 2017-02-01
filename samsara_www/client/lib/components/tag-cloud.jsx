import React, { PropTypes } from 'react';
import _ from 'lodash';

export default class TagCloud extends React.Component {
  static propTypes = {
    tags      : PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {

    /*
        The "tags" object looks like this:
          {
            "organizations" : [ "tag one", "tag two" ]
            "competitors"   : [ "tag three" ]
          }

        Neither key is required, but the key serves as the tag type (used to
          determine class name, for styling).
    */

    // Create an empty array for populating tags
    let tagElems = [];

    // Do a for/each of the tags object
    _.each(this.props.tags, (tags, type) => {

      // create an array of tags by .map()'ing the tags array
      const tagsByType = tags.map((tag) => {
        return( <span key={`${type}-${tag}`} className={`tag tag-${type.toLowerCase()}`}>{tag}</span> );
      });

      // push the new array onto tagElems
      tagElems.push(...tagsByType);

    });

    return (
      <div className='tag-cloud'>{tagElems}</div>
    );
  }

}
