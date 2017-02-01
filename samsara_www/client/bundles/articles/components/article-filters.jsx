import React, { PropTypes } from 'react';
import { Translate, Localize, I18n } from 'react-redux-i18n';
import { browserHistory, Link } from 'react-router';
import _ from 'lodash';

import SearchQuery from 'lib/components/search-query';
import FormSelect from 'lib/components/form-select';
import DateRangeSelect from 'lib/components/date-range-select';
import MediaSubtypeSelect from 'lib/components/media-subtype-select';
import SentimentSelect from 'lib/components/sentiment-select';

import { SentimentLevels } from 'lib/app-constants';

class ArticleFilters extends React.Component {
  static propTypes = {

    filterOptions : PropTypes.shape({
                      location        : PropTypes.array.isRequired,
                      outlet          : PropTypes.array.isRequired,
                      mediaSubtype    : PropTypes.array.isRequired,
                      outletLanguage  : PropTypes.array.isRequired,
                      primaryLanguage : PropTypes.array.isRequired,
                      tag             : PropTypes.array.isRequired
                    }).isRequired,

    filterValues  : PropTypes.shape({
                      query             : PropTypes.string,
                      mediaSubtype      : PropTypes.array,
                      sentiment         : PropTypes.array,
                      location          : PropTypes.array,
                      outletLanguage    : PropTypes.array,
                      primaryLanguage   : PropTypes.array,
                      tag               : PropTypes.array,
                      perPage           : PropTypes.number,
                      dateType          : PropTypes.oneOf(['month', 'week', 'day', 'range']),
                      fromDate          : PropTypes.string, // YYYY-MM-DD
                      toDate            : PropTypes.string  // YYYY-MM-DD
                    }),

    actions       : PropTypes.shape({
                      updateFilters : PropTypes.func.isRequired,
                      resetFilters  : PropTypes.func.isRequired
                    })
  };

  static defaultProps = {
    filterValues  : {
      mediaSubtype : [],
      dateType      : 'month',
      sentiment     : SentimentLevels.slice(0),
      perPage       : 100
    }
  };

  state = {
    filterValues  : {
                      dateType      : 'month',
                      toDate        : new Date(),
                      fromDate      : new Date(),
                      query         : '',
                      mediaSubtype : [],
                      sentiment     : [],
                      location      : [],
                      outlet        : '',
                      language      : '',
                      tag           : '',
                      perPage      : 100
                    }
  };

  constructor(props, context) {
    super(props, context);
    _.bindAll(this, ['updateFilters', 'resetFilters', 'onQueryChange', 'onDateRangeChange', 'onMediaSubtypeChange', 'onSentimentChange', 'onSelectChange', 'onPageSizeChange']);
  }

  componentWillMount() {

    if(this.props.filterValues !== undefined) {
      // Apply initialFilterValues to state
      this.setState({ filterValues: this.props.filterValues });
    }
  }

  componentWillReceiveProps(nextProps) {
    // Apply state to all of our form elements from props
    this.setState({ filterValues: nextProps.filterValues });
  }

  updateFilters() {
    // pass in state
    this.props.actions.updateFilters(this.state.filterValues);
  }

  resetFilters() {
    this.props.actions.resetFilters();
  }

  onQueryChange(newQuery) {
    let currentFilterValues = this.state.filterValues;
    Object.assign(currentFilterValues, { query: newQuery });
    this.setState({ filterValues: currentFilterValues });
  }

  onDateRangeChange(newRange) {
    let currentFilterValues = this.state.filterValues;
    Object.assign(currentFilterValues, { toDate: newRange.toDate, fromDate: newRange.fromDate });
    this.setState({ filterValues: currentFilterValues });
  }

  onMediaSubtypeChange(newSubtypeValues) {
    let currentFilterValues = this.state.filterValues;
    Object.assign(currentFilterValues, { mediaSubtype: newSubtypeValues });
    this.setState({ filterValues: currentFilterValues });
  }

