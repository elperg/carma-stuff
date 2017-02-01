import React, { PropTypes } from 'react';
import ReactPlayer from 'react-player';


class VideoPlayer extends React.Component {

  static propTypes = {
    url  : PropTypes.string.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {

    return (
      <div className='video-player'>
        <ReactPlayer
          url={this.props.url}
          controls={true}
          playing={false}
          onError={e => console.log('onError', e)}
          fileConfig={{ attributes: { preload: 'auto', crossOrigin: 'anonymous' } }}

        />
      </div>
    );
  }

}

export default VideoPlayer;
