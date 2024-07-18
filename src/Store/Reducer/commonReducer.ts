import { SET_LOADING } from '../../actions';
import { ICommonState } from '../../types';

const initialState: ICommonState = {
  Loading: false,
};
export const commonReducer = (
  state = initialState,
  action: any
): ICommonState => {
  switch (action.type) {
    // case CREATE_USER_STARTED:
    //     return { ...state, loading: true };
    // case CREATE_USER_SUCCESS:
    //     return { ...state, loading: false, error: action.payload };
    // case CREATE_USER_FAILED:
    //     return { ...state, loading: false, error: action.payload };
    // case LOGIN_USER_STARTED:
    //     return { ...state, loading: true, error: '' };
    // case LOGIN_USER_FAILED:
    //     return { ...state, loading: false, error: '', token: action.payload };
    // case LOGIN_USER_SUCCESS:
    //     return { ...state, loading: true, error: '', token: action.payload };
    // case GET_USER_STARTED:
    //     return { ...state, loading: true, error: '' };
    case SET_LOADING:
      return { ...state, Loading: action.payload };
    // case GET_USER_FAILED:
    //     return { ...state, loading: true, error: '' };
    default:
      return state;
  }
};
