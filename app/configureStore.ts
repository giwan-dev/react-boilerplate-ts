/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose, Store, Reducer, Action, DeepPartial, StoreEnhancer, AnyAction } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import createReducer, { RootReducer, RootReducerMap } from './reducers';
import { History } from 'history';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (option: { shouldHotReload: boolean }) => typeof compose;
  }
}

/**
 * Store extesion interface
 */
interface IStoreExtension {
  runSaga: SagaMiddleware<any>['run'];
  injectedReducers: any; // FIXME
  injectedSagas: any; // FIXME
}

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}, history: History) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const enhancers = [applyMiddleware(...middlewares)];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* tslint-disable no-underscore-dangle, indent */
  const composeEnhancers: (...funcs: StoreEnhancer<{
    dispatch: {};
}, {}>[]) => StoreEnhancer<IStoreExtension, {}> =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // TODO: Try to remove when `react-router-redux` is out of beta, LOCATION_CHANGE should not be fired more than once after hot reloading
          // Prevent recomputing reducers for `replaceReducer`
          shouldHotReload: false,
        })
      : compose;
  /* tslint-enable */

  const store = createStore<RootReducerMap, AnyAction, IStoreExtension, {}>(
    createReducer(),
    fromJS(initialState) as DeepPartial<any>,
    composeEnhancers(...enhancers),
  );

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
}
