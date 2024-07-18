import {
  CREATE_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
  EDIT_TASK_SUCCESS,
  GET_TASK_FAILED,
  GET_TASK_STARTED,
  GET_TASK_SUCCESS,
} from '../../actions';
import { ITaskState } from '../../types';

const initialState: ITaskState = {
  Tasks: [],
  Refresh: false,
};
export const taskReducer = (state = initialState, action: any): ITaskState => {
  switch (action.type) {
    case GET_TASK_SUCCESS:
      return { ...state, Tasks: action.payload };
    case EDIT_TASK_SUCCESS:
      return { ...state, Refresh: true };
    case CREATE_TASK_SUCCESS:
      return { ...state, Refresh: true };
    case DELETE_TASK_SUCCESS:
      return { ...state, Refresh: true };

    default:
      return state;
  }
};