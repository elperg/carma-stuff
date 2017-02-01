import React, { PropTypes } from 'react';
import ReactLoader from 'react-loader';
import _ from 'lodash';

class Loader extends React.Component {

  static propTypes = {
    loaded  : PropTypes.bool.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {

    return (
      <div className='loader-wrapper'>
        <ReactLoader {...this.props}>
          {this.props.children}
        </ReactLoader>
      </div>
    );
  }

}

export default Loader;
