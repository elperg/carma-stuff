import React, { PropTypes } from 'react';
import { Translate, Localize } from 'react-redux-i18n';
import _ from 'lodash';
import numeral from 'numeral';

import SVGIconPaginationFirst from 'babel!svg-react!../svg/icon_pagination_first.svg?name=SVGIconPaginationFirst';
import SVGIconPaginationPrevious from 'babel!svg-react!../svg/icon_pagination_previous.svg?name=SVGIconPaginationPrevious';
import SVGIconPaginationNext from 'babel!svg-react!../svg/icon_pagination_next.svg?name=SVGIconPaginationNext';
import SVGIconPaginationLast from 'babel!svg-react!../svg/icon_pagination_last.svg?name=SVGIconPaginationLast';

export class Pagination extends React.Component {

  static propTypes = {
    totalCount  : PropTypes.number.isRequired,
    pageSize    : PropTypes.number.isRequired,
    page       : PropTypes.number.isRequired,

    actions     : PropTypes.shape({
                    first     : PropTypes.func.isRequired,
                    previous  : PropTypes.func.isRequired,
                    next      : PropTypes.func.isRequired,
                    last      : PropTypes.func.isRequired
                  }).isRequired
  };

  static defaultProps = {
    page : 1
  };

  static initialState = {
    hasPreviousPages  : false,
    hasNextPages      : true
  }

  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'clickPage');
  }

  componentWillMount() {

    // update pagination state
    this.updatePaginationState(this.props);

  }

  componentWillReceiveProps(nextProps) {

    // update pagination state
    this.updatePaginationState(nextProps);

  }

  updatePaginationState(newProps) {

    const { totalCount, pageSize, page } = newProps;

    // Recalculate the number of pages
    const numPages = Math.ceil(totalCount / pageSize);

    this.setState({
                    hasPreviousPages  : (page > 1),
                    hasNextPages      : (page < numPages)
                  });

  }

  clickPage(key) {

    // Find the target by ref
    const target = this.refs[key];

    // If the currentTarget has 'disabled', do nothing
    if(/disabled/.test(target.className) === true) {
      return ;
    }

    // if it's not disabled, fire the action prop with the ref name
    this.props.actions[key]();

  }

  render() {

    const { totalCount, pageSize, page } = this.props;

    // Choose whether to apply disabled classes based on state
    const previousPagesDisabledClassName = (this.state.hasPreviousPages === true) ? "" : " disabled";
    const nextPagesDisabledClassName = (this.state.hasNextPages === true) ? "" : " disabled";

    // Calculate the starting record number
    const startRecord = 1 + ((page-1) * pageSize);

    // Do the second record number (either pageSize * page or the total count)
    const endRecord = (this.state.hasNextPages === true) ? pageSize * page : totalCount;

    // Compose the pagination text
    const text = (totalCount > 0) ? <Translate value='articles.pagination' start={numeral(startRecord).format('0,0')} end={numeral(endRecord).format('0,0')} total={numeral(totalCount).format('0,0')} /> : '';

    return (
      <div className="pagination">
        <span ref="summary" className="summary">{text}</span>
        <button ref="first" onClick={(e) => { this.clickPage('first'); }} className={`first_page${previousPagesDisabledClassName}`}>
          <SVGIconPaginationFirst />
        </button>
        <button ref="previous" onClick={(e) => { this.clickPage('previous'); }} className={`previous_page${previousPagesDisabledClassName}`}>
          <SVGIconPaginationPrevious />
        </button>
        <button ref="next" onClick={(e) => { this.clickPage('next'); }} className={`next_page${nextPagesDisabledClassName}`}>
          <SVGIconPaginationNext />
        </button>
        <button ref="last" onClick={(e) => { this.clickPage('last'); }} className={`last_page${nextPagesDisabledClassName}`}>
          <SVGIconPaginationLast />
        </button>
      </div>
    );

  }

}

export default Pagination;
