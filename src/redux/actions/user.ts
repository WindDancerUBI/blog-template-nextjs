import axios from 'axios';
import { CHANGE_THEME } from './typeKeys';

export const testChangeInfo = (params?: any) => (dispatch: any) => {
  axios.get('http://rap2api.taobao.org/app/mock/282886/demo', { params }).then((res) => {
    console.log(res);

    dispatch({
      type: CHANGE_THEME,
      name: res.data.name
    });
  });
};
