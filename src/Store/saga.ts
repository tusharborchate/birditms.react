import { takeLatest, call, put } from 'redux-saga/effects';
import axios, { AxiosError } from 'axios';
import { Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../axiosHelper';
import { openSnackbar } from '../snackbarReducer';
interface ILogin {}

function* RegisterUser(data: any): any {
  try {
    console.log(data);

    const response = yield call(
      axiosInstance.post,
      'users/register',
      data.data
    );
    console.log(response);
    yield put({
      type: 'REGISTER_USER_SUCCESS',
      payload: 'User Created Successfully.',
    });
    //yield put({ type: 'REGISTER_USER', payload: response.data });
    yield put(
      openSnackbar({
        message: 'User created successfully',
        severity: 'success',
      })
    );

    window.location.href = '/login';
  } catch (error: any) {
    console.log(error);
    const axiosError: AxiosError = error;
    if (axiosError.response?.status == 409) {
      yield put({
        type: 'REGISTER_USER_FAILED',
        payload: 'User already exist',
      });
      yield put(
        openSnackbar({ message: 'User Already Exist', severity: 'error' })
      );
    }
  }
}

function* Login(payload: any): any {
  try {
    const data = payload.data;
    const response: any = yield call(axiosInstance.post, 'users/Login', data);
    console.log(response);
    if (!!response && response.status == 200) {
      yield put({ type: 'LOGIN_USER_SUCCESS', payload: response.data.token });
      sessionStorage.setItem('jwt', response.data.token);
      const userResponse: any = yield call(axiosInstance.get, 'users');
      sessionStorage.setItem('email', userResponse.data.Email);
      yield put({ type: 'GET_USER_SUCCESS', payload: userResponse.data });

      console.log(userResponse);
    } else {
      yield put({ type: 'LOGIN_FAILED' });
      yield put(
        openSnackbar({
          message: 'Incorrect username or password',
          severity: 'error',
        })
      );
    }
  } catch (error) {
    yield put({ type: 'LOGIN_FAILED' });
    yield put(
      openSnackbar({
        message: 'Incorrect username or password',
        severity: 'error',
      })
    );
  }
}

function* GetTasks(): any {
  yield put({ type: 'GET_TASK_STARTED' });

  const response = yield call(axiosInstance.get, 'birditasks');
  yield put({ type: 'GET_TASK_SUCCESS', payload: response.data });

  console.log(response);
}

function* CreateTask(payload: any): any {
  try {
    const data = payload.data;
    console.log(data);
    const response = yield call(axiosInstance.post, 'birditasks', data);
    if (response.status == 201) {
      yield put(
        openSnackbar({
          message: 'Task created successfully.',
          severity: 'success',
        })
      );
      yield put({ type: 'CREATE_TASK_SUCCESS' });
      yield put({ type: 'GET_TASKS' });
    }
    console.log(response);
  } catch (error) {
    console.log(error);
    yield put({ type: 'CREATE_TASK_FAILURE' });

    yield put(
      openSnackbar({
        message: 'Error occured while creating task.',
        severity: 'error',
      })
    );
  }
}

function* GetTaskById(payload: any): any {
  const response = yield call(axiosInstance.get, `birditasks/${payload.data}`);
  console.log(response);
}

function* EditTask(payload: any): any {
  try {
    const response = yield call(
      axiosInstance.put,
      `birditasks/${payload.data.Id}`,
      payload.data
    );
    console.log(response);
    yield put(
      openSnackbar({
        message: 'Task updated successfully.',
        severity: 'success',
      })
    );
    yield put({ type: 'EDIT_TASK_SUCCESS' });
    yield put({ type: 'GET_TASKS' });
  } catch (error) {
    console.log(error);
    yield put({ type: 'EDIT_TASK_FAILURE' });

    yield put(
      openSnackbar({
        message: 'Error occured while updating task.',
        severity: 'error',
      })
    );
  }
}

function* DeleteTask(payload: any): any {
  try {
    console.log(payload);
    yield call(axiosInstance.delete, `birditasks/${payload.data}`);
    yield put({ type: 'DELETE_TASK_SUCCESS' });
    yield put({ type: 'GET_TASKS' });

    yield put(
      openSnackbar({
        message: 'Task deleted successfully.',
        severity: 'success',
      })
    );
  } catch (error) {
    yield put(
      openSnackbar({
        message: 'Error occured while deleting task.',
        severity: 'error',
      })
    );
  }
}

function* rootSaga() {
  yield takeLatest('REGISTER_USER', RegisterUser);
  yield takeLatest('LOGIN_USER', Login);
  yield takeLatest('GET_TASKS', GetTasks);
  yield takeLatest('CREATE_TASK', CreateTask);
  yield takeLatest('GET_TASK_BY_ID', GetTaskById);
  yield takeLatest('EDIT_TASK', EditTask);
  yield takeLatest('DELETE_TASK', DeleteTask);
}

export default rootSaga;
