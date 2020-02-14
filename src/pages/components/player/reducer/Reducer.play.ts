import { AnyAction } from "redux";
import { Song } from "../../../../logicFunction/song";
import { defaultReducerHandler } from "../../../../redux/Actions";
import { ACTIONS } from "../../../../redux/ActionConst";
import { PLAY_MODE } from "../../../../logicFunction/Constant";

interface iDefaultState {
  songList: Song[];
  curSong: Song;
  mode: PLAY_MODE;
  showPageFlag: boolean;
}

let defaultState: iDefaultState = {
  songList: [],
  curSong: null,
  mode: PLAY_MODE.LOOP_LIST,
  showPageFlag: true,
}

export const reducerPlay = (state = defaultState, action: AnyAction) => {
  switch (action.type) {
    case ACTIONS.ACTION_FEATCH_TOP_MUSICLIST:
    case ACTIONS.ACTION_PLAY_SONG:
    case ACTIONS.ACTION_PLAY_MODE:
    case ACTIONS.ACTION_SHOW_PAGE:
      return defaultReducerHandler(state, action);
  }
  return state;
}