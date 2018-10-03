/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { LOAD_REPOS, LOAD_REPOS_SUCCESS, LOAD_REPOS_ERROR } from './constants';
import { Action } from 'redux';
import { HandleErrorAction } from 'types/action';

export interface ReposLoadedAction extends Action {
  repos: any[];
  username: string;
}

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {Action} An action object with a type of LOAD_REPOS
 */
export function loadRepos(): Action {
  return {
    type: LOAD_REPOS,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {ReposLoadedAction}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function reposLoaded(repos: any[], username: string): ReposLoadedAction {
  return {
    repos,
    username,
    type: LOAD_REPOS_SUCCESS,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {any} error The error
 *
 * @return {HandleErrorAction}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function repoLoadingError(error: any): HandleErrorAction {
  return {
    error,
    type: LOAD_REPOS_ERROR,
  };
}
