import React, { PropTypes } from 'react';
import { connect } from 'react-redux'

import { Translate, Localize, I18n } from 'react-redux-i18n';
import {  Router, Route, Link, hashHistory} from 'react-router';

import ExpertsCategory from '../containers/experts-categories-index-container';

import SMEnavigation from '../components/sme-nav'
import ProjectNavigationContainer from '../../nav/containers/project-navigation-container'


export class SMEnavigationContainer extends React.Component {

  static propTypes = {
    projectUid      : PropTypes.string,
    organization    : PropTypes.object,
    selectedProject : PropTypes.object,
    user            : PropTypes.object,
    smeCategoryIds : PropTypes.string,
    smeChannels : PropTypes.array
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
      const { organization, selectedProject, smeCategoryIds, smeChannels} = this.props;

      const postArr = this.props.data.posts;

      let channelList = [];

    // const smeCategoryIds = _
  //        .chain(postArr)
      //  .filter('categories')
    //      .map(function( o) {
    //        return o
    //      })
    //      .value();

  console.log('here are the smeCATids in cont==>'+ JSON.stringify(postArr) );

  //   _.forEach( postArr, function(key, eachPost) {
    //    _.filter(eachPost, 'categories');
            // channelList = (eachPost + key)
                //  console.log('here are the smeCATids in cont==>'+ channelList)
   //});


    return(
      <div>
      <SMEnavigation {...this.props} />

</div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {

  //  const projectUrlRoot = `/projects/${selectedProject.uid}`;
    const selectedProject = _.find(state.projects.data, { uid: ownProps.projectUid });


//const smeChannels = expertChannels;
  const channelLinks= [ 'Automotive-linkz', 'aviation-linkz', 'Finance-linkz'];

//  this.setState({ smeChannels:  JSON.stringify(smeCategoryIds) });
//  console.log('here are the smeCATids==>'+ smeCategoryIds )
 const smeChannels =  ['one', 'two', 'three'] //eachPost

  return {

    selectedProject : selectedProject,
    channelLinks : channelLinks,
    smeChannels : smeChannels

  }

};

  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(SMEnavigationContainer);
