import React, { PropTypes } from 'react';
import _ from 'lodash';
import numeral from 'numeral';

import FormSelect from 'lib/components/form-select';
import SVGIconRemove from 'babel!svg-react!../../../lib/svg/icon_cross.svg?name=SVGIconRemove';

export default class EmailDigestTimepicker extends React.Component {

  static propTypes = {
    time      : PropTypes.string.isRequired,
    onChange  : PropTypes.func.isRequired,
    onRemove  : PropTypes.func.isRequired
  };

  static defaultProps = {
    time  : '07:00'
  };

  state = {
    time  : '07:00'
  };

  constructor(props, context) {
    super(props, context);
    _.bindAll(this, ['changeTime', 'clickRemove']);
  }

  componentWillMount() {
    const time = (/[\d]{1,2}\:[\d]{2}/.test(this.props.time)) ? this.props.time : this.props.time+'0';
    this.setState({ time: time });
  }

  componentWillReceiveProps(nextProps) {
    const time = (/[\d]{1,2}\:[\d]{2}/.test(this.props.time)) ? nextProps.time : nextProps.time+'0';
    this.setState({ time: nextProps.time });
  }

  changeTime(newTime) {
    this.props.onChange(newTime);
  }

  clickRemove() {
    this.props.onRemove();
  }


  render() {

    let options = [];
    let hh = 0;
    let isHalfHour = false;

    // generate the time selects by looping through hours
    while(hh < 24) {

      const hours = numeral(hh).format('00');
      const minutes = (isHalfHour === true) ? '30' : '00';

      const time = hours+':'+minutes;

      options.push({ label: time, value: time });

      // flip half-hour switch and increment 'hh'
      isHalfHour = !isHalfHour;
      hh++;
    }

    return (
      <div className='time-picker'>
        <FormSelect
          ref='time'
          name='time'
          options={options}
          value={this.state.time}
          onChange={this.changeTime}
          multi={false}
          searchable={false}
          isOptional={false}
        />
      <span className='remove' onClick={this.clickRemove}>
        <SVGIconRemove  />
      </span>
    </div>
    );

  }
}
