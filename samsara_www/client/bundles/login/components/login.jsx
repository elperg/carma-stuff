import React, { PropTypes } from 'react';
import { Translate, Localize } from 'react-redux-i18n';
import { browserHistory } from 'react-router';

class Login extends React.Component {

  static propTypes = {
    isBusy        : PropTypes.bool.isRequired,
    isLoggedIn    : PropTypes.bool.isRequired,
    login         : PropTypes.func.isRequired,
    resetPassword : PropTypes.func.isRequired
  };

  state = {
    email: '',
    password: '',
    isForgotPassword: false,
    isBusy: false
  };

  constructor(props, context) {
    super(props, context);
    _.bindAll(this, ['clickLogin', 'clickResetPassword', 'clickForgotPassword', 'changeEmail', 'changePassword']);
  }

  componentDidMount() {
    // if we already have user in state, redirect to projects
    if(this.props.isLoggedIn === true) {
      this.redirectAfterLogin();
    }
  }

  componentWillReceiveProps(nextProps) {

    console.log("login.jsx: STILL NEED TO HANDLE FAILED LOGINS");

    if(nextProps.isLoggedIn === true) {
      this.redirectAfterLogin();
    } else {
      // free up the form, take errors
      // TODO
    }
  }

  redirectAfterLogin() {
    const redirectUri = (_.isEmpty(this.props.location.query.redirect) === false) ? this.props.location.query.redirect : '/projects';
    browserHistory.push(redirectUri);
  }

  clickLogin() {
    const { email, password } = this.state;
    this.props.login(email, password);
  }

  clickResetPassword() {
    const { email } = this.state;
    this.props.resetPassword(email);
  }

  clickForgotPassword() {
    const { isForgotPassword } = this.state;
    this.setState({ isForgotPassword: !isForgotPassword });
  }

  changeEmail(val) {
    this.setState({ email: val});
  }

  changePassword(val) {
    this.setState({ password: val});
  }

  render() {

    let passwordField, submitBtn;

    if(this.state.isForgotPassword === false) {
      passwordField = (
        <div>
          <label htmlFor='password'>Password</label>
          <input type='password' ref='password' id='password' disabled={this.props.isBusy} value={this.state.password} onChange={(e) => this.changePassword(e.currentTarget.value) } />
        </div>
      );

      submitBtn = (<button ref='login' disabled={this.props.isBusy} onClick={this.clickLogin}>Login</button>);

    } else {

      submitBtn = (<button ref='reset-password' disabled={this.props.isBusy} onClick={this.clickResetPassword}>Reset Password</button>);

    }

    return (
      <div className='login'>

        <div>
          <label htmlFor='email'>Email</label>
          <input type='email' ref='email' id='email' value={this.state.email} disabled={this.props.isBusy} onChange={(e) => this.changeEmail(e.currentTarget.value) } />
        </div>

        {passwordField}

        <div>
          {submitBtn}
        </div>

      </div>
    );

  }
}

// Export the translate() wrapped version
export default Login;
