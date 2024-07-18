import { userSaga } from './userSaga';
import { taskSaga } from './taskSaga';
import { all } from 'redux-saga/effects';

export function* rootSaga() {
  yield all([userSaga(), taskSaga()]);
}
