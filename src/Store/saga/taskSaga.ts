import { takeLatest, call, put } from 'redux-saga/effects';
import axios, { AxiosError } from 'axios';
import { Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../../http/axiosHelper';
import { openSnackbar } from '../reducer/snackbarReducer';
import {
  CREATE_TASK_STARTED,
  DELETE_TASK_STARTED,
  EDIT_TASK_STARTED,
  GET_TASK_BY_ID_STARTED,
  GET_TASK_STARTED,
  GET_TASK_SUCCESS,
  SET_LOADING,
} from '../../actions';

function* GetTasks(): any {
  yield put({ type: SET_LOADING, payload: true });
  const response = yield call(axiosInstance.get, 'birditasks');
  yield put({ type: GET_TASK_SUCCESS, payload: response.data });
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
    console.log(error);

    yield put(
      openSnackbar({
        message: 'Error occured while creating task.',
        severity: 'error',
      })
    );
  }
  yield put({ type: SET_LOADING, payload: false });
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

    yield put(
      openSnackbar({
        message: 'Error occured while updating task.',
        severity: 'error',
      })
    );
  }
  yield put({ type: SET_LOADING, payload: false });
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
    yield put(
      openSnackbar({
        message: 'Error occured while deleting task.',
        severity: 'error',
      })
    );
  }
  yield put({ type: SET_LOADING, payload: false });
}

export function* taskSaga() {
  yield takeLatest(GET_TASK_STARTED, GetTasks);
  yield takeLatest(CREATE_TASK_STARTED, CreateTask);
  yield takeLatest(GET_TASK_BY_ID_STARTED, GetTaskById);
  yield takeLatest(EDIT_TASK_STARTED, EditTask);
  yield takeLatest(DELETE_TASK_STARTED, DeleteTask);
}
