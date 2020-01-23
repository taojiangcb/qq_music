import { AnyAction } from "redux";

const defaultState = {
  name: "Tao....",
  newsList: []
}

const reducerHome = (state = defaultState, action: AnyAction) => {
  return state;
}

export { reducerHome }
