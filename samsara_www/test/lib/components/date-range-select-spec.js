import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import DateRangeSelect from 'client/lib/components/date-range-select';

import moment from 'moment';
import {} from 'moment-range';


describe('Date Range Select', () => {

  let component, props;

  beforeEach(() => {

    props = {

      fromDate  : new Date(2016,1,1),
      toDate    : new Date(2016,2,15),

      onChange  : (newRange) => { console.log(newRange.fromDate, newRange.toDate); }
    }


  });

  xit('should render a <button> with an <Isvg>, and a hidden <DateRangePicker /> component', () => {

  });

  xit('should toggle the visibility of the <DateRangePicker /> by clicking on the button', () => {

  });

  xit('should fire the onChange() prop with an object of { fromDate: <Date>, toDate: <Date> }', () => {

  });

});
