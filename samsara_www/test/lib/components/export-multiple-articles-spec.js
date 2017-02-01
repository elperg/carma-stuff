import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import { ExportMultipleArticles } from 'client/lib/components/export-multiple-articles';

xdescribe('Export Multiple Articles Component', () => {

  let component, props;

  beforeEach(() => {

    props = {
      selectedCount : 20,
      exportActions : {
                        exportSelected  : jasmine.createSpy('exportSelected'),
                        exportAll       : jasmine.createSpy('exportAll')
      }
    }

  });

  it('should render a drop down menu', () => {

    component = TestUtils.renderIntoDocument(<ExportMultipleArticles {...props} />);

    let toggle = TestUtils.findRenderedDOMComponentWithClass(component, 'dropdown__toggle');
    expect(toggle).not.toBeUndefined();

    expect(component.refs.menu.className).toEqual('menu');

  });

  it('should render only export-all options when selectedCount is 0', () => {

    props.selectedCount = 0;

    component = TestUtils.renderIntoDocument(<ExportMultipleArticles {...props} />);

    // check for export all elements
    expect(component.refs['all-heading']).not.toBeUndefined();
    expect(component.refs['csv-all']).not.toBeUndefined();
    expect(component.refs['rima-all']).not.toBeUndefined();

    // expect selected-only elements to be undefined
    expect(component.refs['selected-heading']).toBeUndefined();
    expect(component.refs['csv-selected']).toBeUndefined();
    expect(component.refs['rima-selected']).toBeUndefined();
    expect(component.refs['pdf']).toBeUndefined();
    expect(component.refs['docx']).toBeUndefined();
    expect(component.refs['clippings']).toBeUndefined();
    expect(component.refs['print']).toBeUndefined();

  });

  it('should render export-all and export-selected options when selectedCount is greater than 0', () => {

    props.selectedCount = 10;

    component = TestUtils.renderIntoDocument(<ExportMultipleArticles {...props} />);

    // check for export all elements
    expect(component.refs['all-heading']).not.toBeUndefined();
    expect(component.refs['csv-all']).not.toBeUndefined();
    expect(component.refs['rima-all']).not.toBeUndefined();

    // expect selected-only elements to be undefined
    expect(component.refs['selected-heading']).not.toBeUndefined();
    expect(component.refs['csv-selected']).not.toBeUndefined();
    expect(component.refs['rima-selected']).not.toBeUndefined();
    expect(component.refs['pdf']).not.toBeUndefined();
    expect(component.refs['docx']).not.toBeUndefined();
    expect(component.refs['clippings']).not.toBeUndefined();
    expect(component.refs['print']).not.toBeUndefined();

  });

  it('should call props.action with appropriate keys on click events', () => {

    props.selectedCount = 10;

    spyOn(props, 'action');

    component = TestUtils.renderIntoDocument(<ExportMultipleArticles {...props} />);

    TestUtils.Simulate.click(component.refs['csv-selected']);
    expect(props.action).toHaveBeenCalledWith('csv-selected');

    TestUtils.Simulate.click(component.refs['rima-selected']);
    expect(props.action).toHaveBeenCalledWith('rima-selected');

    TestUtils.Simulate.click(component.refs['pdf']);
    expect(props.action).toHaveBeenCalledWith('pdf-selected');

    TestUtils.Simulate.click(component.refs['docx']);
    expect(props.action).toHaveBeenCalledWith('docx-selected');

    TestUtils.Simulate.click(component.refs['clippings']);
    expect(props.action).toHaveBeenCalledWith('clippings-selected');

    TestUtils.Simulate.click(component.refs['print']);
    expect(props.action).toHaveBeenCalledWith('print-selected');

    TestUtils.Simulate.click(component.refs['csv-all']);
    expect(props.action).toHaveBeenCalledWith('csv-all');

    TestUtils.Simulate.click(component.refs['rima-all']);
    expect(props.action).toHaveBeenCalledWith('rima-all');

  });

});
