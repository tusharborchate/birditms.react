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
    case SET_LOADING:
      return { ...state, Loading: action.payload };
    default:
      return state;
  }
};
