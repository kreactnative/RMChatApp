import type { Action } from '../actions/types';
import { LOGIN_ATTEMPT, LOGIN_SUCCESS, LOGIN_FAILED } from '../actions/login';
import {AsyncStorage} from 'react-native';

export type State = {
  isLoggedIn: boolean,
  token: string,
  msg: string,
  attempting: boolean
};

const initialState = {
  isLoggedIn: false,
  user: null,
  isAttempting: false,
  message: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_ATTEMPT:
      return Object.assign({}, state, {isAttempting: true, isLoggedIn: false, msg: null, userinfo: action.payload});
    case LOGIN_SUCCESS:
      console.log(action.payload);
      AsyncStorage.setItem("token", action.payload.results.token);
      return Object.assign({}, state, {isAttempting: false, isLoggedIn: true, user: action.payload.results});
    case LOGIN_FAILED:
      return Object.assign({}, state, {isAttempting: false, isLoggedIn: false, message: action.payload.message});
    default:
      return state;
	}
}
