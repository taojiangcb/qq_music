import { getRecommend, getDiscList } from "../../../api/Recommend"
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { ACTIONS } from '../../../redux/ActionConst';
import Axios from "axios";
import { HttpStatus } from '../../../api/ApiInstance';


export const action_featch_recomment = (data: any) => {
  return {
    type: ACTIONS.ACTION_FEATCH_RECOMMENT,
    data: data,
    receiver(state: any, action: AnyAction) {
      return {
        ...state,
        recomment: action.data
      }
    }
  }
}

export const action_featch_disclist = (data: any) => {
  return {
    type: ACTIONS.ACTION_FEATCH_DISTLIST,
    data: data,
    receiver(state: any, action: AnyAction) {
      return {
        ...state,
        disc_list: action.data
      }
    }
  }
}

export const dispatch_featch_recomment = () => {
  return async (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    console.log('dispatch_featch_recomment');
    let res = await getRecommend();
    if (res.data) {
      dispatch(action_featch_recomment(res.data));
    }
  }
}

export const dispatch_featch_disclist = () => {
  return async (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    console.log('dispatch_featch_disclist');
    try {
      let res = await getDiscList();
      if (res.data) {
        dispatch(action_featch_disclist(res.data.data));
      }
    }
    catch (err) {
      console.log(err.stack || err.message);
    }
  }
}