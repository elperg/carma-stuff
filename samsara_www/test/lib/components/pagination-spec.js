import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import { Pagination } from 'client/lib/components/pagination';

describe('Pagination', () => {

  let component, props;

  beforeEach(() => {

    props = {
      i18nKey     : 'pagination.label',

      totalCount  : 20,
      pageSize    : 10,
      currentPage : 1,

      actions     : {
                      first     : (key) => key,
                      previous  : (key) => key,
                      next      : (key) => key,
                      last      : (key) => key
                    }
    }


  });

  it('should render pagination control for the first page, with previous pages disabled, last pages enabled', () => {

    // for sanity, we're on first page
    props.currentPage = 1;

    component = TestUtils.renderIntoDocument(<Pagination {...props} />);

    // previous page refs should be disabled
    expect(/disabled/.test(component.refs.first.className)).toBeTruthy();
    expect(/disabled/.test(component.refs.previous.className)).toBeTruthy();

    // next page refs should be enabled
    expect(/disabled/.test(component.refs.next.className)).toBeFalsy();
    expect(/disabled/.test(component.refs.last.className)).toBeFalsy();

    expect(component.refs.summary.innerHTML).toEqual(t(props.i18nKey, { start: 1, end: 10, total: 20 }));

  });

  it('should render pagination control for the last page, with previous pages enabled, last pages disabled', () => {

    // set to second page
    props.currentPage = 2;

    component = TestUtils.renderIntoDocument(<Pagination {...props} />);

    // previous page refs should be enabled
    expect(/disabled/.test(component.refs.first.className)).toBeFalsy();
    expect(/disabled/.test(component.refs.previous.className)).toBeFalsy();

    // next page refs should be disabled
    expect(/disabled/.test(component.refs.next.className)).toBeTruthy();
    expect(/disabled/.test(component.refs.last.className)).toBeTruthy();

    expect(component.refs.summary.innerHTML).toEqual(t(props.i18nKey, { start: 11, end: 20, total: 20 }));

  });

  it('should call "clickPage" when clicking on any of the pagination elements, regardless of pagination state', () => {

    component = TestUtils.renderIntoDocument(<Pagination {...props} />);

    spyOn(component, 'clickPage');

    TestUtils.Simulate.click(component.refs.first);
    expect(component.clickPage).toHaveBeenCalledTimes(1);

    TestUtils.Simulate.click(component.refs.previous);
    expect(component.clickPage).toHaveBeenCalledTimes(2);

    TestUtils.Simulate.click(component.refs.next);
    expect(component.clickPage).toHaveBeenCalledTimes(3);

    TestUtils.Simulate.click(component.refs.last);
    expect(component.clickPage).toHaveBeenCalledTimes(4);

  });

  xit('clickPage(key) should NOT call props.action() if refs[key] is DISABLED', () => {

    // spy on action
    spyOn(props, 'action');

    // for sanity, we're on first page
    props.currentPage = 1;

    component = TestUtils.renderIntoDocument(<Pagination {...props} />);

    // Both first and previous will be disabled
    component.clickPage('first');
    expect(props.action).not.toHaveBeenCalled();

    component.clickPage('previous');
    expect(props.action).not.toHaveBeenCalled();

    // Both next and last should be enabled
    component.clickPage('next');
    expect(props.action).toHaveBeenCalledTimes(1);

    component.clickPage('last');
    expect(props.action).toHaveBeenCalledTimes(2);

  });


  it('should change state and reflect new props from parent and call updatePaginationState()', () => {

    // delete 'totalCount' from props
    delete props.totalCount;

    // Make a wrapper test component to change props of <Pagination />
    const PaginationTestWrapper = React.createClass({
      getInitialState() {
        return { totalCount: 20 }
      },
      render() {
        return(<Pagination ref='pagination' totalCount={this.state.totalCount} {...props} />);
      }
    });

    // setup wrapper and component instance by ref
    let testWrapper = TestUtils.renderIntoDocument(<PaginationTestWrapper />);
    component = testWrapper.refs.pagination;

    // spy on updatePaginationState()
    spyOn(component, 'updatePaginationState');

    // update state to be 2
    const newTotalCount = 2;
    testWrapper.setState({ totalCount: newTotalCount });

    // add test props
    _.extend(props, { totalCount: newTotalCount });
    expect(component.updatePaginationState).toHaveBeenCalledWith(props);

  });

  it('updatePaginationState(totalCount, pageSize, currentPage) should change component state', () => {

    component = TestUtils.renderIntoDocument(<Pagination {...props} />);

    // next page refs should be enabled
    expect(/disabled/.test(component.refs.next.className)).toBeFalsy();
    expect(/disabled/.test(component.refs.last.className)).toBeFalsy();

    // now call update pagination state with 1, 10, and 1
    _.extend(props, { currentPage: 1, pageSize: 10, totalCount: 1 });
    component.updatePaginationState(props);

    // next page should now be disabled
    expect(/disabled/.test(component.refs.next.className)).toBeTruthy();
    expect(/disabled/.test(component.refs.last.className)).toBeTruthy();

  });

});
