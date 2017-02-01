import React, { PropTypes } from 'react';
import _ from 'lodash';
import { Translate, Localize } from 'react-redux-i18n';
import countries from 'i18n-iso-countries';

class TopOutlets extends React.Component {

  static propTypes = {
    data: PropTypes.array.isRequired
  };

  state = {
  }

  constructor(props, context) {
    super(props, context);
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {

    const { data } = this.props;

    const currentLocale = 'en';

    let outletElements;

    if(data.length === 0) {

      outletElements = (<p className='empty'><Translate value='overviews.top_outlets.empty' /></p>);

    } else {

      const outletLis = data.map((outlet, i) => {
        return(
          <li key={i} className='top__item'>
            <h4 className='top__heading'>{outlet.outletName}</h4>
            <ul className='meta-list'>
              <li>{outlet.mediaType}</li>
              <li>{countries.getName(outlet.origin, currentLocale)}</li>
            </ul>
          </li>
        );
      });

      outletElements = (<ol className='top top--ordered'>{outletLis}</ol>);
    }

    return (
      <div>
        <h2 className='section__heading'><Translate value='overviews.top_outlets.heading' /></h2>
        {outletElements}
      </div>
    );
  }
}


export default TopOutlets;

