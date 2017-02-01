import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Translate, Localize } from 'react-redux-i18n';
import Loader from 'lib/components/loader';

import CollectionDetailsForm from 'lib/components/collection-details-form';
import Modal from 'lib/components/modal';

import SVGIconEdit from 'babel!svg-react!../../../lib/svg/icon_edit.svg?name=SVGIconEdit';


class CollectionHeader extends React.Component {

  static propTypes = {
    selectedCollection    : PropTypes.object,
    isUpdatingCollection  : PropTypes.bool.isRequired,
    actions               : PropTypes.shape({
                              createCollection  : PropTypes.func.isRequired,
                              updateCollection  : PropTypes.func.isRequired,
                              deleteCollection  : PropTypes.func.isRequired
                            }).isRequired
  };

  state = {
    modalIsOpen           : false,
    isUpdatingCollection  : false,
    collectionToEdit      : null
  }

  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'clickEditCollection', 'clickNewCollection', 'formSubmit', 'formDelete', 'formCancel');
  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.collection) {
      this.setState({
        isNew : false,
        ...nextProps.collection
      });
    }

    this.setState({ isUpdatingCollection: nextProps.isUpdatingCollection });

    if(nextProps.isUpdatingCollection === false) {
      this.setState({ modalIsOpen: false });
    }

  }

  clickEditCollection(e) {
    e.preventDefault();
    this.setState({
      collectionToEdit  : this.props.selectedCollection,
      modalIsOpen       : true
    });
  }

  clickNewCollection() {
    this.setState({
      collectionToEdit  : null,
      modalIsOpen       : true
    });
  }

  formSubmit(newProps) {
    this.setState({ isUpdatingCollection: true });

    if(newProps.isNew === true) {
      this.props.actions.createCollection(newProps);
    } else {

      const updatedProps = {
        name        : newProps.name,
        description : newProps.description,
        private     : newProps.private
      };

      this.props.actions.updateCollection(updatedProps, this.props.selectedCollection.id);
    }
  }

  formDelete() {
    this.setState({ isUpdatingCollection: true });
    this.props.actions.deleteCollection(this.props.selectedCollection.id);
  }

  formCancel() {
    this.setState({ modalIsOpen: false });
  }

  render() {

    const { selectedCollection } = this.props;

    let heading;

    if(selectedCollection === undefined) {

      heading = (<div>
                  <h1 className='name'><Translate value='collections.index.title' /></h1>
                  <p><Translate value='collections.index.no_records' /></p>
                </div>);

    } else {

      const description = (_.isEmpty(selectedCollection.description) === false) ? selectedCollection.description : <em><Translate value='collections.index.no_description' /><br /></em>;

      heading = (<div>
                  <h1 className='name'>{selectedCollection.name}</h1>
                  <p>{description}
                    <a onClick={this.clickEditCollection} className='edit'><SVGIconEdit /> Edit Collection</a>
                  </p>
                </div>);

    }


    return (
      <header className="collection-header">

        {heading}

        <p className='add-collection'><button className='btn btn-primary' onClick={this.clickNewCollection}><Translate value='collections.actions.create' /></button></p>

        <Modal isOpen={this.state.modalIsOpen}>

          <Loader loaded={!this.state.isUpdatingCollection}>
            <CollectionDetailsForm
              collection={this.state.collectionToEdit}
              onCancel={this.formCancel}
              onSubmit={this.formSubmit}
              onDelete={this.formDelete}
            />
          </Loader>

        </Modal>

      </header>
    );

  }
}


export default CollectionHeader;

