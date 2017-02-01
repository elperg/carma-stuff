import React, { PropTypes } from 'react';
import { Translate, Localize } from 'react-redux-i18n';
import _ from 'lodash';

import { TIMEZONE_OPTIONS } from 'lib/app-constants';

import ChangePasswordForm from './change-password-form';
import EmailDigestForm from './email-digest-form';
import FormSelect from 'lib/components/form-select';
import Loader from 'lib/components/loader';
import Modal from 'lib/components/modal';

class Profile extends React.Component {

  static propTypes = {
    user    : PropTypes.object.isRequired,
    digestsByProject : PropTypes.array,
    projects  : PropTypes.array,

    isUpdatingProfile   : PropTypes.bool.isRequired,
    isUpdatingPassword  : PropTypes.bool.isRequired,
    isUpdatingDigests   : PropTypes.bool.isRequired,

    passwordErrors  : PropTypes.array,

    updateProfile : PropTypes.func.isRequired,
    updateDigests : PropTypes.func.isRequired,
    changePassword: PropTypes.func.isRequired

  };

  static defaultProps = {
    passwordErrors: []
  };

  state = {
    user: {
      firstName : '',
      lastName  : '',
      email     : '',
      timeZone  : 'Abu Dhabi'
    },
    digestsByProject    : [],
    isUpdatingProfile   : false,
    isUpdatingPassword  : false,
    isUpdatingDigests   : false,
    passwordErrors      : []
  };

  constructor(props, context) {
    super(props, context);
    _.bindAll(this, ['clickUpdateProfile', 'clickUpdateDigests', 'updateDigestValues', 'updateUserField', 'showPasswordModal', 'passwordFormSubmit', 'passwordFormCancel']);
  }

  componentWillMount() {
    this.setState({
      user              : this.props.user,
      digestsByProject  : this.props.digestsByProject,
      passwordErrors    : this.props.passwordErrors
    });
  }

  componentWillReceiveProps(nextProps) {
    // Apply state to all of our form elements from props
    this.setState({
      user              : nextProps.user,
      digestsByProject  : nextProps.digestsByProject,
      isUpdatingProfile : nextProps.isUpdatingProfile,
      isUpdatingPassword: nextProps.isUpdatingPassword,
      isUpdatingDigests : nextProps.isUpdatingDigests,
      passwordErrors    : nextProps.passwordErrors
    });

    if(nextProps.isUpdatingPassword === false) {
      this.setState({ passwordModalIsOpen: false });
    }
  }


  clickUpdateProfile() {
    const newProps = this.state.user;
    this.props.updateProfile(newProps);
  }


  updateDigestValues(digestsByProject) {
    this.setState({ digestsByProject });
  }

  clickUpdateDigests() {
    this.props.updateDigests(this.state.digestsByProject);
  }


  passwordFormSubmit(oldPassword, newPassword) {
    this.setState({ isUpdatingPassword: true });
    this.props.changePassword(oldPassword, newPassword);
  }

  passwordFormCancel() {
    this.setState({ passwordModalIsOpen: false });
  }

  updateUserField(key, val) {
    const currentUserData = this.state.user;
    const newUserData = Object.assign({}, currentUserData, { [key]: val });
    this.setState({ user: newUserData });
  }

  showPasswordModal() {
    this.setState({ passwordModalIsOpen: true });
  }

  render() {

    return (
      <div className='profile flex-1to1'>

        <div className='profile-details balanced-content'>
          <h2><Translate value='profiles.edit.profile' /></h2>
          <Loader loaded={!this.state.isUpdatingProfile}>

            <div className='form-group'>
              <div className='form-control'>
                <label className='required' htmlFor='user_first_name'><Translate value='profiles.edit.first_name' /></label>
                <input
                  ref='firstName'
                  name='user_first_name'
                  type='text'
                  value={this.state.user.firstName}
                  onChange={(e) => { this.updateUserField('firstName', e.currentTarget.value); }}
                />
              </div>
            </div>


            <div className='form-group'>
              <div className='form-control'>
                <label className='required' htmlFor='user_last_name'><Translate value='profiles.edit.last_name' /></label>
                <input
                  ref='lastName'
                  name='user_last_name'
                  type='text'
                  value={this.state.user.lastName}
                  onChange={(e) => { this.updateUserField('lastName', e.currentTarget.value); }}
                />
              </div>
            </div>


            <div className='form-group'>
              <div className='form-control'>
                <label className='required' htmlFor='user_email'><Translate value='profiles.edit.email' /></label>
                <input
                  ref='email'
                  name='user_email'
                  type='text'
                  value={this.state.user.email}
                  onChange={(e) => { this.updateUserField('email', e.currentTarget.value); }}
                />
              </div>
            </div>

            <div className='form-group'>
              <div className='form-control'>
                <label className='required' htmlFor='user_timezone'><Translate value='profiles.edit.timezone' /></label>
                <FormSelect
                  ref='timeZone'
                  name='user_timezone'
                  options={TIMEZONE_OPTIONS}
                  value={this.state.user.timeZone}
                  onChange={(val) => { this.updateUserField('timeZone', val); }}
                  multi={false}
                  searchable={true}
                  isOptional={false}
                />
              </div>
            </div>

            <button ref='btnUpdateProfile' className='btn btn-primary' onClick={this.clickUpdateProfile}><Translate value='profiles.edit.update_profile' /></button>

            <button ref='btnChangePassword' className='btn' onClick={this.showPasswordModal}><Translate value='profiles.edit.change_password' /></button>

          </Loader>
        </div>


        <div className='profile-digests balanced-content'>
          <h2><Translate value='profiles.edit.email_digests' /></h2>
          <Loader loaded={!this.state.isUpdatingDigests}>
           <EmailDigestForm
            digestsByProject={this.state.digestsByProject}
            projects={this.props.projects}
            onUpdate={this.updateDigestValues}
          />

            <button ref='btnUpdateDigests' className='btn btn-primary' onClick={this.clickUpdateDigests}><Translate value='profiles.edit.update_digest_settings' /></button>
          </Loader>
        </div>

        <Modal ref='changePasswordModal' isOpen={this.state.passwordModalIsOpen}>
          <ChangePasswordForm
            isUpdatingPassword={this.state.isUpdatingPassword}
            passwordErrors={this.state.passwordErrors}
            onCancel={this.passwordFormCancel}
            onSubmit={this.passwordFormSubmit}
          />
        </Modal>

      </div>
    );

  }
}

// Export the translate() wrapped version
export default Profile;
