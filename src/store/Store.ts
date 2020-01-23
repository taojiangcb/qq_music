import { createStore, applyMiddleware, compose, Store } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from './Reducer';

let cliStore: Store = null;
const logger = createLogger({
  // ...options
});

//客户端获取的store
export const clientStore = () => {
  if (cliStore) return cliStore;
  let composeEnhancers = window && (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  cliStore = createStore(reducers, {}, composeEnhancers(
    process.env.REACT_APP_ENV === "dev"
      ? applyMiddleware(thunk, logger)
      : applyMiddleware(thunk)
  ))
};

//服务端获取的store
export const ssrStore = () => {
  let composeEnhancers = compose;
  return createStore(reducers, composeEnhancers(
    applyMiddleware(thunk)
  ))
}

