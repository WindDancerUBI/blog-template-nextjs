import { CHANGE_LAYOUT } from '@/redux/actions/typeKeys';

export const layoutHandler = (value = false) => ({
  type: CHANGE_LAYOUT,
  value
});
