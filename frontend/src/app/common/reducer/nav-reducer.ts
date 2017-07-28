import { Action } from '@ngrx/store';
import { AppConfig } from "../model/app-config";

export const NAVCHANGE = 'NAVCHANGE';
export const ACCHANGE = 'ACCHANGE';

export interface NavState {
  title: string;
};

/**
 * 路由状态reducer
 * Created by maxu0 on 2017/6/30.
 */
export function navReducer(state: NavState, action: Action): NavState {
  switch (action.type) {
    case NAVCHANGE:
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
    case ACCHANGE:
      return action.payload;
    default:
      return state;
  }
}
