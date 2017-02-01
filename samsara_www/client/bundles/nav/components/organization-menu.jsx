import React, { PropTypes } from 'react';
import { Translate, Localize } from 'react-redux-i18n';
import { Link } from 'react-router';

import SVGCarmaLogo from 'babel!svg-react!../../../lib/svg/icon_carma_logo3.svg?name=SVGCarmaLogo';

import DropdownMenu from 'lib/components/dropdown-menu';

export class OrganizationMenu extends React.Component {

  static propTypes = {
    dropdownLabel         : PropTypes.string.isRequired,
    dropdownHeading       : PropTypes.string.isRequired,
    shouldLinkToSettings  : PropTypes.bool.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {

    let projectSettingsLi;
    if(this.props.linkToSettings === true) {
      projectSettingsLi = (<li><Link to='/settings'><Translate value='layouts.organization_navigation.settings' /></Link></li>);
    }

    return (
      <div className='organization-nav'>
        <div className='navbar__toggle burger'><div className='burger-line'></div></div>
        <div className='logo'><Link to='/'><SVGCarmaLogo /></Link></div>

        <DropdownMenu label={this.props.dropdownLabel}>
          <li className='heading'>{this.props.dropdownHeading}</li>
          <li><Link to='/projects' activeClassName='active'><Translate value='layouts.organization_navigation.projects' /></Link></li>
          {projectSettingsLi}
        </DropdownMenu>

      </div>
    );
  }

}


export default OrganizationMenu;
