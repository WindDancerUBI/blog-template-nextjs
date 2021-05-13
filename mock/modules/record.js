module.exports = [
  {
    url: '/record',
    type: 'get',
    data: {
      code: 0,
      msg: '',
      data: {
        totalPage: 5,
        'list|5': [
          {
            recordId: '@id',
            recordTitle: '@ctitle(5,15)',
            recordContent: '@cparagraph()',
            createdTime: '@date()',
            status: 1,
            icon: ''
          }
        ]
      }
    }
  }
];
