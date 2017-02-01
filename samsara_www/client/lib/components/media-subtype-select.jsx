import React, { PropTypes } from 'react';
import _ from 'lodash';


export default class MediaSubtypeSelect extends React.Component {

  static propTypes = {
    mediaSubtypes : PropTypes.array.isRequired,
    values        : PropTypes.array,
    onChange      : PropTypes.func.isRequired
  };

  state = {
    selectedValues  : []
  };

  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'onClickMediaSubtype');
  }

  componentWillMount() {
    this.setState({ selectedValues: this.props.values || [] });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ selectedValues: nextProps.values });
  }

  onClickMediaSubtype(type, shouldInclude) {

    // Create the new selected values array based on whether or not 'val' is already in our selected values
    let newSelectedValues = (shouldInclude === true) ? [type, ...this.state.selectedValues] : _.without(this.state.selectedValues, type);

    // Update state
    this.setState({ selectedValues: newSelectedValues });

    // fire the 'onChange' method from props with the new selected values
    this.props.onChange(newSelectedValues);

  }

  render() {

    // compose a set of checkbox-style elements
    const subtypeOptions = this.props.mediaSubtypes.map((subtype) => {

      // it's checked if the subtype is in our selectedValues state
      let isChecked = (this.state.selectedValues.indexOf(subtype) > -1);
      let labelClassName = (isChecked === true) ? 'checked' : '';

      let idAttr = `article_filter_media_subtypes_${subtype}`;

      return (
              <span
                ref={`${subtype}-checkbox`}
                key={`${subtype}-checkbox`}
                className='checkbox toggle'
                onClick={(e) => { e.preventDefault(); this.onClickMediaSubtype(subtype, !isChecked); } }
              >
                <label htmlFor={idAttr} className={labelClassName}>
                  <input
                    className='toggle_check_boxes optional toggle__input'
                    type='checkbox'
                    value={subtype}
                    checked={isChecked}
                    name='article_filter[media_subtypes][]'
                    id={idAttr}
                    readOnly
                  />
                  <span className='toggle__label'>{subtype}</span>
                </label>
              </span>
              );
    });

    return (
      <div className='input toggle_check_boxes optional article_filter_media_subtypes'>
        {subtypeOptions}
      </div>
    );
  }

}
