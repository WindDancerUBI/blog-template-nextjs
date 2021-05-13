/* eslint-disable @typescript-eslint/no-var-requires */
const { content } = require('../data/article.json');

module.exports = [
  {
    url: '/article/catalogue',
    type: 'get',
    data: {
      code: 0,
      msg: '',
      data: {
        totalPage: 5,
        'list|5': [
          {
            articleId: '@id',
            articleCode: '@word(6)',
            articleTitle: '@ctitle(5,15)',
            'tags|1-4': [
              {
                tagId: '@word(16)',
                tagCode: '@word(6)',
                tagName: '@cword(2,4)'
              }
            ],
            createdTime: '@date()',
            updatedTime: '@date()',
            articleHits: '@integer(60,100)',
            messageCount: '@integer(1,100)',
            articleType: '@cname()',
            articleSynopsisImage: '@image("300x200","red","#fff","@cword")',
            articleSynopsis: '@cparagraph()'
          }
        ]
      }
    }
  },
  {
    url: '/article/pigeonhole',
    type: 'get',
    data: {
      code: 0,
      msg: '',
      data: {
        tagName: '@cword(6)',
        'list|5': [
          {
            'year|+1': 2018,
            'list|3-20': [
              {
                articleTitle: '@ctitle(5,15)',
                articleId: '@id',
                articleCode: '@word(6)',
                createdTime: '@date()'
              }
            ]
          }
        ]
      }
    }
  },
  {
    url: /\/article\/\w+$/,
    type: 'get',
    data: {
      code: 0,
      msg: '',
      data: {
        articleId: '@id',
        articleCode: '@word(6)',
        articleTitle: '@ctitle(5,15)',
        createdTime: '@date()',
        articleHits: '@integer(60,100)',
        messageCount: '@integer(1,100)',
        articleContent: content,
        articleSynopsis: '@cparagraph()'
      }
    }
  },
  {
    url: '/article',
    type: 'post',
    data(rep, res) {
      console.log(rep, res);

      return {
        code: 0,
        msg: '已发送到后台'
      };
    }
  }
];
