import { combineReducers } from 'redux';
import { reducerHome } from '../pages/home/reducer/Reducer.Home';
import { reducerRecomment } from '../pages/recommon/reducer/Reducer.Recomment';
import { reducerRank } from '../pages/rank/reducer/Reducer.Rank';
import { reducerPlay } from '../pages/components/player/reducer/Reducer.play';

const reducers = combineReducers({
  reducerHome,
  reducerRecomment,
  reducerRank,
  reducerPlay
})

export default reducers;
