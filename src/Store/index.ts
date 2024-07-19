import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducer';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './saga';
import { createStoreHook } from 'react-redux';
import { IRootReducerShape } from '../types';

const sagaMiddleWare = createSagaMiddleware();
const initialState: IRootReducerShape = {
  User: {
    IsAuthenticated: false,
    User: { Email: '' }, // Initial state for reducer 1
  },
  Task: {
    Refresh: false,
    Tasks: [],
    Loading: false,
    // Initial state for reducer 2
  },
  Common: {
    Loading: false,
  },
  Snackbar: {
    open: false,
    message: '',
    severity: '',
  },
};

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(sagaMiddleWare)
);

sagaMiddleWare.run(rootSaga);
export default store;
