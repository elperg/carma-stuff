import React, { PropTypes } from 'react';
import { Translate, Localize, I18n } from 'react-redux-i18n';
import _ from 'lodash';
import numeral from 'numeral';
import countries from 'i18n-iso-countries';
import { Link } from 'react-router';


import { SentimentLevels } from 'lib/app-constants';


import ArticleLocator from 'lib/components/article-locator';
import DotMeter from 'lib/components/dot-meter';
import SentimentIndicator from 'lib/components/sentiment-indicator';
import TagCloud from 'lib/components/tag-cloud';

export class ArticleDetailMetadata extends React.Component {
  static propTypes = {
    data      : PropTypes.shape({
                  assets                : PropTypes.any,
                  ave                   : PropTypes.any,
                  bodhiUrl              : PropTypes.any,
                  circulation           : PropTypes.any,
                  content               : PropTypes.any,
                  distributionCountries : PropTypes.any,
                  frequency             : PropTypes.any,
                  hits                  : PropTypes.any,
                  impressions           : PropTypes.any,
                  language              : PropTypes.any,
                  maxAve                : PropTypes.any,
                  maxImpressions        : PropTypes.any,
                  mediaSubtype          : PropTypes.any,
                  minAve                : PropTypes.any,
                  minImpressions        : PropTypes.any,
                  outletName            : PropTypes.any,
                  pageCount             : PropTypes.any,
                  pages                 : PropTypes.any,
                  primaryHeadline       : PropTypes.any,
                  primarySummary        : PropTypes.any,
                  publicUrl             : PropTypes.any,
                  publishedAt           : PropTypes.any,
                  region                : PropTypes.any,
                  section               : PropTypes.any,
                  sentiment             : PropTypes.any,
                  sizeWithUnit          : PropTypes.any,
                  tags                  : PropTypes.any,
                  title                 : PropTypes.any
                }).isRequired,

    isAdmin        : PropTypes.bool.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  renderHits(hits) {

    if(hits !== null && hits.length > 0) {
      return(<div className="meta-block">
        <h4><Translate value='articles.article_metadata.hits' /></h4>
          {hits.join(', ')}
      </div>);
    } else {
      return undefined;
    }
  }

  renderLocators(assets) {

    if(assets !== null && assets.length > 0) {

      const assetElems = assets.map((asset, i) => {
        if(asset.clippingCoordinates !== undefined && asset.clippingCoordinates !== null) {
          return (<ArticleLocator key={i} clippingCoordinates={asset.clippingCoordinates} />);
        }
      });

      return (
        <div className="meta-block">
          <h4><Translate value='articles.article_metadata.locator' /></h4>
          {assetElems}
        </div>
      );

    } else {
      return undefined;
    }
  }

  renderBodhiUrl(url, title, isAdmin) {

    if(isAdmin === true) {
      return(
        <div className="meta-block">
          <h4><Translate value='articles.article_metadata.bodhi_url' /></h4>
          <a target="_blank" href={url}>{title}</a>
        </div>
      );
    } else {
      return undefined;
    }

  }

  renderTagCloud(tags) {

    if(_.isObject(tags) === true && _.isEmpty(tags) === false) {
      return (
        <div className="meta-block">
          <h4><Translate value='articles.article_metadata.tags' /></h4>
          <TagCloud tags={tags} />
        </div>
      );
    } else {
      return undefined;
    }

  }

  render() {
    const { data, isAdmin } = this.props;

    if(_.isEmpty(data) === true) {
      return <div />;
    }

    const currentLocale = 'en';

    const tagCloud = this.renderTagCloud(data.tags);


    // Determine frequency if it's not 'n/q'
    const frequency = (data.frequency !== 'n/a') ? <li><Translate value={'articles.labels.'+data.frequency} /></li> : undefined;

    const region = (data.region === 'pan_arab') ? <Translate value='regions.pan_arab' /> : countries.getName(data.region, currentLocale);

    const hits = this.renderHits(data.hits);

    const assetLocators = this.renderLocators(data.assets);

    const bodhiURL = (isAdmin) ? this.renderBodhiUrl(data.bodhiUrl, data.primaryHeadline, true) : undefined;

    // evaluate published countries
    let distributionCountries;
    if(data.distributionCountries !== undefined) {

      const distributionCountriesArr = data.distributionCountries.map((countryCode) => {
        return countries.getName(countryCode, currentLocale)
      });

      distributionCountries= (<tr>
                                <th><Translate value='articles.article_metadata.distribution' /></th>
                                <td>{distributionCountriesArr.join(', ')}</td>
                              </tr>);
    }

    // Setup the AVE <DotMetere /> if we have the necessary data
    let aveDotMeter;
    if(data.ave !== null && data.minAve !== null && data.maxAve !== null) {
      const avePct = ((data.ave - data.minAve) / (data.maxAve - data.minAve)) * 100;
      aveDotMeter = (<DotMeter
                      label={I18n.t('articles.article_metadata.ave')}
                      min={data.minAve}
                      max={data.maxAve}
                      val={data.ave}
                      pct={avePct}
                      unit={'$'}
                     />);
    }

    // Do the same for the impression <DotMeter />
    let impressionsDotMeter;
    if(data.impressions !== null && data.minImpressions !== null && data.maxImpressions !== null) {
      const impressionsPct = ((data.impressions - data.minImpressions) / (data.maxImpressions - data.minImpressions)) * 100;
      impressionsDotMeter = (<DotMeter
                              label={I18n.t('articles.article_metadata.impressions')}
                              min={data.minImpressions}
                              max={data.maxImpressions}
                              val={data.impressions}
                              pct={impressionsPct}
                             />);
    }


    let pages;
    if(data.pageCount !== null && data.pages !== null) {
      pages = (<tr>
                      <th><Translate value='articles.article_metadata.pages' count={data.pageCount} /></th>
                      <td>{data.pages.join(', ')}</td>
                    </tr>);
    }


    const publicUrl = window.location.origin + '/a/' + data.uid;

    return (

      <aside className="article-detail-metadata">

        <div className="outlet">
          <h2 className="outlet-name">{data.outletName} <span className="outlet-section">{data.section}</span></h2>

          <ul className="meta-list">
            <li className="meta-list__item"><Translate value={`media_subtypes.${data.mediaSubtype}`} /></li>
            <li className="meta-list__item">{region}</li>
            <li className="meta-list__item"><Translate value={`languages.${data.language}.name`} /></li></ul>
        </div>

        <table className="meta-table">
          <tbody>
            <tr>
              <th><Translate value='articles.article_metadata.frequency' /></th>
              <td>{data.frequency}</td>
            </tr>

            <tr>
              <th><Translate value='articles.article_metadata.circulation' /></th>
              <td>{numeral(data.circulation).format('0,0')}</td>
            </tr>

            {pages}

            <tr>
              <th><Translate value='articles.article_metadata.size' /></th>
              <td>{data.sizeWithUnit}</td>
            </tr>

            {distributionCountries}

          </tbody>
        </table>


        {aveDotMeter}

        {impressionsDotMeter}


        <div className="meta-block">
          <h4><Translate value='articles.article_metadata.sentiment' /></h4>
          <SentimentIndicator sentiment={data.sentiment} />
        </div>

        {tagCloud}

        {hits}

        {assetLocators}

        <div className="meta-block">
          <h4><Translate value='articles.article_metadata.public_url' /></h4>
          <Link to={publicUrl}>{publicUrl}</Link>
        </div>

        {bodhiURL}

      </aside>

    );
  }
}


export default ArticleDetailMetadata;
