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