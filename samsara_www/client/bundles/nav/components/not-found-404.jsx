import React, { PropTypes } from 'react';
import { Translate } from 'react-redux-i18n';
import { Link } from 'react-router';

import SVGCarmaLogo from 'babel!svg-react!../../../lib/svg/icon_carma_logo3.svg?name=SVGCarmaLogo';

export class NotFound404 extends React.Component {

  static propTypes = {
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className='not-found-404'>

        <div className='logo'><Link to='/'><SVGCarmaLogo /></Link></div>

        <h3><Translate value='application.not_found' /></h3>

      </div>
    );
  }

}


export default NotFound404;
