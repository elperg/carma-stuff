import React, { PropTypes } from 'react';
import { Translate, Localize } from 'react-redux-i18n';

import { TALKWALKER_URL } from 'lib/app-constants';

class Social extends React.Component {

  static propTypes = {
    talkwalkerUserId  : PropTypes.string
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {

    if(this.props.talkwalkerUserId !== null) {

      // Need to generate the URL
      return (
        <div className='social headless-iframe'>
          <iframe
            src={TALKWALKER_URL + this.props.talkwalkerUserId +'/loginurl?&page=monitor&token_timeout=30m'}
            style={{border:'none', width:'100%', height:'100%'}}
            width='100%'
            height='100%'
          ></iframe>
        </div>
      );

    } else {

      return (
        <div className='social'>
          <p>You are not signed up for this yet...</p>
        </div>
      );

    }
  }
}


export default Social;

