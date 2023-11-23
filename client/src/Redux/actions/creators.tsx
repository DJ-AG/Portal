import { Dispatch } from "redux";
import axios from "axios";
import ActionTypes from "./types";
import Cookies from "universal-cookie";
import  AxiosRetry  from "axios-retry";

AxiosRetry(axios, { retries: 5, retryDelay: AxiosRetry.exponentialDelay});

const url = `http://localhost:5000`;

// Define the User interface
export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  roleLevel: string;
  availabilities: any[];
  reservations: any[];
  createdAt: string;
  updatedAt: string;
}

// Define the action interface for user-related actions
interface UserAction<Type, Payload> { type: Type; payload?: Payload;}

// Define credentials interface
interface RegisterUser {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
}

const cookies = new Cookies();

// Save the token as a cookie.

let token: string = "";

export const setToken = (newToken: string) => token = newToken;

export const config = () => { return { headers: { Authorization: `Bearer ${token}` }}};



export const getAllUsers = () => {

  return async (dispatch: Dispatch<UserAction<ActionTypes, User[]>>) => {

    dispatch({ type: ActionTypes.GET_ALL_USERS_BEGINS });

    try {
      // Make an API call to fetch all user data from your backend
      const response = await axios.get(`${url}/api/users`, config());

      const userData = response.data;
      
      dispatch({type: ActionTypes.GET_ALL_USERS_SUCCESS,payload: userData,});

    } catch (error) {dispatch({type: ActionTypes.GET_ALL_USERS_FAILURE,payload: error as any})}

  };
};


export const loginUser = (credentials: { email: string; password: string }) => {

  return async (dispatch: Dispatch<UserAction<ActionTypes, any>>) => {

    dispatch({ type: ActionTypes.LOGIN_USER_BEGINS });

    try {
      
      const response = await axios.post(`${url}/api/auth/login`, credentials);

      const userData = response.data;

      token = userData.token;

      cookies.set("PortalToken", token, { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),path: "/",});
      
      dispatch({type: ActionTypes.LOGIN_USER_SUCCESS,payload: userData,});

    } catch (error) {dispatch({type: ActionTypes.LOGIN_USER_FAILURE,payload: error as any,})}

  };
};


export const logoutUser = () => {

  return async (dispatch: Dispatch<UserAction<ActionTypes, any>>) => {

    dispatch({ type: ActionTypes.LOGOUT_USER_BEGINS });

    try {

      const response = await axios.get(`${url}/api/auth/logout`,config());

      const userData = response.data;

      cookies.remove("PortalToken");

      dispatch({type: ActionTypes.LOGOUT_USER_SUCCESS,payload: userData});

    } catch (error) { dispatch({type: ActionTypes.LOGOUT_USER_FAILURE,payload: error,})}

  };
};

export const getMe = () => {
  
  return async (dispatch: Dispatch<UserAction<ActionTypes, any>>) => {

    dispatch({ type: ActionTypes.GET_USER_BEGINS });

    try {

      const response = await axios.get(`${url}/api/auth/getMe`,config());

      const userData = response.data;     

      dispatch({type: ActionTypes.GET_USER_SUCCESS,payload: userData,});
      
      return userData;
    
    } catch (error:any) { dispatch({type: ActionTypes.GET_USER_FAILURE,payload: error.response.statusText,})}
  };
};



export const registerUser = (credentials: RegisterUser) => {

  return async (dispatch: Dispatch<UserAction<ActionTypes, any>>) => {
    
    dispatch({ type: ActionTypes.CREATE_USER_BEGINS });

    try {

      const response = await axios.post(`${url}/api/auth/register`,credentials);

      const userData = response.data;

      dispatch({type: ActionTypes.CREATE_USER_SUCCESS,payload: userData,});

    } catch (error:any) {console.log(error.response.data.error)

      dispatch({type: ActionTypes.CREATE_USER_FAILURE,payload: error,});
    }
  };
};