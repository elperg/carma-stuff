import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Translate, Localize } from 'react-redux-i18n';


class CollectionDetailsForm extends React.Component {

  static propTypes = {
    collection: PropTypes.object,
    onCancel  : PropTypes.func.isRequired,
    onSubmit  : PropTypes.func.isRequired,
    onDelete  : PropTypes.func
  };

  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'changeName', 'changeDescription', 'changePrivate', 'clickCancel', 'clickSubmit', 'clickDelete');
  }

  state = {
    isNew       : true,
    name        : '',
    description : '',
    private     : true,
    isDeleting  : false
  };

  componentWillMount() {

    if(this.props.collection !== null && this.props.collection !== undefined) {
      this.setState({
        isNew : false,
        ...this.props.collection
      });
    } else {
      this.setState({
        isNew       : true,
        name        : '',
        description : '',
        private     : true,
        isDeleting  : false
      });
    }
  }

  componentDidMount() {
    this.refs.name.focus();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.collection !== null && nextProps.collection !== undefined) {
      this.setState({
        isNew : false,
        ...nextProps.collection
      });
    } else {
      this.setState({
        isNew       : true,
        name        : '',
        description : '',
        private     : true,
        isDeleting  : false
      });
    }
  }

  changeName() {
    this.setState({ name: this.refs.name.value });
  }

  changeDescription() {
    this.setState({ description: this.refs.description.value });
  }

  changePrivate() {
    this.setState({ private: !this.state.private });
  }

  clickCancel(e) {
    e.preventDefault();
    if(this.state.isDeleting === false) {
      this.props.onCancel();
    } else {
      this.setState({ isDeleting: false });
    }
  }

  clickSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }

  clickDelete(e) {
    e.preventDefault();

    if(this.state.isDeleting === true) {
      this.props.onDelete();
    } else {
      this.setState({ isDeleting: true });
    }

  }

  render() {

    let formTitle, formBody, formFooter;

    if(this.state.isNew === false && this.state.isDeleting === false) {
      formTitle = <Translate value='collections.actions.edit' />;
    } else if(this.state.isDeleting === true) {
      formTitle = <Translate value='collections.actions.delete' collectionName={this.props.collection.name} />;
    } else if(this.state.isNew === true) {
      formTitle = <Translate value='collections.actions.create' />;
    }

    const buttonLabelTextKey = (this.state.isNew === true) ? 'collections.form.create_collection' : 'collections.form.update_collection';
    const buttonLabel = <Translate value={buttonLabelTextKey} />;
    const deleteButton = (this.state.isNew === false) ? <button onClick={this.clickDelete} className='btn btn-danger'><Translate value='collections.form.delete_collection' /></button> : undefined;


    if(this.state.isDeleting === false) {

      const privateCheckedClassName = (this.state.private === true) ? ' selected' : '';

      formBody = (
        <div className='body'>

          <div className='form-group'>
            <div className='form-control'>
              <label className='string required' htmlFor='collection_name'><Translate value='collections.form.label' /></label>
              <input ref='name' type='text' className='string required' onChange={this.changeName} value={this.state.name} id='collection_name' />
            </div>
          </div>

          <div className='form-group'>
            <div className='form-control'>
              <label className='string optional' htmlFor='collection_description'><Translate value='collections.form.description' /></label>
              <textarea ref='description' className='text optional' onChange={this.changeDescription} value={this.state.description} id='collection_description' />
            </div>
          </div>

          <div className={'form-group checkbox-group' + privateCheckedClassName}>
            <div className='form-control'>

                <div className='checkbox' onClick={this.changePrivate}></div>

              <label className='inline' htmlFor='collection_private'>
                <Translate value='collections.form.private' />
              </label>

              {/*
              <Translate value='collections.form.private' /></label>
              <label className='switch_checkbox'>
                <input type='hidden' value='0' />
                <input ref='private'  className='switch optional' onChange={this.changePrivate} type='checkbox' value='1' checked={this.state.private} name='collection[private]' id='collection_private' />
                <div className='switch_background'></div>
              </label>
              */}
            </div>
          </div>

        </div>
      );

      formFooter = (
        <div className='footer'>
          <button onClick={this.clickSubmit} className='btn btn-primary'>{buttonLabel}</button>
          {deleteButton}
          <button onClick={this.clickCancel} className='btn'><Translate value='collections.form.cancel' /></button>
        </div>
      );

    } else {

      formBody = (
        <div className='body'>

          <p><Translate value='collections.form.confirm_delete' collection_name={this.props.collection.name} /></p>

        </div>
      );

      formFooter = (
        <div className='footer'>
          {deleteButton}
          <button onClick={this.clickCancel} className='btn'><Translate value='collections.form.cancel' /></button>
        </div>
      );

    }

    return (
      <div className='modal-form'>

          <div className='header'>
            <h2>{formTitle}</h2>
          </div>

          {formBody}

          {formFooter}



      </div>
    );

  }
}


export default CollectionDetailsForm;





