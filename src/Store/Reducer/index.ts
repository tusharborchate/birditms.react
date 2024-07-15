import { combineReducers } from "redux";
const initialState = {
    IsAuthenticated: false,
    loading: false,
    error: '',
};


const userReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case 'REGISTE_USER':
            return { ...state, loading: true };
        case 'FETCH_POSTS_SUCCESS':
            return { ...state, loading: false};
        case 'FETCH_POSTS_FAILURE':
            return { ...state, loading: false };
        default:
            return state;
    }
};


const rootReducer = combineReducers({
 user:userReducer,

});

export default rootReducer;