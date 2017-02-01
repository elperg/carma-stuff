import React, { PropTypes } from 'react';
import { Translate, Localize } from 'react-redux-i18n';
import _ from 'lodash';
import { Link } from 'react-router';

import SearchQuery from 'lib/components/search-query';

import { SentimentLevels } from 'lib/app-constants';

class CollectionFilters extends React.Component {
  static propTypes = {

    urlRoot             : PropTypes.string.isRequired,
    collections         : PropTypes.array.isRequired,
    selectedCollection  : PropTypes.object,
    filterResults       : PropTypes.func.isRequired

  };

  state = {
    filterValues  : {  query: '' },
    selectedCollectionId: null
  };

  constructor(props, context) {
    super(props, context);
    _.bindAll(this, ['updateFilters', 'resetFilters', 'onQueryChange']);
  }

  componentWillMount() {
    this.setState({
      filterValues        : (this.props.filterValues !== undefined) ? this.props.filterValues : { query: '' },
      selectedCollectionId: (this.props.selectedCollection !== undefined) ? this.props.selectedCollection.id : null
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filterValues        : (nextProps.filterValues !== undefined) ? nextProps.filterValues : { query: '' },
      selectedCollectionId: (nextProps.selectedCollection !== undefined) ? nextProps.selectedCollection.id : null
    });
  }

  updateFilters() {
    // pass in state
    this.props.filterResults(this.state.filterValues);
  }

  resetFilters() {
    this.props.filterResults({query: ''});
  }

  onQueryChange(newQuery) {
    let currentFilterValues = this.state.filterValues;
    Object.assign(currentFilterValues, { query: newQuery });
    this.setState({ filterValues: currentFilterValues });
  }

  render() {
    // i18n
    const { collections, urlRoot } = this.props;

    let privateCollections = _.filter(collections, { isPrivate: true });
    let projectCollections = _.filter(collections, { isPrivate: false });

    let projectDom, privateDom;

    if(privateCollections.length > 0) {

      // first things, first, sort the collection
      privateCollections = _.sortBy(privateCollections, ['name']);

      const collectionItems = privateCollections.map((collection) => {
        const selectedClassName = (collection.id === this.state.selectedCollectionId) ? ' selected' : '';
        return (<li key={collection.id} className={selectedClassName}><Link to={urlRoot + collection.id}>{collection.name}</Link></li>);
      });

      privateDom = (
        <div className='private-collections'>
          <h3>Private Collections</h3>
          <ul>
              {collectionItems}
          </ul>
        </div>
      );

    }

    if(projectCollections.length > 0) {

      const collectionItems = projectCollections.map((collection) => {
        const selectedClassName = (collection.id === this.state.selectedCollectionId) ? ' selected' : '';
        return (<li key={collection.id} className={selectedClassName}><Link to={urlRoot + collection.id}>{collection.name}</Link></li>);
      });

      projectDom = (
        <div className='project-collections'>
          <h3>Project Collections</h3>
          <ul>
              {collectionItems}
          </ul>
        </div>
      );

    }


    let collectionListingDom;
    if(privateDom !== undefined || projectDom !== undefined) {

      collectionListingDom = (
        <div className='collection-listing'>

          {privateDom}

          {projectDom}

        </div>
      );

    } else {

      collectionListingDom = (<p><Translate value='collections.no_records' /></p>);

    }


    return (
      <div className='filters collection-filters secondary-content'>

        {collectionListingDom}

      </div>
    );

  }
}

// Export the translate() wrapped version
export default CollectionFilters;
