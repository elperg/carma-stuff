import React, { PropTypes } from 'react';
import { Translate, Localize, I18n } from 'react-redux-i18n';
import { Link } from 'react-router';

import SVGCarmaLogo from 'babel!svg-react!../../../lib/svg/icon_carma_logo3.svg?name=SVGCarmaLogo';

import UserMenu from './user-menu';
import OrganizationMenu from './organization-menu';
import DropdownMenu from 'lib/components/dropdown-menu';

export class ProjectNavigation extends React.Component {

  static propTypes = {
    organization    : PropTypes.object,
    selectedProject : PropTypes.object,
    user            : PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {

    const { organization, selectedProject } = this.props;

    const isTalkwalkerEnabled = (selectedProject !== undefined && selectedProject.talkwalkerProjectId !== null);
    const areSmeCategoriesEnabled = (selectedProject !== undefined && selectedProject.smeCategoryIds !== null);

    const projectUrlRoot = `/projects/${selectedProject.uid}`;

    let projectSettingsLi;
    if(this.props.user.carmaStaff === true || this.props.user.admin === true) {
      projectSettingsLi = (<li><Link to='/settings'><Translate value='layouts.organization_navigation.settings' /></Link></li>);
    }

    const talkwalkerLink = (isTalkwalkerEnabled === true) ? (<li><Link to={projectUrlRoot + '/social'}><Translate value='layouts.project_navigation.social' /></Link></li>) : undefined;
    const expertsLink = (areSmeCategoriesEnabled === true) ? (<li><Link to={projectUrlRoot + '/experts'}><Translate value='layouts.project_navigation.experts' /></Link></li>) : undefined;

    const dropdownLabel = (selectedProject !== undefined) ? selectedProject.name : organization.name;

    return (

      <nav className='navbar'>

        <OrganizationMenu
          dropdownLabel={dropdownLabel}
          dropdownHeading={organization.name}
          shouldLinkToSettings={(this.props.user.carmaStaff === true || this.props.user.admin === true)}
        />

        <ul className='project-nav'>
          <li><Link to={projectUrlRoot + '/overview'} activeClassName='active'><Translate value='layouts.project_navigation.overview' /></Link></li>
          <li><Link to={projectUrlRoot + '/articles'} activeClassName='active'><Translate value='layouts.project_navigation.articles' /></Link></li>
          <li><Link to={projectUrlRoot + '/collections'} activeClassName='active'><Translate value='layouts.project_navigation.collections' /></Link></li>
          <li><Link to={projectUrlRoot + '/experts'} activeClassName='active'><Translate value='layouts.project_navigation.experts' /></Link></li>
          {talkwalkerLink}

          <li>
            <DropdownMenu label={I18n.t('layouts.project_navigation.analytics')}>
              <li><Link to={projectUrlRoot + '/charts/media_types'} activeClassName='active'><Translate value='layouts.project_navigation.automated_charts' /></Link></li>
              <li><Link to={projectUrlRoot + '/mycarma'} activeClassName='active'><Translate value='layouts.project_navigation.my_carma' /></Link></li>
            </DropdownMenu>
          </li>

          {/*
          <li className='dropdown'>
            <span className='toggle'><span className='label'><Translate value='layouts.project_navigation.analytics' /></span></span>
            <ul className='menu'>
              <li><Link to={projectUrlRoot + '/charts/media_types'} activeClassName='active'><Translate value='layouts.project_navigation.automated_charts' /></Link></li>
              <li><Link to={projectUrlRoot + '/mycarma'} activeClassName='active'><Translate value='layouts.project_navigation.my_carma' /></Link></li>
            </ul>
          </li>
          */}
          {/* expertsLink */}
        </ul>

        <UserMenu className='user-nav' user={this.props.user } />

      </nav>
    );

  }
}

export default ProjectNavigation;
