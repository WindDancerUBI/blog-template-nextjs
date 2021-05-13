module.exports = [
  {
    url: '/message',
    type: 'get',
    data: {
      code: 0,
      msg: '',
      data: {
        page: 1,
        total: 100,
        totalPage: 5,
        'list|5': [
          {
            userId: '@id',
            userName: '@name',
            headUrl: '@image()',
            appType: 'QQ',
            id: '@id',
            content: "[哈哈]😜<script>alert('123')</script>",
            createdTime: '@date()',
            pid: 0
          }
        ]
      }
    }
  },
  {
    url: '/message',
    type: 'post',
    data() {
      return {
        code: 0,
        msg: ''
      };
    }
  },
  {
    url: '/loginInfo',
    type: 'get',
    data: {
      code: 1,
      msg: '',
      data: {}
    }
  }
];
