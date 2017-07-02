import { Action, ActionReducer } from '@ngrx/store';

export const CHANGE = 'CHANGE';

export interface NavState {
  title: string;
};

/**
 * 路由状态reducer
 * Created by maxu0 on 2017/6/30.
 */
export function navReducer(state: NavState, action: Action): NavState {
  switch (action.type) {
    case CHANGE:
      return { title: action.payload.title};
    default:
      return state;
  }
}