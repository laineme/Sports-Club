import { combineReducers } from 'redux';
import {
  RECEIVE_TOKEN,
  DELETE_TOKEN,
  ERROR_TOKEN,
  RECEIVE_ADD_USER,
  RECEIVE_USER,
  RECEIVE_USERS,
} from './actions';

const initialState = {
  isFetching: false,
  lastUpdated: 0,
  currentUser: undefined,
  users: undefined,
};

/** State updates */
const reducers = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_TOKEN:
      return {
        ...state,
        isFetching: false,
        token: action.token,
        currentUser: action.user,
        lastUpdated: action.receivedAt,
        error: undefined,
      };
    case DELETE_TOKEN:
      return {
        ...state,
        isFetching: false,
        token: undefined,
        currentUser: undefined,
        lastUpdated: action.receivedAt,
        error: undefined,
      };
    case ERROR_TOKEN:
      return {
        ...state,
        isFetching: false,
        lastUpdated: action.receivedAt,
        error: action.error,
      };
    case RECEIVE_ADD_USER:
      return {
        ...state,
        isFetching: false,
        lastUpdated: action.receivedAt,
      };
    case RECEIVE_USER:
      return {
        ...state,
        isFetching: false,
        lastUpdated: action.receivedAt,
        currentUser: action.user,
      };
    case RECEIVE_USERS:
      return {
        ...state,
        isFetching: false,
        lastUpdated: action.receivedAt,
        users: action.users,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  reducers,
});

export default rootReducer;
