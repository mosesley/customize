import { Action } from '@ngrx/store';
import { AppConfig } from "../model/app-config";

export const NAV_CHANGE = 'NAV_CHANGE';
export const AC_CHANGE = 'AC_CHANGE';

export interface NavState {
  title: string;
};

/**
 * 路由状态reducer
 * Created by maxu0 on 2017/6/30.
 */
export function navReducer(state: NavState, action: Action): NavState {
  switch (action.type) {
    case NAV_CHANGE:
      return { title: action.payload.title};
    default:
      return state;
  }
}

/**
 * App name reducer
 * @param {string} state
 * @param {Action} action
 * @returns {string}
 */
export function appNameReducer(state: AppConfig, action: Action): AppConfig {
  switch (action.type) {
    case AC_CHANGE:
      return action.payload;
    default:
      return state;
  }
}
