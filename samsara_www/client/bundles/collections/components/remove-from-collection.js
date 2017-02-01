import React, { PropTypes } from 'react';
import { Translate, Localize } from 'react-redux-i18n';
import _ from 'lodash';

// When using babel!svg-react!, we need to actually crawl up the tree, (aliases aren't working)
import SVGIconRemove from 'babel!svg-react!../../../lib/svg/icon_cross.svg?name=SVGIconRemove';

class RemoveFromCollection extends React.Component {

  static propTypes = {
    selectedCollectionId: PropTypes.number.isRequired,
    selectedArticleIds  : PropTypes.array.isRequired,
    removeFromCollection : PropTypes.func.isRequired
  };

  state = {
    selectedCount   : 0
  };

  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'clickRemoveFromCollection');
  }

  componentWillMount() {
    this.setState({ selectedCount: this.props.selectedArticleIds.length });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ selectedCount: nextProps.selectedArticleIds.length });
  }

  clickRemoveFromCollection() {
    this.props.removeFromCollection(this.props.selectedArticleIds, this.props.selectedCollectionId);
  }

  render() {

    const disabledClassName = (this.state.selectedCount > 0) ? '' : ' disabled';

    return (
      <div className={'remove-from-collection'+disabledClassName}>
        <button className={'button'+disabledClassName} onClick={this.clickRemoveFromCollection}><Translate value='articles_toolbar.remove_button' /></button>
      </div>
    );

  }

}


export default RemoveFromCollection;
