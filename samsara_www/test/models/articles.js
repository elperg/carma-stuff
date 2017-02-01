import _ from 'lodash';

// Follows Faker.js conventions

export const ArticleItemModel = {
  'id'            : 'random.uuid',
  'outlet_name'   : 'company.companyName',
  'media_subtype' : () => _.sample(['Newspaper', 'TV', 'Radio', 'Magazine', 'Website']),
  'frequency'     : () => _.sample(['Daily', 'Weekly', 'Monthly']),
  'region'        : 'address.country',
  'sentiment'     : () => _.sample(['Negative', 'Somewhat Negative', 'Neutral', 'Somewhat Positive', 'Positive']),
  'impressions'   : () => _.random(100, 999999),
  'ave'           : () => _.random(30, 99999),
  'published_at'  : () => Date.now().toISOString(),
  'headline'      : 'lorem.sentence',
  'summary_snippet' : { method: 'lorem.sentences', args: [5] },
  'arabic_summary': () => (Math.random() > .5) ? { method: 'lorem.sentences', args: [3] } : undefined,
  'url'           : 'internet.url',
  'tags'          : () => (Math.random() > .5) ? { method: 'lorem.words', args: [3] } : undefined,
  'image_assets'  : () => {
                      if (Math.random() > .5) {
                        return undefined;
                      } else {
                        return [ { id: 'random.uuid', url: 'internet.url' } ]
                      }
                    }
};

