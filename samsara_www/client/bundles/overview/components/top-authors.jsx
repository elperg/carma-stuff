import React, { PropTypes } from 'react';
import _ from 'lodash';
import { Translate, Localize } from 'react-redux-i18n';
import countries from 'i18n-iso-countries';

class TopAuthors extends React.Component {

  static propTypes = {
    data: PropTypes.array.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {

    const { data } = this.props;

    const currentLocale = 'en';


    let authorElements;

    if(data.length === 0) {

      authorElements = (<p className='empty'><Translate value='overviews.top_authors.empty' /></p>);

    } else {

      const authorLis = data.map((author, i) => {
        return(
          <li key={i} className='top__item'>
            <h4 className='top__heading'>{author.name}</h4>
            <ul className='meta-list'>
              <li>{author.outlet}</li>
              <li>{countries.getName(author.origin, currentLocale)}</li>
            </ul>
          </li>
        );
      });

      authorElements = (<ol className='top top--ordered'>{authorLis}</ol>);
    }

    return (
      <div>
        <h2 className='section__heading'><Translate value='overviews.top_authors.heading' /></h2>
        {authorElements}
      </div>
    );

  }
}


export default TopAuthors;

