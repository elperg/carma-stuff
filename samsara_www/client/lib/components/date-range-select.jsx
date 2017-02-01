import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import SVGIconCalendar from 'babel!svg-react!../svg/icon_calendar.svg?name=SVGIconCalendar';


import { DateRange } from 'react-date-range';
import moment from 'moment';
import $ from 'jquery';


export default class DateRangeSelect extends React.Component {
  static propTypes = {
    fromDate  : PropTypes.string.isRequired,
    toDate    : PropTypes.string.isRequired,
    onChange  : PropTypes.func.isRequired
  };

  state = {
    isCalendarVisible : false
  }

  constructor(props, context) {
    super(props, context);
    _.bindAll(this, ['onRangeChange', 'toggleCalendarVisibility']);
  }

  componentWillMount() {
    // update date state
    this.updateDateState(this.props);
  }

  componentDidMount() {
    // Drop the interior next/prev buttons from the calendar
    const $el = $(ReactDOM.findDOMNode(this.refs['date-range-picker']));

    const $nextButttons = $el.find('.rdr-MonthAndYear-button.next');
    const $prevButttons = $el.find('.rdr-MonthAndYear-button.prev');

    $nextButttons.eq(0).css({visibility:'hidden'});
    $prevButttons.eq(1).css({visibility:'hidden'});
  }

  componentWillReceiveProps(nextProps) {
    // update date state
    this.updateDateState(nextProps);
  }

  updateDateState(props) {

    const fromDate = this.parseDateString(props.fromDate);
    const toDate = this.parseDateString(props.toDate);

    this.setState({ fromDate, toDate });
  }

  parseDateString(dateStr) {

    if(_.isString(dateStr) === false) {
      throw new Error('DateRangeSelect.parseDateString(dateStr): dateStr is not a string: ' + dateStr);
    }

    const matches = /^([\d]{4})-([\d]{1,2})-([\d]{1,2})/.exec(dateStr);

    if(matches === undefined || matches === null) {
      throw new Error('DateRangeSelect.parseDateString(dateStr): dateStr is not "YYYY-MM-DD": ' + dateStr);
    }

    const dateVals = matches.slice(1).map((val) => { return parseInt(val) });

    return moment.utc([dateVals[0], dateVals[1]-1, dateVals[2]]);

  }

  toggleCalendarVisibility() {
    this.setState({
      isCalendarVisible: !this.state.isCalendarVisible
    });
  }

  onRangeChange(payload) {

    // update state
    const newState = {
      fromDate  : payload.startDate,
      toDate    : payload.endDate
    };

    this.setState(newState);

    // Stringify props for filter
    const stringifiedProps = {
      fromDate  : newState.fromDate.format('YYYY-MM-DD'),
      toDate    : newState.toDate.format('YYYY-MM-DD')
    }

    this.props.onChange(stringifiedProps);

  }

  render() {

    const dateRanges = {
                        'Today': {
                          startDate: (now) => now,
                          endDate: (now) => now
                        },

                        'Yesterday': {
                          startDate: (now) => now.add(-1, 'days'),
                          endDate: (now) => now.add(-1, 'days')
                        },

                        'Last 7 Days': {
                          startDate: (now) => now.add(-7, 'days'),
                          endDate: (now) => now
                        },

                        'Last 30 Days': {
                          startDate: (now) => now.add(-30, 'days'),
                          endDate: (now) => now
                        }
                      };

    const { fromDate, toDate } = this.state;

    const composedDateRange = fromDate.format('MMM D') + ' - ' + toDate.format('MMM D, YYYY');

    const hiddenStyle = (this.state.isCalendarVisible === false) ? { display: 'none' } : {};
    const highlightedStyle = (this.state.isCalendarVisible === true) ? { backgroundColor: '#fafcff' } : {};

    const minimumDate = moment([1998,0,1]); // Carma epoch?
    const maximumDate = moment();




    return (
      <div className='date-range-select'>
        <button ref='button' onClick={this.toggleCalendarVisibility} className='date-range-filter' style={highlightedStyle}>
          <SVGIconCalendar />
          <span className='value'>{composedDateRange}</span>
        </button>

        <div ref='date-picker' className='date-range-picker' style={hiddenStyle} onMouseLeave={this.toggleCalendarVisibility}>
          <DateRange
            ref='date-range-picker'
            linkedCalendars={ true }
            ranges={ dateRanges }
            minDate={ minimumDate }
            maxDate={ maximumDate }
            startDate={ fromDate }
            endDate={ toDate }
            onChange={this.onRangeChange}
            theme={{
              Calendar : { width: 200 },
              PredefinedRanges : { display: 'none' }
            }}
          />
        </div>

      </div>
    );
  }

}
