import { error } from 'console';
import { combineReducers } from 'redux';
import snackbarReducer from '../../snackbarReducer';

// @ts-ignore
interface ICard {
  Description: string;
  Status: string;
  DueDate: string;
  CreatedDate: string;
}
interface IUser {
  Email: string;
}

const initialState: ILogin = {
  IsAuthenticated: false,
  loading: false,
  error: '',
  token: '',
  tasks: [],
  refresh: false,
  user: null,
};

interface ILogin {
  IsAuthenticated: boolean;
  loading: boolean;
  error: any;
  token: string;
  tasks: ICard[];
  refresh: boolean;
  user: IUser | null;
}

//register

const userReducer = (state = initialState, action: any): ILogin => {
  switch (action.type) {
    case 'REGISTER_USER':
      return { ...state, loading: true };
    case 'REGISTER_USER_SUCCESS':
      return { ...state, loading: false, error: action.payload };
    case 'REGISTER_USER_FAILED':
      return { ...state, loading: false, error: action.payload };
    case 'REGISTER_USER_DONE':
      return { ...state, loading: false, error: '' };
    case 'LOGIN_USER':
      return { ...state, loading: true, error: '' };
    case 'LOGIN_FAILED':
      return { ...state, loading: false, error: '', token: action.payload };
    case 'LOGIN_USER_SUCCESS':
      return { ...state, loading: false, error: '', token: action.payload };
    case 'GET_USER_SUCCESS':
      return { ...state, loading: false, error: '', user: action.payload };
    case 'CREATE_TASK':
      return { ...state, loading: false, error: '', token: action.payload };
    case 'GET_TASK_STARTED':
      return { ...state, loading: true, error: false };

    case 'GET_TASK_SUCCESS':
      return {
        ...state,
        loading: false,
        error: false,
        tasks: action.payload,
        refresh: false,
      };
    case 'EDIT_TASK_STARTED':
      return { ...state, loading: true, error: false };
    case 'EDIT_TASK_SUCCESS':
      return { ...state, loading: false, error: false, refresh: true };
    case 'EDIT_TASK_FAILURE':
      return { ...state, loading: false, error: true };
    case 'CREATE_TASK_SUCCESS':
      return { ...state, loading: false, error: false, refresh: true };
    case 'CREATE_TASK_FAILURE':
      return { ...state, loading: false, error: true };
    case 'DELETE_TASK_SUCCESS':
      return { ...state, loading: false, error: false, refresh: true };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: userReducer,
  snackbar: snackbarReducer,
});

export default rootReducer;
