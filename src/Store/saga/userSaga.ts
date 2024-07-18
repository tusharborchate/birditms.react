import { takeLatest, call, put } from 'redux-saga/effects';
import { AxiosError } from 'axios';

import axiosInstance from '../../http/axiosHelper';
import { openSnackbar } from '../reducer/snackbarReducer';
import {
  CREATE_USER_STARTED,
  GET_USER_SUCCESS,
  LOGIN_USER_STARTED,
  LOGIN_USER_SUCCESS,
  SET_LOADING,
} from '../../actions';

function* RegisterUser(data: any): any {
  try {
    console.log(data);

    const response = yield call(
      axiosInstance.post,
      'users/register',
      data.data
    );
    console.log(response);
    yield put(
      openSnackbar({
        message: 'User created successfully',
        severity: 'success',
      })
    );

    window.location.href = '/';
  } catch (error: any) {
    console.log(error);
    const axiosError: AxiosError = error;
    if (axiosError.response?.status == 409) {
      yield put(
        openSnackbar({ message: 'User Already Exist', severity: 'error' })
      );
    }
  }
}

function* Login(payload: any): any {
  yield put({ type: SET_LOADING, payload: true });
  try {
    const data = payload.data;
    const response: any = yield call(axiosInstance.post, 'users/Login', data);
    console.log(response);
    if (!!response && response.status == 200) {
      sessionStorage.setItem('jwt', response.data.token);
      yield put({ type: LOGIN_USER_SUCCESS });

      const userResponse: any = yield call(axiosInstance.get, 'users');
      //check if response 200 else redirect
      sessionStorage.setItem('email', userResponse.data.Email);
      yield put({ type: GET_USER_SUCCESS, payload: userResponse.data });

      console.log(userResponse);
    } else {
      yield put(
        openSnackbar({
          message: 'Incorrect username or password',
          severity: 'error',
        })
      );
    }
  } catch (error) {
    yield put(
      openSnackbar({
        message: 'Incorrect username or password',
        severity: 'error',
      })
    );
  }
  yield put({ type: SET_LOADING, payload: false });

}

export function* userSaga() {
  yield takeLatest(CREATE_USER_STARTED, RegisterUser);
  yield takeLatest(LOGIN_USER_STARTED, Login);
}
