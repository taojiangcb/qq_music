import { Song } from '../../../../logicFunction/Song';
import { AnyAction } from 'redux';
import { ACTIONS } from '../../../../redux/ActionConst';
import { PLAY_MODE } from '../../../../logicFunction/Constant';


export function action_play_Song(song: Song): AnyAction {
  return {
    type: ACTIONS.ACTION_PLAY_SONG,
    data: song,
    receiver(state, action) {
      return {
        ...state,
        curSong: action.data,
      }
    }
  }
}

export function action_play_model(model: PLAY_MODE): AnyAction {
  return {
    type: ACTIONS.ACTION_PLAY_MODE,
    data: model,
    receiver(state: any, action: AnyAction) {
      return {
        ...state,
        mode: action.data
      }
    }
  }
}

export function action_play_showPage(show: Boolean): AnyAction {
  return {
    type: ACTIONS.ACTION_SHOW_PAGE,
    data: show,
    receiver(state: any, action: AnyAction) {
      return {
        ...state,
        showPageFlag: action.data
      }
    }
  }
}

export function action_featch_musiclist(list: Song[]): AnyAction {
  return {
    type: ACTIONS.ACTION_FEATCH_TOP_MUSICLIST,
    data: list,
    receiver(state, action) {
      // let normalsizes = action.data.map(item => {
      //   if (item.data.songid && item.data.albummid) {
      //     return createSong(item.data);
      //   }
      // });

      return {
        ...state,
        songList: action.data
      }
    }
  }
}