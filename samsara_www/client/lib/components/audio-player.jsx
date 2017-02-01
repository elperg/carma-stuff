import React, { PropTypes } from 'react';
import ReactPlayer from 'react-player';


class AudioPlayer extends React.Component {

  static propTypes = {
    url  : PropTypes.string.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {

    return (
      <div className='audio-player'>
        <ReactPlayer
          url={this.props.url}
          controls={true}
          playing={false}
          onError={e => console.log('onError', e)}
          height={30}
        />
      </div>
    );
  }

}

export default AudioPlayer;
