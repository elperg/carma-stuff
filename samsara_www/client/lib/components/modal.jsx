import React, { PropTypes } from 'react';
import ReactModal from 'react-modal';
import _ from 'lodash';

class Modal extends React.Component {

  static propTypes = {
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {

    const styles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        padding               : '20px',
        border                : 'none',
        borderRadius          : '6px',
        boxShadow             : '-6px 6px 24px 2px rgba(0,0,0,0.2)',
        zIndex                : 999999
      },

      overlay : {
        zIndex: 999998
      }
    };

    return (
      <ReactModal style={styles} {...this.props}>
        {this.props.children}
      </ReactModal>
    );
  }

}

export default Modal;
