// HelloWorldWidget is an arbitrary name for any 'dumb' component. We do not recommend suffixing
// all your dump component names with Widget.

import React, { PropTypes } from 'react';
import _ from 'lodash';

import SVGIconSearch from 'babel!svg-react!../svg/icon_search.svg?name=SVGIconSearch';


export default class SearchQuery extends React.Component {
  static propTypes = {
    // If you have lots of data or action properties, you should consider grouping them by
    // passing two properties: 'data' and 'actions'.
    onChange    : PropTypes.func.isRequired,
    query       : PropTypes.string.isRequired,
    placeholder : PropTypes.string.isRequired
  };

  constructor(props, context) {
    super(props, context);

    // Uses lodash to bind all methods to the context of the object instance, otherwise
    // the methods defined here would not refer to the component's class, not the component
    // instance itself.
    _.bindAll(this, 'handleChange');
  }

  // React will automatically provide us with the event `e`
  handleChange(val) {
    this.props.onChange(val);
  }

  render() {

    return (
      <div className='form-group search-query'>
        <div className='form-control'>
          <input
            type='text'
            className='search-field'
            placeholder={this.props.placeholder}
            onChange={(e) => this.handleChange(e.currentTarget.value) }
            value={this.props.query}
          />
          <label className='icon'>
            <SVGIconSearch />
          </label>
        </div>
      </div>
    );
  }
}
