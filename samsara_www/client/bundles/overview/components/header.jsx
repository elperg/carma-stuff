import React, { PropTypes } from 'react';
import _ from 'lodash';
import { Translate, Localize } from 'react-redux-i18n';
import numeral from 'numeral';
import Tooltip from 'lib/components/tooltip';
import SparklineChart from 'lib/components/sparkline-chart';


/*
    SAMPLE DATA
    [
      {
        medium: "tv",
        count: "0",
        pctChange: "0%"
      },
      {
        medium: "radio",
        count: "0",
        pctChange: "0%"
      },
      {
        medium: "website",
        count: "0",
        pctChange: "-100%"
      }
    ]
*/

class Header extends React.Component {

  static propTypes = {
    range       : PropTypes.oneOf(['week', 'day']).isRequired,
    newArticles : PropTypes.array.isRequired,
    newCoverage : PropTypes.shape({
                    count     : PropTypes.number.isRequired,
                    pctChange : PropTypes.number.isRequired,
                    weekData  : PropTypes.array.isRequired
                  }).isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { range, newArticles, newCoverage } = this.props;

    // temp
    return (<div />);

    const idPrefix = _.uniqueId('project-overview-header_');

    const mediaTypeNumbers = newArticles.map((subtype) => {

      const positiveNegative = (newCoverage.pctChange > 0) ? 'up' : 'down';

      return (
        <li className='stat'>
            <div className='stat__key'><Translate value='overviews.header.new_articles' /></div>
            <div className='state__value' data-tip data-for={idPrefix+'-'+subtype.medium}>
              {numeral(subtype.count).format('0,0')}
            </div>
            <div className={'stat__change hint--bottom stat__change--'+positiveNegative}>
              {numeral(subtype.pctChange).format('0%')}
            </div>
            <Tooltip id={idPrefix+'-'+subtype.medium} place='bottom'><Translate value='SOMETHING HERE' /></Tooltip>
        </li>
      );
    });


    const sparklineDirection = (newCoverage.pctChange > 0) ? 'up' : 'down';


    return (
      <div>
        <h1 className='overview__date'>Date? {/*l(Time.current.in_time_zone(current_user.time_zone).to_date*/}</h1>

        <ul className='overview__stats'>
          <li className='stat stat--border'>
            <div className='stat__key'><Translate value='overviews.header.new_articles' /></div>
            <div className='state__value state__value--sparkline' data-tip data-for={idPrefix+'sparkline'}>
              {numeral(newCoverage.count).format('0,0')}
            </div>
            <div className={'stat__change hint--bottom stat__change--'+sparklineDirection}>
              {numeral(newCoverage.pctChange).format('0%')}
            </div>
            <SparklineChart data-tip data-for={idPrefix+'sparkline'} />
            <Tooltip id={idPrefix+'sparkline'} place='bottom'><Translate value='overviews.header.sparkline_tip' /></Tooltip>

          </li>

          {mediaTypeNumbers}
        </ul>
      </div>
    );

  }
}


export default Header;

