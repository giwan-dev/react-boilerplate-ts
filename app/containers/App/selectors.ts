/**
 * The global state selectors
 */

import { createSelector, Selector } from 'reselect';
import { AppReducerStateMap } from './reducer';
import { RootReducerMap, RouterReducerStateMap } from 'reducers';

const selectGlobal: Selector<RootReducerMap, AppReducerStateMap> = state => state.get('global');

const selectRoute: Selector<RootReducerMap, RouterReducerStateMap> = state => state.get('route');

const makeSelectCurrentUser = () =>
  createSelector<RootReducerMap, AppReducerStateMap, any>(
    selectGlobal,
    globalState => globalState.get('currentUser'),
  );

const makeSelectLoading = () =>
  createSelector<RootReducerMap, AppReducerStateMap, any>(
    selectGlobal,
    globalState => globalState.get('loading'),
  );

const makeSelectError = () =>
  createSelector<RootReducerMap, AppReducerStateMap, any>(
    selectGlobal,
    globalState => globalState.get('error'),
  );

const makeSelectRepos = () =>
  createSelector<RootReducerMap, AppReducerStateMap, any>(
    selectGlobal,
    globalState => globalState.getIn(['userData', 'repositories']),
  );

const makeSelectLocation = () =>
  createSelector(selectRoute, routeState => routeState.get('location').toJS());

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
};
