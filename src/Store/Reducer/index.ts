import { error } from "console";
import { combineReducers } from "redux";

interface ICard {
    Description: string,
    Status: string,
    DueDate: string,
    CreatedDate: string
}

const initialState: ILogin = {
    IsAuthenticated: false,
    loading: false,
    error: '',
    token: '',
    tasks: []
};

interface ILogin {
    IsAuthenticated: boolean,
    loading: boolean,
    error: string,
    token: string,
    tasks: ICard[]
};

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
            return { ...state, loading: true, error: '' }
        case 'LOGIN_FAILED':
            return { ...state, loading: false, error: '', token: action.payload }
        case 'LOGIN_USER_SUCCESS':
            return { ...state, loading: false, error: '', token: action.payload }
        case 'CREATE_TASK':
            return { ...state, loading: false, error: '', token: action.payload }
        case 'GET_TASK_STARTED':
            return { ...state, loading: true, error: '', }
        case 'GET_TASK_SUCCESS':
            return { ...state, loading: false, error: '', tasks: action.payload }
        default:
            return state;
    }
};


const rootReducer = combineReducers({
    user: userReducer,

});

export default rootReducer;