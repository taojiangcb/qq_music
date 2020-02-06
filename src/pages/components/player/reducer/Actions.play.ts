import { Song } from '../../../../logicFunction/Song';
import { AnyAction } from 'redux';
import { ACTIONS } from '../../../../redux/ActionConst';


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