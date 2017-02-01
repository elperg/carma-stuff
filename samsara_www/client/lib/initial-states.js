import moment from 'moment';

import countries from 'i18n-iso-countries';
import LanguageList from 'language-list';

// Setup the countries array
let countriesArray = [];
_.each(countries.getNames('en'), (name, abbrev) => {
  countriesArray.push({ value: abbrev, label: name });
});
countriesArray = _.sortBy(countriesArray, [ 'label' ]);
// unshift 'pan_arab' to the top
countriesArray.unshift({ value: 'pan_arab', label: 'Pan-Arab' });

// setup the langauges array
const languageList = new LanguageList();
const languagesArray = languageList.getData().map((lang) => {
  return { value: lang.code, label: lang.language };
});


const InitialStates = {

  selectedArticleIds: [],

  user      : {
                isBusy    : false,
                isLoggedIn: false,
                isPopulated: false,
                errors    : null,
                passwordErrors: null,
                requested : null,
                retrieved : null,
                data      : {}
              },

  organizationsIndex  : {
                isBusy    : false,
                errors    : null,
                requested : null,
                retrieved : null,
                selectedUid: null,
                data      : []
                },
  experts  : {
                              isBusy    : false,
                              errors    : null,
                              requested : null,
                              retrieved : null,
                              selectedUid: null,
                              data      : []
                              },

  projectsIndex  : {
                isBusy    : false,
                errors    : null,
                requested : null,
                retrieved : null,
                selectedUid: null,
                data      : []
                },

  // this is populated by userinfo request
  projects  : {
                isBusy    : false,
                errors    : null,
                requested : null,
                retrieved : null,
                data      : []
                },

  // this is populated by userinfo request
  organization  : {
                isBusy    : false,
                errors    : null,
                requested : null,
                retrieved : null,
                data  : {
                  id            : null,
                  active        : null,
                  maxUsersLimit : null,
                  name          : null,
                  uid           : null
                }
  },

  digests   : {
                isBusy    : false,
                errors    : null,
                requested : null,
                retrieved : null,
                selectedUid: null,
                data      : []
              },

  search      : {
                  isBusy    : false,
                  errors    : null,
                  requested : null,
                  retrieved : null,
                  filterDefaults   : {
                                query               : '',
                                mediaSubtype        : [ 'newspaper', 'magazine', 'tv', 'radio', 'website' ],
                                sentiment           : ['negative', 'somewhat_negative', 'neutral', 'somewhat_positive', 'positive'],
                                location            : [],
                                outlet              : [],
                                outletLanguage      : [],
                                primaryLanguage     : [],
                                tag                 : [],
                                dateType            : 'month',
                                fromDate            : moment().subtract(1, 'month').format('YYYY-MM-DD'),
                                toDate              : moment().format('YYYY-MM-DD'),
                                perPage             : 100,
                                page                : 1
                              },
                  totalCount: 0,
                  data      : []
                },

  selectedArticleIds: [],

  filterOptions:  {
                  isBusy    : false,
                  errors    : null,
                  requested : null,
                  retrieved : null,
                  data      : {
                                location        : countriesArray,
                                outlet          : [],
                                mediaSubtype    : [ 'newspaper', 'magazine', 'tv', 'radio', 'website' ],
                                outletLanguage  : languagesArray,
                                primaryLanguage : languagesArray,
                                tag             : []
                              }
                  },

  article      : {
                  isBusy    : false,
                  errors    : null,
                  requested : null,
                  retrieved : null,
                  data      : {}
                },

  overview    : {
                  isBusy    : false,
                  errors    : null,
                  requested : null,
                  retrieved : null,
                  data      : {
                                range             : 'week',
                                featuredArticle   : null,
                                mediaTypeSentiment: [],
                                newArticles       : [],
                                newCoverage       : { count: 0, pctChange: 0, weekData: [] },
                                regionalSentiment : [],
                                shareOfVoice      : [],
                                topAuthors        : [],
                                topEarnedMedia    : { traditional: [], online: [] },
                                topOutlets        : []
                              }
                },

  charts      : {
                  filterDefaults   : {
                                query               : '',
                                mediaSubtype        : [ 'newspaper', 'magazine', 'tv', 'radio', 'website' ],
                                sentiment           : ['negative', 'somewhat_negative', 'neutral', 'somewhat_positive', 'positive'],
                                location            : [],
                                outlet              : [],
                                outletLanguage      : [],
                                primaryLanguage     : [],
                                tag                 : [],
                                dateType            : 'month',
                                fromDate            : moment().subtract(1, 'month').format('YYYY-MM-DD'),
                                toDate              : moment().format('YYYY-MM-DD')
                              },
                  ave       : {
                                isBusy    : false,
                                errors    : null,
                                requested : null,
                                retrieved : null,
                                data      : []
                              },
                  impressions: {
                                isBusy    : false,
                                errors    : null,
                                requested : null,
                                retrieved : null,
                                data      : []
                              },
                  languages: {
                                isBusy    : false,
                                errors    : null,
                                requested : null,
                                retrieved : null,
                                data      : []
                              },
                  mediaTypes: {
                                isBusy    : false,
                                errors    : null,
                                requested : null,
                                retrieved : null,
                                data      : []
                              },
                  outlets   : {
                                isBusy    : false,
                                errors    : null,
                                requested : null,
                                retrieved : null,
                                data      : []
                              },
                  regionalEngagement: {
                                isBusy    : false,
                                errors    : null,
                                requested : null,
                                retrieved : null,
                                data      : []
                              },
                  regionalSentiment: {
                                isBusy    : false,
                                errors    : null,
                                requested : null,
                                retrieved : null,
                                data      : []
                              },
                  sentiment : {
                                isBusy    : false,
                                errors    : null,
                                requested : null,
                                retrieved : null,
                                data      : []
                              },
                  tags      : {
                                isBusy    : false,
                                errors    : null,
                                requested : null,
                                retrieved : null,
                                data      : []
                              }
                }
};

export default InitialStates;
