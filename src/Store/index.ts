import { applyMiddleware, createStore } from "redux";
import rootReducer from "./Reducer";
import  createSagaMiddleware from 'redux-saga';
import rootSaga from "./saga";
import { createStoreHook } from "react-redux";


const sagaMiddleWare= createSagaMiddleware();
const store= createStore(rootReducer,applyMiddleware(sagaMiddleWare));


sagaMiddleWare.run(rootSaga);
export default store;