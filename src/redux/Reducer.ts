import { combineReducers } from 'redux';
import { reducerHome } from '../pages/home/reducer/Reducer.Home';
import { reducerRecomment } from '../pages/recommon/reducer/Reducer.Recomment';

const reducers = combineReducers({
  reducerHome,
  reducerRecomment
})

export default reducers;
