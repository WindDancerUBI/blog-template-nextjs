module.exports = [
  {
    url: '/tag',
    type: 'get',
    data: {
      code: 0,
      msg: '',
      data: {
        'list|20': [
          {
            tagId: '@id',
            tagName: '@ctitle(2,6)',
            tagCode: '@word(6)'
          }
        ]
      }
    }
  }
];
