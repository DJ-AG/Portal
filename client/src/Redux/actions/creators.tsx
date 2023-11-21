import { Dispatch } from "redux";
import axios, { AxiosError } from "axios";

import ActionTypes from "./types";
import { Action } from "./interface";


const url = "http://localhost:5000"



// Create User
const createUser = (email: string, password: string) => {
    return async (dispatch:Dispatch<Action>) => {
        dispatch({ type: ActionTypes.CREATE_USER_START });

        try{
            const res = await axios.post(`${url}/api/v1/auth/register`, {
                email,
                password,
            });

            dispatch({
                type: ActionTypes.CREATE_USER_SUCCESS,
                payload: {
                    user: res.data.user,
                    token: res.data.token,
                },
            });
        }
        catch(error){
            if (axios.isAxiosError(error)) {
                const err = error as AxiosError;
                if (err.response) {
                    dispatch({
                        type: ActionTypes.CREATE_USER_FAILURE,
                        payload: err.response.data as string,
                    });
                } else {
                    // Handle error differently if it's not an AxiosError with a response
                    dispatch({
                        type: ActionTypes.CREATE_USER_FAILURE,
                        payload: "An unexpected error occurred",
                    });
                }
            }
        }

    };
}




// User Login
const userLogin = (email: string, password: string) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({ type: ActionTypes.LOGIN_START });
        try {
            const res = await axios.post(`${url}/api/v1/auth`, {
                email,
                password,
            });
            dispatch({
                type: ActionTypes.LOGIN_SUCCESS,
                payload: {
                    user: res.data.user,
                    token: res.data.token,
                },
            });
        } catch (error) {
            // Check if error is an AxiosError
            if (axios.isAxiosError(error)) {
                const err = error as AxiosError;
                if (err.response) {
                    dispatch({
                        type: ActionTypes.LOGIN_FAILURE,
                        payload: err.response.data as string,
                    });
                } else {
                    // Handle error differently if it's not an AxiosError with a response
                    dispatch({
                        type: ActionTypes.LOGIN_FAILURE,
                        payload: "An unexpected error occurred",
                    });
                }
            }
        }
    };
};


// User Logout
const userLogout = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({ type: ActionTypes.LOGOUT });
        
    };
};


export { userLogin, userLogout, createUser };