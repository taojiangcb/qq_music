import { defaultReducerHandler } from "../../../redux/Actions"
import { AnyAction } from "redux";
import { Model } from "../../../modules/Slider";

interface iDefaultState {
  recomment: {
    slider: Model.Slider[];
  }
}

let defaultState: iDefaultState = {
  recomment: {
    slider: []
  }
}

export const reducerRecomment = (state = defaultState, action: AnyAction) => {
  return defaultReducerHandler(state, action);
}