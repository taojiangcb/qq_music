import { AnyAction } from "redux";
import { ACTIONS } from "./ActionConst";

/**
 * @param {上次的Preve} prevState 
 * @param {操作处理的Action} action 
 */
function receiveAction(prevState: any, action: AnyAction) {
  let { receiver } = action;
  if (typeof receiver === 'function') {
    return receiver(prevState, action);
  }
  return null;
}

export const normalReducer = (state: any, action: AnyAction) => {
  let newState = action.receiver ? receiveAction(state, action) : null;
  let resultState = newState ? newState : state;
  return resultState;
}

export function defaultReducerHandler(state: any, action: AnyAction) {
  const actions = ACTIONS;
  let newState = state;
  for (const key in actions) {
    // eslint-disable-next-line no-prototype-builtins
    if (actions.hasOwnProperty(key)) {
      const element = actions[key];
      if (element === action.type) {
        newState = normalReducer(state, action);
        break;
      }
    }
  }
  return newState;
}
