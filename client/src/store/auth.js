import axios from "axios";

const TOKEN = "token";


const SET_AUTH = "SET_AUTH";

export const setAuth = (auth) => ({ type: SET_AUTH, auth });

export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get("/auth/me", {
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

export const logout = () => async(dispatch) => {

  const res = await axios.get("/auth/logout", {
    withCredentials: true
  });
  
  window.localStorage.removeItem(TOKEN);

  dispatch(setAuth({}));
};







export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
