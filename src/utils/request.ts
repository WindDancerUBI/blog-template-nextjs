import axios from 'axios';
// const SERVER_URL = 'http://127.0.0.1:6789' 'http://101.133.162.173:3333'

const isDev = process.env.NODE_ENV === 'development';

// 开发环境3344，生产、预览4444
const SERVER_URL = isDev ? 'http://localhost:3344' : 'http://localhost:4444';

const instance = axios.create({
  baseURL: `${SERVER_URL}/api`,
  timeout: 8170
});

instance.interceptors.request.use(
  (config) => {
    // 在结合redux后，在此判断登录状态，向所有请求添加某些参数，比如header
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    if (response.data.code === 0) {
      return response.data;
    } else {
      throw response.data;
    }
  },
  (error) => {
    console.error('api error：', error);
    return Promise.reject(error);
  }
);

export default instance;
