import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { getTopList, getMusicList } from "../../../api/Rank";
import { ACTIONS } from "../../../redux/ActionConst";
import { ERR_OK } from "../../../logicFunction/Constant";
import { isTemplateExpression } from "typescript";
import { createSong } from "../../../logicFunction/song";

export function action_featch_toplist(list: any): AnyAction {
  return {
    type: ACTIONS.ACTION_FEATCH_TOPLIST,
    data: list,
    receiver(state, action) {
      return {
        ...state,
        topList: action.data
      }
    }
  }
}

export function action_featch_musiclist(list: any): AnyAction {
  return {
    type: ACTIONS.ACTION_FEATCH_TOP_MUSICLIST,
    data: list,
    receiver(state, action) {
      let normalsizes = action.data.map(item => {
        if (item.data.songid && item.data.albummid) {
          return createSong(item.data);
        }
      });

      return {
        ...state,
        signList: normalsizes
      }
    }
  }
}

export function dispatch_featch_toplist() {
  return async (d: ThunkDispatch<any, any, AnyAction>) => {
    let res = await getTopList();
    if (res.data) {
      d(action_featch_toplist(res.data.topList));
    }
  }
}

export function dispatch_featch_musiclist(id: number) {
  return async (d: ThunkDispatch<any, any, AnyAction>) => {
    console.log('getMusicList');
    let res = await getMusicList(id);
    if (res.code === ERR_OK) {
      console.log('dispatch_featch_musiclist');
      d(action_featch_musiclist(res.songlist));
    }
  }
}