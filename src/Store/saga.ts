import { takeLatest, call, put } from 'redux-saga/effects'
import axios, { AxiosError } from 'axios';
import { Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../axiosHelper';
interface ILogin {

}

function* RegisterUser(data: any): any {

  try {
    console.log(data);

    const response = yield call(axiosInstance.post, 'users/register', data.data);
    console.log(response);
    yield put({ type: 'REGISTER_USER_SUCCESS', payload: 'User Created Successfully.' });
      //yield put({ type: 'REGISTER_USER', payload: response.data });
    window.location.href='/login';
  }

  catch (error: any) {
    console.log(error)
    const axiosError: AxiosError = error;
    if (axiosError.response?.status == 409) {


      yield put({ type: 'REGISTER_USER_FAILED', payload: 'User Already Exist' });

    }


  }

}


function* Login(payload: any): any {
  try {
    const data = payload.data;
    const response: any = yield call(axiosInstance.post, 'users/Login', data);
    console.log(response);
    if (!!response &&response.status == 200) {
      yield put({ type: 'LOGIN_USER_SUCCESS', payload: response.data.token });
      sessionStorage.setItem('jwt', response.data.token);
      const userResponse: any = yield call(axiosInstance.get, 'users');
      console.log(userResponse);

    }
    else{
      yield put({ type: 'LOGIN_FAILED' });

    }
  }
  catch (error) {
    yield put({ type: 'LOGIN_FAILED' });

  }
}

function* GetTasks(): any {

  yield put({type:'GET_TASK_STARTED'});

  const response = yield call(axiosInstance.get, 'birditasks');
 yield put({type:'GET_TASK_SUCCESS',payload:response.data});

  console.log(response);
}

function* CreateTask (payload:any):any
{

  const data = payload.data;
console.log(data);
  const response = yield call (axiosInstance.post,'birditasks',data);
  console.log(response);
}

function* rootSaga() {
  yield takeLatest('REGISTER_USER', RegisterUser);
  yield takeLatest('LOGIN_USER', Login);
  yield takeLatest('GET_TASKS', GetTasks);
  yield takeLatest('CREATE_TASK',CreateTask);
}

export default rootSaga;