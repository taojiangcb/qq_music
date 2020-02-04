import { AnyAction } from "redux";
import { Song } from "../../../../logicFunction/song";
import { defaultReducerHandler } from "../../../../redux/Actions";
import { ACTIONS } from "../../../../redux/ActionConst";

interface iDefaultState {
  signList: Song[];
  curSong: Song;
}

let defaultState: iDefaultState = {
  signList: [],
  curSong: null
}

export const reducerPlay = (state = defaultState, action: AnyAction) => {
  switch (action.type) {
    case ACTIONS.ACTION_FEATCH_TOP_MUSICLIST:
    case ACTIONS.ACTION_PLAY_SONG:
      return defaultReducerHandler(state, action);
  }
  return state;
}