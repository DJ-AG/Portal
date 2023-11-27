import { initialState, initialStateProps } from "./initialState";
import ActionTypes from "../actions/types";

// Define the action interface for user-related actions
interface UserAction {
  type: ActionTypes;
  payload?: any;
}

// Main reducer
const userReducer = (
  state: initialStateProps = initialState,
  action: UserAction
): initialStateProps => {
  switch (action.type) {
    case ActionTypes.LOGIN_USER_BEGINS:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case ActionTypes.LOGIN_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        alertType: "danger",
        alertText: action.payload.message,
      };

    case ActionTypes.GET_ALL_USERS_BEGINS:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case ActionTypes.GET_ALL_USERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        alertType: "danger",
        alertText: action.payload.message,
      };
      case ActionTypes.GET_USER_BY_ID_BEGINS:
        return {
          ...state,
          isLoading: true,
        };
      case ActionTypes.GET_USER_BY_ID_SUCCESS:
        return {
          ...state,
          currentUser: action.payload,
          isLoading: false,
        };
      case ActionTypes.GET_USER_BY_ID_FAILURE:
        return {
          ...state,
          isLoading: false,
          alertType: "danger",
          alertText: action.payload.message,
        };
    case ActionTypes.CREATE_USER_BEGINS:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.CREATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        alertType: "success",
        alertText: action.payload.message,
      };
    case ActionTypes.CREATE_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        alertType: "danger",
        alertText: action.payload.message,
      };
    case ActionTypes.LOGOUT_USER_BEGINS:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.LOGOUT_USER_SUCCESS:
      return {
        ...initialState,
      };
    case ActionTypes.LOGOUT_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        alertType: "danger",
        alertText: action.payload.message,
      };

    case ActionTypes.GET_USER_BEGINS:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        isLoading: false,
      };
    case ActionTypes.GET_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        alertType: "danger",
        alertText: action.payload,
      };

    case ActionTypes.VERTIFY_SSO_BEGINS:
      return {
        ...state,
        isLoading: true,
      };

    case ActionTypes.VERTIFY_SSO_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        isLoading: false,
      };
    case ActionTypes.VERTIFY_SSO_FAILURE:
      return {
        ...state,
        isLoading: false,
        alertType: "danger",
        alertText: action.payload,
      };
      
    default:
      return state;
  }
};

export default userReducer;