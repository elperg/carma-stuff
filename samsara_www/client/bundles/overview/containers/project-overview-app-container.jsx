import React, { PropTypes } from 'react';
import { connect } from 'react-redux'

import fetchOverview from '../actions/fetch-overview';

import Loader from 'lib/components/loader';

import Header from '../components/header';
import TopArticles from '../components/top-articles';
import RegionalSentiment from '../components/regional-sentiment';
import ShareOfVoice from '../components/share-of-voice';
import FeaturedArticle from '../components/featured-article';
import MediaTypeSentiment from '../components/media-type-sentiment';
import TopOutlets from '../components/top-outlets';
import TopAuthors from '../components/top-authors';


class ProjectOverviewAppContainer extends React.Component {

  static propTypes = {
    isBusy  : PropTypes.bool.isRequired,
    data    : PropTypes.shape({
                range               : PropTypes.oneOf(['week', 'day']).isRequired,
                featuredArticle     : PropTypes.object,
                mediaTypeSentiment  : PropTypes.array.isRequired,
                newArticles         : PropTypes.array.isRequired,
                newCoverage         : PropTypes.shape({
                                        count     : PropTypes.number.isRequired,
                                        pctChange : PropTypes.number.isRequired,
                                        weekData  : PropTypes.array.isRequired
                                      }).isRequired,
                regionalSentiment   : PropTypes.array.isRequired,
                shareOfVoice        : PropTypes.array.isRequired,
                topAuthors          : PropTypes.array.isRequired,
                topEarnedMedia      : PropTypes.shape({
                                        online      : PropTypes.array.isRequired,
                                        traditional : PropTypes.array.isRequired
                                      }).isRequired,
                topOutlets          : PropTypes.array.isRequired
              }).isRequired,
    retrieved: PropTypes.number,
    fetchOverview: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {

    // Expire Overview data after 60 mins
    const expireDate = Date.now() - (60 * 60 * 1000);

    // Fetch overview if we've never retrieved it, or if it's older than 15 minutes
    if(this.props.retrieved === null ||
        (_.isNumber(this.props.retrieved) === true && this.props.retrieved < expireDate)) {
      this.props.fetchOverview();
    }

  }

  render() {

    const { data } = this.props;

    return (
      <div className='overview'>

        <Loader loaded={!this.props.isBusy}>

          <div className='header'>
            <Header range={data.range} newCoverage={data.newCoverage} newArticles={data.newArticles} />
          </div>

          <div className='panels flex-2to1'>

            <div className='primary-content'>

              <section>
                <TopArticles data={data.topEarnedMedia} />
              </section>

              <div className='flex-1to1'>

                <section className='balanced-content'>
                  <RegionalSentiment data={data.regionalSentiment} />
                </section>

                <section className='balanced-content'>
                  <ShareOfVoice data={data.shareOfVoice} />
                </section>

              </div>

            </div>

            <section className='secondary-content'>
              <FeaturedArticle data={data.featuredArticle} projectUid={this.props.params.projectUid} />
            </section>

          </div>

          <div className='panels flex-1to1to1'>

            <section className='balanced-content'>
              <MediaTypeSentiment data={data.mediaTypeSentiment} />
            </section>

            <section className='balanced-content'>
              <TopOutlets data={data.topOutlets} />
            </section>

            <section className='balanced-content'>
              <TopAuthors data={data.topAuthors} />
            </section>

          </div>

        </Loader>

      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isBusy    : state.overview.isBusy,
    data      : state.overview.data,
    retrieved : state.overview.retrieved
  };
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchOverview: () => {
      dispatch(fetchOverview(ownProps.params.projectUid));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectOverviewAppContainer);
