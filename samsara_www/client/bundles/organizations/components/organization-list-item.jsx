import React, { PropTypes } from 'react';
import moment from 'moment';
import _ from 'lodash';
import { Translate, Localize } from 'react-redux-i18n';
import { Link } from 'react-router';


class OrganizationListItem extends React.Component {

  static propTypes = {
    data              : PropTypes.object.isRequired
  };


  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {

    const { data } = this.props;

    return (
      <li className='organization organization-list_item'>
        <h2><Link to={'/organizations/'+data.uid}>{data.name}</Link></h2>

        <ul className='organization-list_counts'>
          { /* only show this if user is admin or carma staff */ }
          <li><span className='meta-accent'><Translate value='organizations.users' /></span>
            <span className='count-indicator'>{data.usersCount}/{data.maxUsersLimit}</span>
            </li>
          <li><span className='meta-accent'><Translate value='organizations.projects' /></span>
            <span className='count-indicator'>{data.projectsCount}</span>
            </li>
        </ul>
      </li>
    );

  }
}


export default OrganizationListItem;





