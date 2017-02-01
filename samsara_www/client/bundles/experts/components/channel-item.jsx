import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Translate, Localize } from 'react-redux-i18n';
import _ from 'lodash';

import SMEnavigation from '../components/sme-nav';
import ProjectNavigationContainer from '../../nav/containers/project-navigation-container'

export class ChannelListItem extends React.Component {

  static propTypes = {
    organization    : PropTypes.object,
    selectedProject : PropTypes.object,
    user            : PropTypes.object,

      projectUid      : PropTypes.string,
      smeChannels :  PropTypes.array,
      channelLinks : PropTypes.array,
        smeCategoryIds : PropTypes.string
  };


  constructor(props, context) {
    super(props, context);
  }

  render() {

    const {organization, selectedProject, smeChannels, channelLinks, item, projectUid, smeCategoryIds } = this.props;

  //  const projID = (this.props.params.projectUid)
  //  const projectUrlRoot = '/projects/'+projID ;
//  const projectUrlRoot = `/projects/${selectedProject.uid}`;

        return (

  <Link to={ projectUid+'/experts/categories/' + channelLinks } ><li className='channel-item' > {item} </li></Link>

        )
      }
}
export default ChannelListItem;
