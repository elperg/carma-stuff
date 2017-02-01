import React, { PropTypes } from 'react';
import { Translate, Localize } from 'react-redux-i18n';
import { Link } from 'react-router';

import SVGCarmaLogo from 'babel!svg-react!../../../lib/svg/icon_carma_logo3.svg?name=SVGCarmaLogo';

import UserMenu from './user-menu';
import OrganizationMenu from './organization-menu';

export class PublicNavigation extends React.Component {

  static propTypes = {
    organization    : PropTypes.object,
    user            : PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {

    const userMenu = (this.props.user.id !== undefined) ? <UserMenu user={this.props.user} /> : undefined;

    let organizationMenu;
    if(this.props.organization.name !== null && this.props.user !== null) {
      organizationMenu = (<OrganizationMenu
          dropdownLabel={this.props.organization.name}
          dropdownHeading={this.props.organization.name}
          shouldLinkToSettings={(this.props.user.carmaStaff === true || this.props.user.admin === true)}
        />);
    } else {
      organizationMenu = (
        <div className='header'>
          <div className='navbar__toggle burger'><div className='burger-line'></div></div>
          <div className='nav-item logo'><Link to='/'><SVGCarmaLogo /></Link></div>
        </div>
      );
    }

    return (
      <nav className='navbar'>

        {organizationMenu}

        {userMenu}

      </nav>
    );

  }
}

export default PublicNavigation;
