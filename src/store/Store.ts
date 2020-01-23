import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './Reducer';
import thunk from 'redux-thunk';


//客户端获取的store
export const clientStore = () => {
  let defaultState = window.content || {};
  let composeEnhancers = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(reducer, defaultState, composeEnhancers(
    applyMiddleware(thunk)
  ))
};

//服务端获取的store
export const ssrStore = () => {
  let composeEnhancers = compose;
  return createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
  ))
}

