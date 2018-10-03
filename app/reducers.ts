/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { fromJS, Map } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import globalReducer, { AppReducerStateMap } from './containers/App/reducer';
import languageProviderReducer from './containers/LanguageProvider/reducer';
import { Action, Reducer, AnyAction } from 'redux';
import { Location } from 'history';

interface RouterReducerState {
  location: Location|null;
}
export type RouterReducerStateMap = Map<keyof RouterReducerState, Map<keyof Location, any>>;

export interface RouterAction extends Action {
  payload: Location;
}

export interface RootReducer {
  route: typeof routeReducer;
  global: typeof globalReducer;
  language: typeof languageProviderReducer;
}
export type RootReducerValue = RouterReducerStateMap & AppReducerStateMap & typeof languageProviderReducer;
export type RootReducerMap = Map<keyof RootReducer, RootReducerValue>;

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@5
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  location: null,
});

/**
 * Merge route into the global application state
 */
export function routeReducer(state: RouterReducerStateMap = routeInitialState, action: RouterAction) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        location: fromJS(action.payload),
      });
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers?: any) {
  return combineReducers<RootReducerMap>({
    route: routeReducer,
    global: globalReducer,
    language: languageProviderReducer,
    ...injectedReducers,
  }) as Reducer<RootReducerMap, AnyAction>;
}
