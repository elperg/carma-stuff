import React, { PropTypes } from 'react';
import { Translate, Localize } from 'react-redux-i18n';
import _ from 'lodash';

import Loader from 'lib/components/loader';
import CollectionDetailsForm from './collection-details-form';
import Modal from './modal';


// When using babel!svg-react!, we need to actually crawl up the tree, (aliases aren't working)
import SVGIconAdd from 'babel!svg-react!../svg/icon_add.svg?name=SVGIconAdd';

export class AddToCollection extends React.Component {

  static propTypes = {
    isUpdatingCollection: PropTypes.bool.isRequired,
    selectedArticleIds  : PropTypes.array.isRequired,
    collections         : PropTypes.arrayOf(
                            PropTypes.shape({
                              archived            : PropTypes.bool,
                              created_at          : PropTypes.string,
                              creator_id          : PropTypes.number,
                              description         : PropTypes.string,
                              featured_article_id : PropTypes.number,
                              id                  : PropTypes.number.isRequired,
                              name                : PropTypes.string.isRequired,
                              'private'           : PropTypes.bool,
                              project_id          : PropTypes.number,
                              updated_at          : PropTypes.string
                            })
                          ),
    actions             : PropTypes.shape({
                            addToNewCollection      : PropTypes.func.isRequired,
                            addToExistingCollection : PropTypes.func.isRequired
                          }).isRequired
  };

  state = {
    selectedCount         : 0,
    isOpen                : false,
    modalIsOpen           : false,
    isUpdatingCollection  : false
  };

  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'clickAddToNewCollection', 'clickAddToExistingCollection', 'toggleDropdown', 'formSubmit', 'formCancel');
  }

  componentWillMount() {
    this.setState({ selectedCount: this.props.selectedArticleIds.length });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedCount         : nextProps.selectedArticleIds.length,
      isUpdatingCollection  : nextProps.isUpdatingCollection
    });

    if(nextProps.isUpdatingCollection === false) {
      this.setState({ modalIsOpen: false });
    }
  }

  toggleDropdown() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  clickAddToExistingCollection(collectionId) {
    if(this.props.selectedArticleIds.length > 0) {
      this.props.actions.addToExistingCollection(collectionId, this.props.selectedArticleIds);
    }
  }

  clickAddToNewCollection() {
    if(this.props.selectedArticleIds.length > 0) {
      this.setState({ modalIsOpen: true });
    }
  }

  formSubmit(props) {
    this.setState({ isUpdatingCollection: true });

    const newCollectionProps = {
      name        : props.name,
      description : props.description,
      private     : props.private
    };

    this.props.actions.addToNewCollection(newCollectionProps, this.props.selectedArticleIds);

  }

  formCancel() {
    this.setState({ modalIsOpen: false });
  }


  render() {

    const { collections } = this.props;

    const dropdownClassName =  (this.state.isOpen === true) ? ' open' : '';
    const disabledClassName = (this.state.selectedCount > 0) ? '' : ' disabled';

    const heading = (this.state.selectedCount > 0) ?
      <Translate value='articles.articles_toolbar.add_selected' count={this.state.selectedCount} /> :
      <Translate value='articles.articles_toolbar.select_to_add' />;

    // All of the options available when selectedCount > 0
    let addToCollectionOptions;

    if(collections.length > 0) {

      const collectionOptions = collections.map((collection) => {
        return ( <li key={collection.id} onClick={(e) =>{ this.clickAddToExistingCollection(collection.id); }} className={disabledClassName}>{collection.name}</li> );
      });

      addToCollectionOptions = [<li ref='add-to-existing-heading' key='add-to-existing-heading' className='heading remove'>{heading}</li>];
      addToCollectionOptions = addToCollectionOptions.concat(collectionOptions);

    }

    return (
      <div className={'dropdown collection-dropdown no-caret' + dropdownClassName}>

        <span className='toggle' onClick={this.toggleDropdown}><SVGIconAdd className='even-odd-fill' /> <Translate value='collections.actions.add_article' /></span>

        <ul ref='menu' className='menu' onMouseLeave={this.toggleDropdown}>

          {addToCollectionOptions}

          <li ref='add-to-new' key='add-to-new' onClick={this.clickAddToNewCollection} className={'break'+disabledClassName}><Translate value='collections.actions.new' /></li>

        </ul>

        <Modal isOpen={this.state.modalIsOpen}>

          <Loader loaded={!this.state.isUpdatingCollection}>
            <CollectionDetailsForm onCancel={this.formCancel} onSubmit={this.formSubmit} onDelete={this.formDelete} />
          </Loader>

        </Modal>

      </div>
    );

  }

}


export default AddToCollection;
