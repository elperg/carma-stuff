import React, { PropTypes } from 'react';
import _ from 'lodash';

class DropdownMenu extends React.Component {

  static propTypes = {
    label : PropTypes.any.isRequired
  };

  state = {
    isOpen  : false
  };

  constructor(props, context) {
    super(props, context);
    _.bindAll(this, ['toggleDropdown', 'closeDropdown']);
  }

  toggleDropdown() {
    this.setState({ isOpen : !this.state.isOpen });
  }

  closeDropdown() {
    this.setState({ isOpen : false });
  }

  render() {

    const isOpenClassName = (this.state.isOpen === true) ? 'open' : '';

    return (
      <div className={'dropdown '+isOpenClassName} onMouseLeave={this.closeDropdown}>
        <span className='toggle' onClick={this.toggleDropdown}><span className='label'>{this.props.label}</span></span>
        <ul className='menu'>
          {this.props.children}
        </ul>
      </div>
    );
  }

}

export default DropdownMenu;
