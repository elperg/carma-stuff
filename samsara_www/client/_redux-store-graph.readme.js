{

  selectedArticleIds: [],  // stateful, reset on article fetches (search or collection) and location changes

  user      : {
                isBusy    : false,
                errors    : [],
                passwordErrors: [],
                requested : '2016-09-23T23:34',
                retrieved : '2016-09-23T23:34',
                data      : {
                              id              : 1,
                              firstName       : 'Juliette',
                              lastName        : 'Binoche',
                              email           : 'jb.smoove@carma.com',
                              accessToken     :  'ffffbd0cfffff01140d859fb0fffffcb',
                              organizationId  : 2,
                              projectIds      : [ 32, 34 ],
                              timeZone        : 'Paris',
                              carmaStaff      : false,
                              admin           : false,
                              digests         : [
                                                  {
                                                    id          : 1,
                                                    localTimes  : ['7:00', '9:00'],
                                                    projects    : [ 32, 34 ]
                                                  }
                                                ],
                            }
              },


  organization: {

  },

  organizationsIndex: {
                isBusy    : false,
                errors    : [],
                requested : '2016-09-23T23:34',
                retrieved : '2016-09-23T23:34',
                selectedUid: 'a00a0000-aa0a-0a0a-0000-0000aa00aa00',
                data      : [
                              {
                                id                        : 32,
                                uid                       : 'a00a0000-aa0a-0a0a-0000-0000aa00bb00',
                                name                      : 'Organization #32',
                                organizationId            : 2,
                                chartsEnabled             : true,
                                analysisEnabled           : true,
                                talkwalkerToken           : null,
                                users                     : []
                              },
                              {
                                id                        : 32,
                                uid                       : 'a00a0000-aa0a-0a0a-0000-0000aa00bb00',
                                name                      : 'Organization #32',
                                organizationId            : 2,
                                chartsEnabled             : true,
                                analysisEnabled           : true,
                                talkwalkerToken           : '234234-2343-234234-2343',
                                users                     : []
                              }
                            ]
  },


  projectsIndex: {
                isBusy    : false,
                errors    : [],
                requested : '2016-09-23T23:34',
                retrieved : '2016-09-23T23:34',
                selectedUid: 'a00a0000-aa0a-0a0a-0000-0000aa00aa00',
                data      : [
                              {
                                id                        : 32,
                                uid                       : 'a00a0000-aa0a-0a0a-0000-0000aa00bb00',
                                name                      : 'Project #32',
                                organizationId            : 2,
                                chartsEnabled             : true,
                                analysisEnabled           : true,
                                talkwalkerToken           : null
                              },
                              {
                                id                        : 32,
                                uid                       : 'a00a0000-aa0a-0a0a-0000-0000aa00bb00',
                                name                      : 'Project #32',
                                organizationId            : 2,
                                chartsEnabled             : true,
                                analysisEnabled           : true,
                                talkwalkerToken           : '234234-2343-234234-2343'
                              }
                            ],
                pagination: {
                              currentPage : 1,
                              totalCount  : 0,
                              pageSize    : 100
                            }
  },

  digests   : {
    isBusy    : false,
    errors    : [],
    requested : '2016-09-23T23:34',
    retrieved : '2016-09-23T23:34',
    data      : [
                  isEnabled: false,
                  isMerged: false,
                  order: 1,
                  projectId: 3620,
                  times: [{ hour: 4, minute: 30}, { hour: 15, minute:15}]
                ]
  },

  projects  : {
                isBusy    : false,
                errors    : [],
                requested : '2016-09-23T23:34',
                retrieved : '2016-09-23T23:34',
                selectedUid: 'a00a0000-aa0a-0a0a-0000-0000aa00aa00',
                data      : [
                              {
                                id                        : 32,
                                uid                       : 'a00a0000-aa0a-0a0a-0000-0000aa00bb00',
                                name                      : 'Project #32',
                                organizationId            : 2,
                                chartsEnabled             : true,
                                analysisEnabled           : true,
                                primaryProject            : true,
                                mediaSubtypeSubcriptions  : [ 'tv', 'radio', 'magazine', 'newspaper', 'website', 'social' ],
                                collections : [
                                                {
                                                  id                : 26,
                                                  name              : 'My Collection',
                                                  description       : 'Some collection description',
                                                  projectId         : 32,
                                                  creatorId         : 1,
                                                  featuredArticleId : null,
                                                  isPrivate         : true,
                                                  articles          : {
                                                                        isBusy    : false,
                                                                        requested : null,
                                                                        retrieved : '2016-09-23T23:34',
                                                                        errors    : [],
                                                                        data      : []
                                                                      }
                                                },
                                                {
                                                  id                : 26,
                                                  name              : 'A Project Collection',
                                                  description       : null,
                                                  projectId         : 34,
                                                  creatorId         : 1,
                                                  featuredArticleId : null,
                                                  isPrivate         : false,
                                                  articles          : {
                                                                        isBusy    : false,
                                                                        requested : null,
                                                                        retrieved : '2016-09-23T23:34',
                                                                        errors    : [],
                                                                        data      : []
                                                                      }
                                                }
                                ],
                                stats                     : {
                                                              isBusy    : false,
                                                              requested : '2016-09-23T23:34',
                                                              retrieved : '2016-09-23T23:34',
                                                              errors    : [],
                                                              data: {
                                                                minAve: 0,
                                                                maxAve: 234,
                                                                minImpressions: 0,
                                                                maxImpressions: 1000
                                                              }
                                                            }
                              },
                              {
                                id                        : 34,
                                uid                       : 'a00a0000-aa0a-0a0a-0000-0000aa00bb00',
                                name                      : 'Project #34',
                                organizationId            : 2,
                                chartsEnabled             : true,
                                analysisEnabled           : true,
                                primaryProject            : true,
                                mediaSubtypeSubcriptions  : [ 'tv', 'radio', 'website', 'social' ],
                                stats                     : {
                                                              isBusy    : false,
                                                              requested : null,
                                                              retrieved : null,
                                                              errors    : [],
                                                              data      : {}
                                                            }
                              }
                            ]
                },


  search      : {
                  isBusy    : false,
                  errors    : [],
                  retrieved : '2016-09-23T23:34',
                  filters   : {
                                articleUid          : null,
                                query               : '',
                                mediaSubtype        : [ 'newspaper', 'magazine', 'tv', 'radio', 'website' ],
                                sentiment           : ['negative', 'somewhat_negative', 'neutral', 'somewhat_positive', 'positive'],
                                location            : '',
                                outlet              : '',
                                language            : '',
                                tag                 : '',
                                fromDate            : '2015-02-34',
                                toDate              : '2016-01-34'
                              },
                  filterOptions:  {
                                location      : ['USA', 'UAE'],
                                outlet        : ['NYT', 'CNN'],
                                mediaSubtype  : [ 'newspaper', 'magazine', 'tv', 'radio', 'website' ],
                                language      : ['English', 'Arabic'],
                                tag           : [ 'a tag' ],
                                fromDate      : ,
                                toDate        :
                              },
                  pagination: {
                                currentPage : 1,
                                totalCount  : 0,
                                pageSize    : 100
                              },
                  data      : [
                                {
                                  id: 425
                                  /* full article detail */
                                },
                                {
                                  id: 345
                                  /* full article detail */
                                },
                                {
                                  id: 234643
                                  /* full article detail */
                                }
                              ]
                },

  article      : {
                  isBusy    : false,
                  errors    : [],
                  retrieved : '2016-09-23T23:34',
                  data      : {
                                id: 425
                               }
                },

  overview    : {
                  isBusy    : false,
                  retrieved : '2016-09-23T23:54',
                  errors    : [],
                  data      : {
                                range: "week",
                                newCoverage: {
                                  count: 1742,
                                  pctChange: -41,
                                  weekData: [ {date: "2016-08-12", total: 3344}, {date: "2016-08-13", total: 1274} ]
                                },
                                featuredArticle: { /* can be NULL */
                                  assets: [],
                                  byline: [],
                                  date: "2016-08-04",
                                  id: 552334,
                                  impressions: 23423423,
                                  mediaType: "website",
                                  origin: "us",
                                  outletName: "Yahoo DIY",
                                  primaryHeadline: "Porsche, yada, yada, yada",
                                  primarySummary: "Stuttgart (Germany) AP - blah, blah",
                                  secondaryHeadline: null,
                                  secondaryLanguage: null,
                                  secondarySummary: null,
                                  sentiment: 2,
                                  tags: {},
                                  uid: '234234-234234--234234-23423423'
                                },
                                mediaTypeSentiment: [
                                  {
                                    media: "Website",
                                    negative: 1550,
                                    neutral: 4234,
                                    positive: 23432,
                                    somewhatNegative: 2343,
                                    somewhatPostive: 2343
                                  }
                                ],
                                newArticles: [
                                  {
                                    medium: "tv",
                                    count: "0",
                                    pctChange: 0
                                  },
                                  {
                                    medium: "radio",
                                    count: "0",
                                    pctChange: 0
                                  },
                                  {
                                    medium: "website",
                                    count: "0",
                                    pctChange: -100
                                  }
                                ],
                                regionalSentiment: [ /* presently an object */
                                  {
                                    country: "ar",
                                    total: 32,
                                    sentiment: "somewhat_positive"
                                  },
                                  {
                                    country: "fr",
                                    total: 321,
                                    sentiment: "neutral"
                                  }
                                },
                                shareOfVoice: [ /* presently an object */
                                  {
                                    tag: "Volvo",
                                    count: 898,
                                    category: "Organizations"
                                  },
                                  {
                                    tag: "Toyota",
                                    count: 232,
                                    category: "Competitors"
                                  }
                                ],
                                topAuthors: [
                                ],
                                topEarnedMedia: {
                                  online: [
                                    {
                                      assets: [],
                                      byline: [],
                                      date: "2016-08-04",
                                      id: 552334,
                                      impressions: 23423423,
                                      mediaType: "website",
                                      origin: "us",
                                      outletName: "Yahoo DIY",
                                      primaryHeadline: "Porsche, yada, yada, yada",
                                      primarySummary: "Stuttgart (Germany) AP - blah, blah",
                                      secondaryHeadline: null,
                                      secondaryLanguage: null,
                                      secondarySummary: null,
                                      sentiment: 2,
                                      tags: {},
                                      uid: '234234-234234--234234-23423423'
                                    },
                                    {
                                      assets: [],
                                      byline: [],
                                      date: "2016-08-04",
                                      id: 552334,
                                      impressions: 23423423,
                                      mediaType: "website",
                                      origin: "us",
                                      outletName: "Yahoo DIY",
                                      primaryHeadline: "Porsche, yada, yada, yada",
                                      primarySummary: "Stuttgart (Germany) AP - blah, blah",
                                      secondaryHeadline: null,
                                      secondaryLanguage: null,
                                      secondarySummary: null,
                                      sentiment: 2,
                                      tags: {},
                                      uid: '234234-234234--234234-23423423'
                                    }
                                  ],
                                  traditional: [
                                    {
                                      assets: [],
                                      byline: [],
                                      date: "2016-08-04",
                                      id: 552334,
                                      impressions: 23423423,
                                      mediaType: "website",
                                      origin: "us",
                                      outletName: "Yahoo DIY",
                                      primaryHeadline: "Porsche, yada, yada, yada",
                                      primarySummary: "Stuttgart (Germany) AP - blah, blah",
                                      secondaryHeadline: null,
                                      secondaryLanguage: null,
                                      secondarySummary: null,
                                      sentiment: 2,
                                      tags: {},
                                      uid: '234234-234234--234234-23423423'
                                    },
                                    {
                                      assets: [],
                                      byline: [],
                                      date: "2016-08-04",
                                      id: 552334,
                                      impressions: 23423423,
                                      mediaType: "website",
                                      origin: "us",
                                      outletName: "Yahoo DIY",
                                      primaryHeadline: "Porsche, yada, yada, yada",
                                      primarySummary: "Stuttgart (Germany) AP - blah, blah",
                                      secondaryHeadline: null,
                                      secondaryLanguage: null,
                                      secondarySummary: null,
                                      sentiment: 2,
                                      tags: {},
                                      uid: '234234-234234--234234-23423423'
                                    }
                                  ]
                                }
                                topOutlets: [
                                  {
                                    outletName: "Yahoo DIY",
                                    origin: "us",
                                    mediaType: "website",
                                    count: 23948983
                                  },
                                  {
                                    outletName: "Daily Mail",
                                    origin: "gb",
                                    mediaType: "website",
                                    count: 23434
                                  }
                                ]
                              }
                },

  charts      : {
                  filters   : {
                                query               : '',
                                mediaSubtype        : [ 'newspaper', 'magazine', 'tv', 'radio', 'website' ],
                                sentiment           : ['negative', 'somewhat_negative', 'neutral', 'somewhat_positive', 'positive'],
                                location            : '',
                                outlet              : '',
                                language            : '',
                                tag                 : '',
                                fromDate            : '2015-02-34',
                                toDate              : '2016-01-34'
                              },
                  filterOptions:  {
                                location      : ['USA', 'UAE'],
                                outlet        : ['NYT', 'CNN'],
                                mediaSubtype  : [ 'newspaper', 'magazine', 'tv', 'radio', 'website' ],
                                language      : ['English', 'Arabic'],
                                tag           : [ 'a tag' ]
                              },
                  ave       : {
                                isBusy    : false,
                                retrieved : '2016-09-23T23:54',
                                errors    : [],
                                data      : []
                              },
                  impressions: {
                                isBusy    : false,
                                retrieved : '2016-09-23T23:54',
                                errors    : [],
                                data      : []
                              },
                  languages: {
                                isBusy    : false,
                                retrieved : '2016-09-23T23:54',
                                errors    : [],
                                data      : []
                              },
                  mediaTypes: {
                                isBusy    : false,
                                retrieved : '2016-09-23T23:54',
                                errors    : [],
                                data      : []
                              },
                  outlets   : {
                                isBusy    : false,
                                retrieved : '2016-09-23T23:54',
                                errors    : [],
                                data      : []
                              },
                  regionalEngagement: {
                                isBusy    : false,
                                retrieved : '2016-09-23T23:54',
                                errors    : [],
                                data      : []
                              },
                  regionalSentiment: {
                                isBusy    : false,
                                retrieved : '2016-09-23T23:54',
                                errors    : [],
                                data      : []
                              },
                  sentiment : {
                                isBusy    : false,
                                retrieved : '2016-09-23T23:54',
                                errors    : [],
                                data      : []
                              },
                  tags      : {
                                isBusy    : false,
                                retrieved : '2016-09-23T23:54',
                                errors    : [],
                                data      : []
                              }
                }
}









