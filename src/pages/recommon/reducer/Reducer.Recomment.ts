import { defaultReducerHandler } from "../../../redux/Actions"
import { AnyAction } from "redux";
import { Model } from "../../../modules/DataStruct";
import { ACTIONS } from "../../../redux/ActionConst";

interface iDefaultState {
  recomment: {
    slider: Model.Slider[];
  },
  disc_list: Model.Disc[];
}

let defaultState: iDefaultState = {
  recomment: {
    slider: [],
  },
  disc_list: []
}

export const reducerRecomment = (state = defaultState, action: AnyAction) => {
  switch(action.type) {
    case ACTIONS.ACTION_FEATCH_DISTLIST:
    case ACTIONS.ACTION_FEATCH_RECOMMENT:
      return defaultReducerHandler(state, action);
  }
  return state;
}