  onSentimentChange(newSentimentValues) {
    let currentFilterValues = this.state.filterValues;
    Object.assign(currentFilterValues, { sentiment: newSentimentValues });
    this.setState({ filterValues: currentFilterValues });
  }

  onSelectChange(key, val) {
    const currentFilterValues = this.state.filterValues;

    const newVal = { [key]: val };

    const newFilterValues = Object.assign({}, currentFilterValues, newVal);
    this.setState({ filterValues: newFilterValues });
  }

  onPageSizeChange() {
    let currentFilterValues = this.state.filterValues;

    let perPage = (this.refs['page-size-200-radio'].checked === true) ? 200 : 100;

    Object.assign(currentFilterValues, { perPage });
    this.setState({ filterValues: currentFilterValues });
  }

  render() {

    const dateTypeOptions = [
      { label: I18n.t('filter.past_month'), value: 'month' },
      { label: I18n.t('filter.past_week'), value: 'week' },
      { label: I18n.t('filter.past_day'), value: 'day' },
      { label: I18n.t('filter.range'), value: 'range' }
    ];

    const sentimentOptions = [
      { label: I18n.t('sentiments.positive'), value: 'positive' },
      { label: I18n.t('sentiments.neutral'), value: 'neutral' },
      { label: I18n.t('sentiments.negative'), value: 'negative' }
    ];

    const mediaSubtypeOptions = [
      { label: I18n.t('media_subtypes.newspaper'), value: 'newspaper' },
      { label: I18n.t('media_subtypes.magazine'), value: 'magazine' },
      { label: I18n.t('media_subtypes.tv'), value: 'tv' },
      { label: I18n.t('media_subtypes.radio'), value: 'radio' },
      { label: I18n.t('media_subtypes.website'), value: 'website' }
    ];

    const datePickerClassName = (this.state.filterValues.dateType === 'range') ? '': 'hidden';


    return (
      <div className='filters article-filters secondary-content'>

        <form onSubmit={(e) => { e.preventDefault() }}>

          <SearchQuery
            ref='article-search'
            onChange={this.onQueryChange}
            query={this.state.filterValues.query}
            placeholder='Search Articles'
          />

          <div className='form-group'>
            <div className='form-control'>
              <label htmlFor='date_type'><Translate value='filter.date' /></label>
              <FormSelect
                ref='date-type-select'
                name='date_type'
                options={dateTypeOptions}
                value={this.state.filterValues.dateType}
                className='grouped_select article_filter_date_type'
                onChange={(val) => this.onSelectChange('dateType', val)}
                multi={false}
                searchable={false}
                isOptional={false}
              />
              <div className={datePickerClassName}>
                <DateRangeSelect
                  ref='date-range-select'
                  onChange={this.onDateRangeChange}
                  fromDate={this.state.filterValues.fromDate}
                  toDate={this.state.filterValues.toDate}
                />
              </div>
            </div>
          </div>

          <div className='form-group'>
            <div className='form-control'>
              <label htmlFor='filter_mediaSubtype'><Translate value='filter.media_type' /></label>
              <FormSelect
                ref='mediaSubtype-select'
                name='filter_mediaSubtype'
                options={mediaSubtypeOptions}
                value={this.state.filterValues.mediaSubtype}
                className='article_filter_mediaSubtype'
                onChange={(val) => this.onSelectChange('mediaSubtype', val)}
                multi={true}
                searchable={false}
                isOptional={false}
              />
            </div>
          </div>

          <div className='form-group'>
            <div className='form-control'>
              <label htmlFor='filter_sentiment'><Translate value='filter.sentiment' /></label>
              <FormSelect
                ref='sentiment-select'
                name='filter_sentiment'
                options={sentimentOptions}
                value={this.state.filterValues.sentiment}
                className='article_filter_sentiment'
                onChange={(val) => this.onSelectChange('sentiment', val)}
                multi={true}
                searchable={false}
                isOptional={false}
              />
            </div>
          </div>
{/*
          <div className='form-group'>
            <div className='form-control'>
              <MediaSubtypeSelect
                ref='media-subtype-select'
                onChange={this.onMediaSubtypeChange}
                values={this.state.filterValues.mediaSubtype}
                mediaSubtypes={this.props.filterOptions.mediaSubtype}
              />
            </div>
          </div>

          <div className='form-group'>
            <SentimentSelect
              ref='sentiment-select'
              onChange={this.onSentimentChange}
              values={this.state.filterValues.sentiment}
              levels={3}
            />
          </div>
*/}
          <div className='form-group'>
            <div className='form-control'>
              <label htmlFor='filter_location'><Translate value='filter.location' /></label>
              <FormSelect
                ref='location-select'
                name='filter_location'
                options={this.props.filterOptions.location}
                value={this.state.filterValues.location}
                className='article_filter_location'
                onChange={(val) => this.onSelectChange('location', val)}
                multi={true}
                isOptional={true}
              />
            </div>
          </div>

          <div className='form-group'>
            <div className='form-control'>
              <label htmlFor='filter_outlet'><Translate value='filter.outlet' /></label>
              <FormSelect
                ref='outlet-select'
                name='filter_outlet'
                options={this.props.filterOptions.outlet}
                value={this.state.filterValues.outlet}
                className='grouped_select article_filter_outlet'
                onChange={(val) => this.onSelectChange('outlet', val)}
                multi={true}
                isOptional={true}
              />
            </div>
          </div>

          <div className='form-group'>
            <div className='form-control'>
              <label htmlFor='filter_outletLanguage'><Translate value='filter.outletLanguage' /></label>
              <FormSelect
                ref='outletLanguage-select'
                name='filter_outletLanguage'
                options={this.props.filterOptions.outletLanguage}
                value={this.state.filterValues.outletLanguage}
                className='article_filter_language'
                onChange={(val) => this.onSelectChange('outletLanguage', val)}
                multi={true}
                isOptional={true}
              />
            </div>
          </div>

          <div className='form-group'>
            <div className='form-control'>
              <label htmlFor='filter_primaryLanguage'><Translate value='filter.primaryLanguage' /></label>
              <FormSelect
                ref='primaryLanguage-select'
                name='filter_primaryLanguage'
                options={this.props.filterOptions.primaryLanguage}
                value={this.state.filterValues.primaryLanguage}
                className='article_filter_primaryLanguage'
                onChange={(val) => this.onSelectChange('primaryLanguage', val)}
                multi={true}
                isOptional={true}
              />
            </div>
          </div>

          <div className='form-group'>
            <div className='form-control'>
              <label htmlFor='filter_tag'><Translate value='filter.tag' /></label>
              <FormSelect
                ref='tag-select'
                name='filter_tag'
                options={this.props.filterOptions.tag}
                value={this.state.filterValues.tag}
                className='grouped_select article_filter_tag'
                onChange={(val) => this.onSelectChange('tag', val)}
                multi={true}
                isOptional={true}
              />
            </div>
          </div>

          <div className='form-group'>
            <div className='form-control'>
              <label><Translate value='filter.page_size' /></label>
              <label className='inline'>
                <input type='radio' ref='page-size-100-radio' name='perPage' value='100' onChange={this.onPageSizeChange} checked={this.state.filterValues.perPage !== 200} />
                100
              </label>
              <label className='inline'>
                <input type='radio' ref='page-size-200-radio' name='perPage' value='200' onChange={this.onPageSizeChange} checked={this.state.filterValues.perPage === 200} />
                200
              </label>
            </div>
          </div>

          <div className='form-group'>
            <button ref='update-button' onClick={this.updateFilters} className='btn btn-primary'><Translate value='filter.actions.update' /></button>
            <button ref='reset-button' className='btn' onClick={this.resetFilters}><Translate value='filter.actions.reset' /></button>
          </div>

        </form>

      </div>
    );

  }
}

// Export the translate() wrapped version
export default ArticleFilters;
