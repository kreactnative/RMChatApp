import api from '../services';
import type { Action } from './types';

export const LOGIN_ATTEMPT = 'LOGIN_ATTEMPT';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';


export function loginAttemp(payload): Action {
  return {
    type: LOGIN_ATTEMPT,
    payload
  };
};

export function loginSuccess(payload): Action {
  return {
    type: LOGIN_SUCCESS,
    payload
  };
};

export function loginFailed(payload): Action {
  return {
    type: LOGIN_FAILED,
    payload
  }
};

export function tryLogin(payload) {
  console.log(payload);
  return function (dispatch, getState) {
    dispatch(loginAttemp(payload));
    api.login(payload).then((res) => {
      console.log(res);
      if (res.ok) {
        dispatch(loginSuccess(res.data));
      } else {
        dispatch(loginFailed(res.data));
      }
    }).catch((err) => {
      console.log(err);
      dispatch({type: "NETWORK_ERROR", payload:{msg:"Network Error"}});
    });
  };
};

export function tryRegister(payload) {
  return function (dispatch, getState) {
    dispatch(loginAttemp(payload));
    api.login(payload).then((res) => {
      if (res.ok) {
        dispatch(loginSuccess(res.data));
      } else {
        dispatch(loginFailed(res.data));
      }
    }).catch((err) => {
      dispatch({type: "NETWORK_ERROR", payload:{msg:"Network Error"}});
    });
  };
}
