import { combineReducers, Reducer } from 'redux';
import snackbarReducer from './snackbarReducer';
import { userReducer } from './userReducer';
import { taskReducer } from './taskReducer';
import { commonReducer } from './commonReducer';
import { IRootReducerShape } from '../../types';

const rootReducer: Reducer<IRootReducerShape> = combineReducers({
  User: userReducer,
  Task: taskReducer,
  Common: commonReducer,
  Snackbar: snackbarReducer,
});
export default rootReducer;
