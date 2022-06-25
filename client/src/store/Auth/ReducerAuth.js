const { SET_AUTHORIZATION, SET_BEAT } = require('../types');

const initialState = {
  auth: {},
};

export const authorizeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHORIZATION:
      return {
        auth: action.payload,
      };
    case SET_BEAT:
      return { ...state, beat: action.payload };
    default:
      return state;
  }
};
