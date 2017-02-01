import React, { PropTypes } from 'react';
import _ from 'lodash';
import { Translate, Localize } from 'react-redux-i18n';

class ShareOfVoice extends React.Component {

  static propTypes = {
    data: PropTypes.array.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {

    const { data } = this.props;

    let tagElements;

    if(data.length === 0) {

      tagElements = (<p className='empty'><Translate value='overviews.share_of_voice.empty' /></p>);

    } else {

      const sum = _.sum(_.map(data, 'count'));

      const tagLis = data.map((tag, i) => {

        const pct = Math.ceil(tag.count/sum)+'%';

        return(
          <li key={i} style={ {width:pct} } className='bar-chart__bar bar-chart__bar--pop'>
            <span className='bar-chart__label'>{tag.tag}</span>
            <span className='bar-chart__value'><span className='num'>{pct}</span></span>
          </li>
        );
      });

      tagElements = (<ul className='bar-chart'>{tagLis}</ul>);
    }

    return (
      <div>
        <h2 className='section__heading'><Translate value='overviews.share_of_voice.heading' /></h2>
        {tagElements}
      </div>
    );

  }
}


export default ShareOfVoice;

