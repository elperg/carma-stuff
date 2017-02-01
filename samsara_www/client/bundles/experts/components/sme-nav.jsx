import React, { PropTypes } from 'react';
import { Translate, Localize, I18n } from 'react-redux-i18n';
import { Link, hashHistory } from 'react-router';

import SMEnavigationContainer from '../containers/sme-nav-container'

import ChannelListItem from '../components/channel-item'

import ProjectNavigationContainer from '../../nav/containers/project-navigation-container'


export class SMEnavigation extends React.Component {

  static propTypes = {
      projectUid      : PropTypes.string,
      smeChannels :  PropTypes.array,
      channelLinks : PropTypes.array,
      channelLink : PropTypes.string,
      organization    : PropTypes.object,
      selectedProject : PropTypes.object,
      user            : PropTypes.object,
        smeCategoryIds : PropTypes.string
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {

    const { selectedProject, channelLinks, smeChannels, projectUid, smeCategoryIds } = this.props;

    console.log('here is smeCategoryIds in sme nav==>'+ JSON.stringify( smeCategoryIds )  )

const smeCatObj = smeChannels.map( (x, i) =>{
  return (
    <ChannelListItem
      item= {x}
     smeCategoryIds = {smeCategoryIds}
    />
  )

console.log( name , link)
}, this);
/*
*/
    // {smeCatLink}
  return (
      <div className='channel-list'>
    <ul id="sub-nav">
    <li className="label">Categories:</li>
    <ul className="specialty-tags">
 {smeCatObj}
        </ul>
          </ul>
      </div>

  );

  }
}




export default SMEnavigation;
