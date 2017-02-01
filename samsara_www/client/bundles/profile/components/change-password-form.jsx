import React, { PropTypes } from 'react';
import { Translate, Localize } from 'react-redux-i18n';
import _ from 'lodash';

import { PasswordRegEx } from 'lib/app-constants';

import Loader from 'lib/components/loader';

class ChangePasswordForm extends React.Component {

  static propTypes = {
    isUpdatingPassword  : PropTypes.bool.isRequired,
    passwordErrors      : PropTypes.array,
    onSubmit            : PropTypes.func.isRequired,
    onCancel            : PropTypes.func.isRequired
  };

  state = {
    oldPassword     : '',
    newPassword     : '',
    confirmPassword : '',
    passwordErrors  : []
  };

  constructor(props, context) {
    super(props, context);
    _.bindAll(this, ['changeField', 'clickSubmit', 'clickCancel']);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isUpdatingPassword  : nextProps.isUpdatingPassword,
      passwordErrors      : nextProps.passwordErrors
    });
  }

  resetState() {
    this.setState({
      oldPassword     : '',
      newPassword     : '',
      confirmPassword : ''
    });
  }

  changeField(refName) {

    // update the state by ref name
    this.setState({
      [refName]: this.refs[refName].value
    });

  }

  clickCancel(e) {
    e.preventDefault();

    this.props.onCancel();

    this.resetState();

  }

  clickSubmit(e) {
    e.preventDefault();


    let passwordErrors = [];

    const oldPassword = this.refs.oldPassword.value.trim();
    const newPassword = this.refs.newPassword.value.trim();
    const confirmPassword = this.refs.confirmPassword.value.trim();


    if(oldPassword === '') {
      passwordErrors.push(t('profiles.password.provide_old_password'));
    }

    if(PasswordRegEx.test(newPassword) === false) {
      passwordErrors.push(t('profiles.password.must_contain_8_chars'));
    }

    if(newPassword !== confirmPassword) {
      passwordErrors.push(t('profiles.password.enter_confirmation'));
    }

    if(passwordErrors.length > 0) {

      this.setState({ passwordErrors });

    } else {

      this.props.onSubmit(this.refs.oldPassword.value, this.refs.newPassword.value);

      this.resetState();

    }
  }

  render() {

    let errors;

    if(this.state.passwordErrors !== null) {

      const errorLis = this.state.passwordErrors.map((error, i) => {
        return <li key={i}>{error}</li>;
      });

      errors = (
        <div className='errors'>
          <ul>
            {errorLis}
          </ul>
        </div>
      );

    }

    return (
      <div className='modal-form'>

        <div className='header'>
          <h2><Translate value='profiles.password.change_password' /></h2>
        </div>

        <Loader loaded={!this.state.isUpdatingPassword}>

          <div className='body'>

            <p><Translate value='profiles.password.requirements' /></p>

            {errors}

            <div className='form-group'>
              <div className='form-control'>
                <label className='required' htmlFor='change-pw-old'><Translate value='profiles.password.old_password' /></label>
                <input ref='oldPassword' type='password' className='string required' onChange={() => { this.changeField('oldPassword'); }} value={this.state.oldPassword} id='change-pw-old' />
              </div>
            </div>

            <div className='form-group'>
              <div className='form-control'>
                <label className='required' htmlFor='change-pw-new'><Translate value='profiles.password.new_password' /></label>
                <input ref='newPassword' type='password' className='string required' onChange={() => { this.changeField('newPassword'); }} value={this.state.newPassword} id='change-pw-new' />
              </div>
            </div>

            <div className='form-group'>
              <div className='form-control'>
                <label className='required' htmlFor='change-pw-confirm'><Translate value='profiles.password.confirm_new_password' /></label>
                <input ref='confirmPassword' type='password' className='string required' onChange={() => { this.changeField('confirmPassword'); }} value={this.state.confirmPassword} id='change-pw-confirm' />
              </div>
            </div>

          </div>

          <div className='footer'>
            <button onClick={this.clickSubmit} className='btn btn-primary'>Change Password</button>
            <button onClick={this.clickCancel} className='btn'>Cancel</button>
          </div>

        </Loader>

      </div>
    );
  }

}

export default ChangePasswordForm;

