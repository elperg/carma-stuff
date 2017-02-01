import React, { PropTypes } from 'react';
import { Translate, Localize, I18n } from 'react-redux-i18n';
import Select from 'react-select';
import _ from 'lodash';

export class FormSelect extends React.Component {

  static propTypes = {
    onChange    : PropTypes.func.isRequired,
    options     : PropTypes.array.isRequired,
    name        : PropTypes.string.isRequired,
    id          : PropTypes.string,
    value       : PropTypes.oneOfType([ PropTypes.array, PropTypes.string ]),
    className   : PropTypes.string,
    isOptional  : PropTypes.bool,
    multi       : PropTypes.bool,
    searchable  : PropTypes.bool
  };

  static defaultProps = {
    multi       : false,
    searchable  : true
  };

  state = {
    value: ''
  };

  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'onSelectChange');
  }

  componentDidMount() {
    this.setState({ value: this.props.value });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

  buildOptionsArray() {

    let selectOptions = [];

    // loop through our array of options, pushing new objects onto the array
    _.each(this.props.options, (item) => {

      if(_.isObject(item) === true && item.value !== undefined && item.label !== undefined) {

        selectOptions.push(item);

      } else if(_.isArray(item) === true) {

        const [ label, val ] = item;

        if(_.isArray(val) === true) {

          // first, create a 'disabled' option to act as a <optgroup> label
          const subgroupLabel = { value: label, label: label, disabled: true };

          // create an array of options in the sub group
          const subgroupOpts = val.map((subgroupItem) => {
            if(_.isString(subgroupItem) === true) {
              return { value: subgroupItem, label: subgroupItem };
            } else if(_.isArray(subgroupItem) === true) {
              return { value: subgroupItem.join(','), label: subgroupItem[1] };
            }
          });

          // push the label and subgroup options on to selectOptions
          selectOptions.push(subgroupLabel, ...subgroupOpts);

        } else if(_.isString(val) === true) {

          selectOptions.push({ value: val, label });

        }

      } else if(_.isString(item) === true) {

        selectOptions.push({ value: item, label: item });

      }

    });

    return selectOptions;

  }

  onSelectChange(values) {
    const newValues = (_.isArray(values) === true) ? _.map(values, 'value') : values.value;
    this.setState({ value: newValues });
    this.props.onChange(newValues);
  }

  render() {
    const { className, isOptional } = this.props;

    const optionalClassName = (isOptional === true) ? ' optional' : '';

    const selectOptions = this.buildOptionsArray();

    return (
      <div className={`input select ${optionalClassName}${className}`}>
        <Select
          ref='select'
          name={this.props.name}
          value={this.state.value}
          options={selectOptions}
          multi={this.props.multi}
          clearable={this.props.isOptional}
          searchable={this.props.searchable}
          onChange={this.onSelectChange}
        />
      </div>
    );
  }
}

export default FormSelect;
