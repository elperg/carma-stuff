import React, { PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';

class Tooltip extends React.Component {

  static propTypes = {
    id  : PropTypes.string.isRequired,
    place : PropTypes.oneOf(['top', 'bottom', 'left', 'right']).isRequired
  };

  static defaultProps = {
    place : 'top'
  };


  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <ReactTooltip effect='solid' globalEventOff='click' multiline={true} html={true} {...this.props}>
        {this.props.children}
      </ReactTooltip>
    );
  }

}

export default Tooltip;
