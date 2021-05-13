import { CHANGE_THEME, CHANGE_LOADING, CHANGE_LAYOUT } from '@/redux/actions/typeKeys';

export interface DefaultState {
  themeName: 'light' | 'dark';
  loading: boolean;
  contentOnly: boolean;
}

const hourNow = new Date().getHours();

const defaultState: DefaultState = {
  // 18:00-07:00 dark
  themeName: hourNow >= 18 || hourNow <= 7 ? 'dark' : 'light',
  // 全局加载状态
  loading: true,
  // 是否不显示头部、页脚等
  contentOnly: false
};

const themeReducer = (state = defaultState, action: any) => {
  const stateCopy: DefaultState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case CHANGE_THEME: {
      stateCopy.themeName = action.value;
      return stateCopy;
    }
    case CHANGE_LOADING: {
      stateCopy.loading = action.value;
      return stateCopy;
    }
    case CHANGE_LAYOUT: {
      stateCopy.contentOnly = action.value;
      return stateCopy;
    }
    default: {
      return state;
    }
  }
};

export default themeReducer;
