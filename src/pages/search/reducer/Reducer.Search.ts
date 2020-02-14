import { AnyAction } from "redux"
import { ACTIONS } from "../../../redux/ActionConst"
import { defaultReducerHandler } from '../../../redux/Actions';
import { Song } from '../../../logicFunction/Song';

let initState = {
  hotKeys: [],
  searchSongs:[]
}

export const reducerSearch = (state: any = initState, action: AnyAction) => {
  switch (action.type) {
    case ACTIONS.ACTION_FEATCH_HOT_KEY:
      return defaultReducerHandler(state, action);
    default:
      return state;
  }
}