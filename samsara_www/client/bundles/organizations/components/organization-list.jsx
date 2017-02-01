import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Translate, Localize, I18n } from 'react-redux-i18n';

import OrganizationListItem from './organization-list-item';


class OrganizationList extends React.Component {

  static propTypes = {
    organizations : PropTypes.array.isRequired
  };

  state = {
    query: '',
    organizations: []
  };

  constructor(props, context) {
    super(props, context);
    _.bindAll(this, ['filterOrganizations']);
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.setState({
      query: '',
      organizations : this.props.organizations
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      organizations : nextProps.organizations
    });
  }

  filterOrganizations() {

    const query = this.refs.query.value;

    // if query is empty, reset state
    if(query === '') {

      this.setState({ organizations: this.props.organizations });

    } else {

      const queryRegExp = new RegExp(query.trim(),'gmi');

      // filter the entire list of organizations by name
      const filteredOrgs = this.props.organizations.filter((org) => {
        return queryRegExp.test(org.name);
      });

      this.setState({ organizations: filteredOrgs });

    }
  }

  updateQuery(newQueryVal) {
    this.setState({ query: newQueryVal });
  }

  render() {

    const organizationElems = this.state.organizations.map((organizationData) => {
      return (<OrganizationListItem key={organizationData.id} data={organizationData} />);
    });

    return (

      <div className='organizations-list'>

        <form className='organization_search' onSubmit={(e) => { e.preventDefault(); }}>
          <input
            type='text'
            ref='query'
            placeholder={I18n.t('organizations.index.search_placeholder')}
            value={this.state.query}
            onChange={(e) => { this.updateQuery(e.currentTarget.value) }}
          />
          <button onClick={this.filterOrganizations}><Translate value='organizations.index.search_input' /></button>
        </form>

        <ul>
          {organizationElems}
        </ul>

      </div>
    );

  }
}



export default OrganizationList;
