import React, { PropTypes } from 'react';
import { Translate, Localize } from 'react-redux-i18n';
import { Link } from 'react-router';

import DropdownMenu from 'lib/components/dropdown-menu';

export class UserMenu extends React.Component {

  static propTypes = {
    user  : PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {

    const { user } = this.props;

    return (
      <div className='user-nav'>
        <DropdownMenu label={user.firstName+' ' +user.lastName}>
          <li><Link to='/profile'><Translate value='layouts.user_navigation.preferences' /></Link></li>
          <li><Link to='/logout'><Translate value='layouts.user_navigation.logout' /></Link></li>
        </DropdownMenu>
      </div>
    );

  }
}

export default UserMenu;
