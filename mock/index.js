/* eslint-disable @typescript-eslint/no-var-requires */
const Mock = require('mockjs');

const api = [
  ...require('./modules/article'),
  ...require('./modules/log'),
  ...require('./modules/tag'),
  ...require('./modules/record'),
  ...require('./modules/message')
];

module.exports = (app) => {
  api.forEach((item) => {
    app[item.type](
      typeof item.url === 'string'
        ? `/api${item.url}`
        : new RegExp('/api' + item.url.source, 'gi'),
      (rep, res) => {
        res.json(
          Mock.mock(item.data instanceof Function ? item.data(rep, res) : item.data)
        );
      }
    );
  });
};
