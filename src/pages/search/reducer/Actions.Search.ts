import { getHotKey } from '../../../api/Search';
import { ACTIONS } from '../../../redux/ActionConst';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export const action_featch_hot_key = (hotKeys: any[]) => {
  return {
    type: ACTIONS.ACTION_FEATCH_HOT_KEY,
    data: hotKeys,
    receiver(state: any, action: AnyAction) {
      return {
        ...state,
        hotKeys: action.data
      }
    }
  }
}

export const dispatch_featch_hot_key = () => {
  return async (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    console.log('dispatch_featch_hot_key');
    let res = await getHotKey();
    if (res) {
      dispatch(action_featch_hot_key(res.data.hotkey))
    }
    return res;
  }
}