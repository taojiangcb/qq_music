
import { createStore, applyMiddleware, compose, Store, AnyAction } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from './Reducer';

var cliStore: Store;
const logger = createLogger({
  // ...options
});

//客户端获取的store
export const clientStore = () => {
  if (cliStore) return cliStore;
  let composeEnhancers = window && (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  console.log(`--------`);
  cliStore = createStore(reducers, {}, composeEnhancers(
    process.env.REACT_APP_ENV === "dev"
      ? applyMiddleware(thunk, logger)
      : applyMiddleware(thunk)
  ));
  return cliStore;
};

//服务端获取的store
export const ssrStore = () => {
  let composeEnhancers = compose;
  return createStore(reducers, composeEnhancers(
    applyMiddleware(thunk)
  ))
}

export const getStore = () => {
  return window ? clientStore() : ssrStore();
}

export const initLoadData = (fn: Function, ...args) => {
  return async () => {
    let store = getStore();
    let dispatch: ThunkDispatch<any, any, AnyAction> = store.dispatch;
    if (fn) {
      console.log('initLoadData call ' + fn.name);
      dispatch && dispatch(fn(...args))
    }
  }
}