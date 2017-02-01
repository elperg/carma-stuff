import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Translate, Localize, I18n } from 'react-redux-i18n';

import ProjectListItem from './project-list-item';

class ProjectList extends React.Component {

  static propTypes = {
    projects : PropTypes.array.isRequired
  };

  state = {
    query: '',
    projects: []
  };

  constructor(props, context) {
    super(props, context);
    _.bindAll(this, ['filterProjects']);
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.setState({
      query: '',
      projects : this.props.projects
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      projects : nextProps.projects
    });
  }

  filterProjects() {

    const query = this.refs.query.value;

    // if query is empty, reset state
    if(query === '') {

      this.setState({ query: query, projects: this.props.projects });

    } else {

      const queryRegExp = new RegExp(query.trim(),'gmi');

      // filter the entire list of organizations by name
      const filteredProjects = this.props.projects.filter((org) => {
        return queryRegExp.test(org.name);
      });

      this.setState({ query: query, projects: filteredProjects });

    }
  }

  updateQuery(newQueryVal) {
    this.setState({ query: newQueryVal });
  }

  render() {

    const projectElems = this.state.projects.map((projectData) => {
      return (
        <ProjectListItem key={projectData.id} data={projectData} />
      );
    });

    return (

      <div className='projects-list'>

        <form className='project_search' onSubmit={(e) => { e.preventDefault(); }}>
          <input
            type='text'
            ref='query'
            placeholder={I18n.t('projects.index.search_placeholder')}
            value={this.state.query}
            onChange={(e) => { this.updateQuery(e.currentTarget.value) }}
          />
          <button onClick={this.filterProjects}><Translate value='projects.index.search_input' /></button>
        </form>

        <ul>
          {projectElems}
        </ul>

      </div>
    );

  }
}


export default ProjectList;
