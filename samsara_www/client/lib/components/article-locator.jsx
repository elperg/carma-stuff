import React, { PropTypes } from 'react';

export default class ArticleLocator extends React.Component {

  static propTypes = {
    clippingCoordinates: PropTypes.array.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {

    const gridBlocks = this.props.clippingCoordinates.map((blockOffOn, i) => {
      const onClassName = (parseInt(blockOffOn) === 1) ? 'on' : '';
      return (<span key={i} className={onClassName}></span>);
    });

    return (
      <div className='article-locator'>
        {gridBlocks}
      </div>
    );
  }

}
