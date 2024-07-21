import {
  CREATE_USER_FAILED,
  CREATE_USER_STARTED,
  CREATE_USER_SUCCESS,
  GET_USER_FAILED,
  GET_USER_STARTED,
  GET_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGIN_USER_STARTED,
  LOGIN_USER_SUCCESS,
} from '../../actions';
import { IUserState } from '../../types';

const initialState: IUserState = {
  IsAuthenticated: false,
  User: { Email: '' },
};
export const userReducer = (state = initialState, action: any): IUserState => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return { ...state, IsAuthenticated: true };

    case GET_USER_SUCCESS:
      return { ...state, User: action.payload, IsAuthenticated: true };

    default:
      return state;
  }
};
