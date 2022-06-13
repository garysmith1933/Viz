const { SET_AUTHORIZATION } = require('../types');

const initialState = {
  auth: {},
};

export const authorizeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHORIZATION:
      return {
        auth: action.payload,
      };
    default:
      return state;
  }
};
