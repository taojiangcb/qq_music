import { getRecommend } from "../../../api/Recommend"
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { ACTIONS } from '../../../redux/ActionConst';


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

export const dispatch_featch_recomment = () => {
  return async (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    console.log('dispatch_featch_recomment');
    let res = await getRecommend();
    if (res.data) {
      dispatch(action_featch_recomment(res.data));
    }
  }
}