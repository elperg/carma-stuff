import React, { PropTypes } from 'react';

import { MY_CARMA_URL } from 'lib/app-constants';

class MyCarma extends React.Component {

  static propTypes = {
    myCarmaUserToken  : PropTypes.string
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {

    if(this.props.myCarmaUserToken !== null) {

      // Need to generate the URL
      return (
        <div className='mycarma headless-iframe'>
          <iframe
            src={MY_CARMA_URL+'/?auth_token='+this.props.myCarmaUserToken}
            style={{border:'none', width:'100%', height:'100%'}}
            width='100%'
            height='100%'
          ></iframe>
        </div>
      );

    } else {

      return (
        <div className='mycarma'>
          <p>You are not signed up for this yet...</p>
        </div>
      );

    }
  }
}


export default MyCarma;

