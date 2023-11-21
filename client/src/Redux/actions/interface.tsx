import { User } from "../reducer/initialState";

export interface LOGIN_START {
    type: "LOGIN_START";
}

export interface LOGIN_SUCCESS {
    type: "LOGIN_SUCCESS";
    payload: {
        user: User;
        token: string;
    };
}

export interface LOGIN_FAILURE {
    type: "LOGIN_FAILURE";
    payload: string;
}

export interface LOGOUT {
    type: "LOGOUT";
}

export interface START_CHECK_COOKIE {
    type: "START_CHECK_COOKIE";
}

export interface CHECK_COOKIE_SUCCESS {
    type: "CHECK_COOKIE_SUCCESS";
    payload: {
        user: User;
        token: string;
    };
}

export interface CHECK_COOKIE_FAILURE {
    type: "CHECK_COOKIE_FAILURE";
}

export interface SET_LOADING {
    type: "SET_LOADING";
}

export interface CREATE_USER_START {
    type: "CREATE_USER_START";
}

export interface CREATE_USER_SUCCESS {
    type: "CREATE_USER_SUCCESS";
    payload: {
        user: User;
        token: string;
    };
}

export interface CREATE_USER_FAILURE {
    type: "CREATE_USER_FAILURE";
    payload: string;
}




export type Action =
    | LOGIN_START
    | LOGIN_SUCCESS
    | LOGIN_FAILURE
    | LOGOUT
    | START_CHECK_COOKIE
    | CHECK_COOKIE_SUCCESS
    | CHECK_COOKIE_FAILURE
    | SET_LOADING
    | CREATE_USER_START
    | CREATE_USER_SUCCESS
    | CREATE_USER_FAILURE
    ;