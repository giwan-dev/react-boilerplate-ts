/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS, Map } from 'immutable';

import { LOAD_REPOS_SUCCESS, LOAD_REPOS, LOAD_REPOS_ERROR } from './constants';
import { Action } from 'redux';
import { ReposLoadedAction } from './actions';
import { HandleErrorAction } from 'types/action';

export interface AppReducerState {
  loading: boolean;
  error: boolean|any;
  currentUser: boolean|any;
  userData: {
    repositories: boolean|any[];
  };
}
export type AppReducerStateMap = Map<(keyof AppReducerState), any>;
export type AppReducerAction = Action & ReposLoadedAction & HandleErrorAction;

// The initial state of the App
const initialState: AppReducerStateMap = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
});

function appReducer(state: AppReducerStateMap = initialState, action: AppReducerAction) {
  switch (action.type) {
    case LOAD_REPOS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'repositories'], false);
    case LOAD_REPOS_SUCCESS:
      return state
        .setIn(['userData', 'repositories'], action.repos)
        .set('loading', false)
        .set('currentUser', action.username);
    case LOAD_REPOS_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
