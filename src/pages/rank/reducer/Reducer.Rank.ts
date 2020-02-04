import { AnyAction } from "redux";
import { defaultReducerHandler } from "../../../redux/Actions";
import { Module } from "webpack";
import { Model } from "../../../modules/DataStruct";
import { Song } from "../../../logicFunction/song";
import { ACTIONS } from "../../../redux/ActionConst";

interface iDefaultState {
  topList: Model.TopInfo[];
}

let defaultState: iDefaultState = {
  topList: [],
}

export const reducerRank = (state = defaultState, action: AnyAction) => {
  switch(action.type) {
    case ACTIONS.ACTION_FEATCH_TOPLIST:
      return defaultReducerHandler(state, action);
  }
  return state;
}