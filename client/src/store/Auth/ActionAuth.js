import axios from 'axios';
import { SET_AUTHORIZATION } from '../types';

const TOKEN = 'token';

const SET_AUTH = 'SET_AUTH';

export const setAuth = (auth) => ({ type: SET_AUTH, auth });

const _signIn_signUp = (payload) => {
  return {
    type: SET_AUTHORIZATION,
    payload,
  };
};

export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token,
      },
    });
  }
};

export function authenticate(username, password, method, email) {
  return async (dispatch) => {
    try {
      let res;
      if (arguments.length === 3) {
        res = await axios.post(`/auth/${method}`, { username, password });
      } else {
        res = await axios.post(`/auth/${method}`, {
          username,
          password,
          email,
        });
      }
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };
}

export const logout = () => async (dispatch) => {
  const res = await axios.get('/auth/logout', {
    withCredentials: true,
  });

  window.localStorage.removeItem(TOKEN);

  dispatch(setAuth({}));
};

export const signIn_signUp = (payload) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/auth', payload);

      console.log('this is from actions ' + JSON.stringify(data, null, 2));
      dispatch(_signIn_signUp(data));
      return data;
    } catch (error) {
      console.log('dispatch error ' + error);
    }
  };
};

export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}