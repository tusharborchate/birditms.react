import { takeLatest, call, put, all } from 'redux-saga/effects';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../../http/axiosHelper';
import { openSnackbar } from '../reducer/snackbarReducer';
import {
  CREATE_TASK_STARTED,
  DELETE_TASK_STARTED,
  EDIT_TASK_STARTED,
  GET_TASK_BY_ID_STARTED,
  GET_TASK_FAILED,
  GET_TASK_STARTED,
  GET_TASK_SUCCESS,
  SET_LOADING,
} from '../../actions';

function* GetTasks(): any {
  yield put({ type: SET_LOADING, payload: true });
  console.log('cd');
  try {
    const response: AxiosResponse = yield call(axiosInstance.get, 'birditasks');
    console.log(response);
    if (response.status == 200) {
      yield put({ type: GET_TASK_SUCCESS, payload: response.data });
    }
  } catch (Error) {
    yield put({ type: GET_TASK_FAILED, payload: false });
  }
  yield put({ type: SET_LOADING, payload: false });
}

function* CreateTask(payload: any): any {
  try {
    const data = payload.data;
    console.log(data);
    yield put({ type: SET_LOADING, payload: true });

    const response = yield call(axiosInstance.post, 'birditasks', data);
    if (response.status == 201) {
      yield put(
        openSnackbar({
          message: 'Task created successfully.',
          severity: 'success',
        })
      );
      yield put({ type: GET_TASK_STARTED });
    }
  } catch (error) {
    yield put({ type: SET_LOADING, payload: false });

    yield put(
      openSnackbar({
        message: 'Error occured while creating task.',
        severity: 'error',
      })
    );
  }
}

function* GetTaskById(payload: any): any {
  yield put({ type: SET_LOADING, payload: true });

  const response = yield call(axiosInstance.get, `birditasks/${payload.data}`);
  console.log(response);
  yield put({ type: SET_LOADING, payload: false });
}

function* EditTask(payload: any): any {
  try {
    yield put({ type: SET_LOADING, payload: true });

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
    yield put({ type: GET_TASK_STARTED });
  } catch (error) {
    console.log(error);
    yield put({ type: SET_LOADING, payload: false });

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
    yield put({ type: SET_LOADING, payload: true });
    yield call(axiosInstance.delete, `birditasks/${payload.data}`);
    yield put({ type: GET_TASK_STARTED });

    yield put(
      openSnackbar({
        message: 'Task deleted successfully.',
        severity: 'success',
      })
    );
  } catch (error) {
    yield put({ type: SET_LOADING, payload: false });

    yield put(
      openSnackbar({
        message: 'Error occured while deleting task.',
        severity: 'error',
      })
    );
  }
}

export function* taskSaga() {
  yield all([
    takeLatest(GET_TASK_STARTED, GetTasks),
    takeLatest(CREATE_TASK_STARTED, CreateTask),
    takeLatest(GET_TASK_BY_ID_STARTED, GetTaskById),
    takeLatest(EDIT_TASK_STARTED, EditTask),
    takeLatest(DELETE_TASK_STARTED, DeleteTask),
  ]);
}
