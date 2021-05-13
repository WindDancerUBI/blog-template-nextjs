import { combineReducers } from 'redux';

import configReducer, { DefaultState } from './modules/config';

export interface StoreTypes {
  config: DefaultState;
}

export default combineReducers<StoreTypes>({
  config: configReducer
});
