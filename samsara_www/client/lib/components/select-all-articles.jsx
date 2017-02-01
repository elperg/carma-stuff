import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import _ from 'lodash';

class SelectAllArticles extends React.Component {

  static propTypes = {
    selectedArticleIds  : PropTypes.array.isRequired,
    articles            : PropTypes.array.isRequired,
    actions             : PropTypes.shape({
                          selectAll    : PropTypes.func.isRequired,
                          deselectAll  : PropTypes.func.isRequired
                        }).isRequired,
  };

  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'clickSelectAll');
  }

  state = {
    isChecked: false
  };

  clickSelectAll() {

    const isChecked = this.state.isChecked;
    this.setState({ isChecked: !this.state.isChecked });

    if(isChecked === true) {
      this.props.actions.deselectAll();
    } else {
      const articleIds = _.map(this.props.articles, 'id');
      this.props.actions.selectAll(articleIds);
    }

  }

  componentWillMount() {
    this.setState({ isChecked: (this.props.articles.length > 0 && this.props.selectedArticleIds.length ===  this.props.articles.length) });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isChecked: (nextProps.articles.length > 0 && nextProps.selectedArticleIds.length ===  nextProps.articles.length)  });
  }

  render() {

    const selectedClassName = (this.state.isChecked === true) ? ' selected' : '';

    return (
      <div className={'selectAll' + selectedClassName}>
        <div className='checkbox' onClick={this.clickSelectAll}></div>
      </div>
    );
  }
}

export default SelectAllArticles;

