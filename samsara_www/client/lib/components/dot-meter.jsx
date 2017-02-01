import React, { PropTypes } from 'react';
import numeral from 'numeral';

export default class DotMeter extends React.Component {

  static propTypes = {
    label : PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    min   : PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    max   : PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    val   : PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    pct   : PropTypes.number.isRequired,
    unit  : PropTypes.string
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {

    const { label, min, max, val, pct } = this.props;

    const format = (this.props.unit !== undefined) ? `${this.props.unit}0,0` : '0,0';

    return (
      <div className='dot-meter'>
        <div className='label'>{label}</div>
        <div className='value'>{numeral(val).format(format)}</div>
        <div className='bar'>
          <div className='track'>
            <div className='point' style={ {left: pct+'%'} }></div>
          </div>
        </div>
        <div className='min'>{numeral(min).format(format)}</div>
        <div className='max'>{numeral(max).format(format)}</div>
      </div>
    );
  }

}
