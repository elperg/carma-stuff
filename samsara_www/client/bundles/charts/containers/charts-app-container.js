import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import _ from 'lodash';

import Loader from 'lib/components/loader';

import fetchAVE from '../actions/fetch-ave';
import fetchImpressions from '../actions/fetch-impressions';
import fetchLanguages from '../actions/fetch-languages';
import fetchMediaTypes from '../actions/fetch-media-types';
import fetchOutlets from '../actions/fetch-outlets';
import fetchRegionalEngagement from '../actions/fetch-regional-engagement';
import fetchRegionalSentiment from '../actions/fetch-regional-sentiment';
import fetchSentiment from '../actions/fetch-sentiment';
import fetchTags from '../actions/fetch-tags';



class ChartsAppContainer extends React.Component {

  static propTypes = {

    chartData     : PropTypes.object,
    filters       : PropTypes.object,
    filterOptions : PropTypes.object,

    fetchAVE                : PropTypes.func.isRequired,
    fetchImpressions        : PropTypes.func.isRequired,
    fetchLanguages          : PropTypes.func.isRequired,
    fetchMediaTypes         : PropTypes.func.isRequired,
    fetchOutlets            : PropTypes.func.isRequired,
    fetchRegionalEngagement : PropTypes.func.isRequired,
    fetchRegionalSentiment  : PropTypes.func.isRequired,
    fetchSentiment          : PropTypes.func.isRequired,
    fetchTags               : PropTypes.func.isRequired

  };

  state = {
  };

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    this.setState({ articles: this.props.articles });
  }

  componentDidMount() {
    this.props.fetchAVE();
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    return (
      <div className='charts-app'>

      </div>
    );
  }

}



const mapStateToProps = (state, ownProps) => {
  return {
    aveIsBusy : state.charts.ave.isBusy,
    aveData   : state.charts.ave.data
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchAVE                : (filterValues) => { dispatch(fetchAVE(ownProps.params.projectUid, filterValues)); },
    fetchImpressions        : (filterValues) => { dispatch(fetchImpressions(ownProps.params.projectUid, filterValues)); },
    fetchLanguages          : (filterValues) => { dispatch(fetchLanguages(ownProps.params.projectUid, filterValues)); },
    fetchMediaTypes         : (filterValues) => { dispatch(fetchMediaTypes(ownProps.params.projectUid, filterValues)); },
    fetchOutlets            : (filterValues) => { dispatch(fetchOutlets(ownProps.params.projectUid, filterValues)); },
    fetchRegionalEngagement : (filterValues) => { dispatch(fetchRegionalEngagement(ownProps.params.projectUid, filterValues)); },
    fetchRegionalSentiment  : (filterValues) => { dispatch(fetchRegionalSentiment(ownProps.params.projectUid, filterValues)); },
    fetchSentiment          : (filterValues) => { dispatch(fetchSentiment(ownProps.params.projectUid, filterValues)); },
    fetchTags               : (filterValues) => { dispatch(fetchTags(ownProps.params.projectUid, filterValues)); }
  };
}



export default connect(mapStateToProps, mapDispatchToProps)(ChartsAppContainer);
