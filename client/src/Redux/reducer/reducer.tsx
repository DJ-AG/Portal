import { InitialState, initialState } from './initialState';
import  ActionTypes from '../actions/types';
import { Action } from '../actions/interface'


const reducer = (state: InitialState = initialState, action: Action): InitialState => {
    switch(action.type) {
        case ActionTypes.LOGIN_START:
            return {
                ...initialState,
                isLoading: true,
            };
        case ActionTypes.LOGIN_SUCCESS:
            return {
                ...initialState,
                user: action.payload.user,
                token: action.payload.token,
                isLogged: true,
            };
        case ActionTypes.LOGIN_FAILURE:
            return {
                ...initialState,
                isError: true,
                errorMessage: action.payload,
            };
        case ActionTypes.LOGOUT:
            return initialState;

        case ActionTypes.CREATE_USER_START:
            return {
                ...initialState,
                isLoading: true,
            };
        case ActionTypes.CREATE_USER_SUCCESS:
            return {
                ...initialState,
                user: action.payload.user,
                token: action.payload.token,
                isLogged: true,
            };
        case ActionTypes.CREATE_USER_FAILURE:
            return {
                ...initialState,
                isError: true,
                errorMessage: action.payload,
            };
        case ActionTypes.SET_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case ActionTypes.START_CHECK_COOKIE:
            return {
                ...state,
                isLoading: true,
            };
        case ActionTypes.CHECK_COOKIE_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isLogged: true,
            };
        case ActionTypes.CHECK_COOKIE_FAILURE:
            return {
                ...state,
                isError: true,
            };
            
        default:
            return state;
    }
};

export default reducer;