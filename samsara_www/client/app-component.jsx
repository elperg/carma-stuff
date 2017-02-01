import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { browserHistory } from 'react-router'

import fetchUserInfo from 'lib/actions/fetch-userinfo';

import Loader from 'lib/components/loader';
import ProjectNavigationContainer from './bundles/nav/containers/project-navigation-container';
import PublicNavigationContainer from './bundles/nav/containers/public-navigation-container';

export class App extends React.Component {

  static propTypes = {
    isPublicRoute : PropTypes.bool.isRequired,
    isBusy        : PropTypes.bool.isRequired,
    isLoggedIn    : PropTypes.bool.isRequired,
    isPopulated   : PropTypes.bool.isRequired,
    projects      : PropTypes.array.isRequired,
    fetchUserInfo : PropTypes.func.isRequired
  };

  state = {
    isReady : false
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {

    const redirectArg = (this.props.location.pathname !== '/' && this.props.location.pathname !== '/login') ? '?redirect='+encodeURIComponent(this.props.location.pathname) : '';

    // is the user logged in?
    if(this.props.isLoggedIn !== true) {

      // not logged in, re-route to login, with the redirect route
      browserHistory.push('/login'+redirectArg);

    } else if(this.props.isPopulated === false) {

      // if we haven't populated the user yet, fetch it
      this.props.fetchUserInfo();

    }

  }

  componentWillReceiveProps(nextProps) {

    this.setState({ isReady: (nextProps.isPublicRoute === true || (nextProps.isLoggedIn === true && nextProps.isPopulated === true)) });

    // fetch user info if we're not populated
    if(nextProps.isLoggedIn === true && nextProps.isPopulated === false) {
      this.props.fetchUserInfo();
    }

  }

  render() {

    const navigation = (this.state.isReady === true && this.props.selectedProjectUid !== undefined) ? <ProjectNavigationContainer projectUid={this.props.selectedProjectUid} /> : <PublicNavigationContainer />;
    const children = (this.state.isReady === true) ? (<main id="main">{this.props.children}</main>) : <Loader loaded={false} />;

    const today = new Date();
    const copyrightDates = (today.getFullYear() > 2016) ? '2016-'+today.getFullYear() : '2016';

    return (
      <div>
        {navigation}
        {children}
        <footer>
          <p className='copyright'>&copy; {copyrightDates} CARMA</p>
        </footer>
      </div>
    );

  }
}

const mapStateToProps = (state, ownProps) => {

  // add a 'isPublicRoute'
  let isPublicRoute;
  switch(ownProps.location.pathname) {
    case '/':
    case '/login':
      isPublicRoute = true;
      break;

    default:
      // check to make sure that it's not a public articles URL
      isPublicRoute = /^\/a\//.test(ownProps.location.pathname);

  }

  return {
    isPublicRoute,
    isBusy              : state.user.isBusy,
    isLoggedIn          : state.user.isLoggedIn,
    isPopulated         : state.user.isPopulated,
    projects            : state.projects.data,
    selectedProjectUid  : ownProps.params.projectUid
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUserInfo: () => { dispatch(fetchUserInfo()); }
  };
}



export default connect(mapStateToProps, mapDispatchToProps)(App);





