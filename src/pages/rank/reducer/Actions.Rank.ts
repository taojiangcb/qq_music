import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { getTopList, getMusicList } from "../../../api/Rank";
import { ACTIONS } from "../../../redux/ActionConst";

// import { ERR_OK } from "../../../logicFunction/Constant";
// import { isTemplateExpression } from "typescript";
// import { createSong } from "../../../logicFunction/song";

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

export function dispatch_featch_toplist() {
  return async (d: ThunkDispatch<any, any, AnyAction>) => {
    let res = await getTopList();
    if (res.data) {
      d(action_featch_toplist(res.data.topList));
    }
    return res.data.topList;
  }
}

// export function dispatch_featch_musiclist(id: number) {
//   return async (d: ThunkDispatch<any, any, AnyAction>) => {
//     let res = await getMusicList(id);
//     if (res.code === ERR_OK) {
//       d(action_featch_musiclist(res.songlist));
//     }
//     return res.songlist;
//   }
// }