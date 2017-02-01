import React, { PropTypes } from 'react';
import { Translate, Localize } from 'react-redux-i18n';
import { Link } from 'react-router';


export class ProjectListItem extends React.Component {
  static propTypes = {
    // If you have lots of data or action properties, you should consider grouping them by
    // passing two properties: 'data' and 'actions'.
    data  : PropTypes.shape({
              id                : PropTypes.number.isRequired,
              uid               : PropTypes.string.isRequired,
              name              : PropTypes.string.isRequired,
              active            : PropTypes.bool.isRequired,
              collectionsCount  : PropTypes.number,
              membersCount      : PropTypes.number
            }).isRequired

  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { data } = this.props;

    let metadata;
    if(data.collectionsCount !== undefined && data.membersCount !== undefined) {
      metadata = (
        <ul className='dashboard-project_meta'>
          <li key={data.uid + '-collections'}>
            <span className='meta-accent'><Translate value='projects.index.collections' /></span>
            <span className='count-indicator'>{data.collectionsCount}</span>
          </li>
          <li key={data.uid + '-members'}>
            <span className='meta-accent'><Translate value='projects.index.members' /></span>
            <span className='count-indicator'>{data.membersCount}</span>
          </li>
        </ul>
      );
    }

    return (
      <li className='project-list__item'>
        <h3><Link to={'/projects/'+data.uid+'/overview'}>{data.name}</Link></h3>
      </li>
    );
  }
}


export default ProjectListItem;
