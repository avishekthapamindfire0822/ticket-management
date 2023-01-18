const AUTH_REDUCER_ACTION = {
  LOGIN: 'LOGIN',
};
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_REDUCER_ACTION.LOGIN: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
export { AUTH_REDUCER_ACTION };
export default authReducer;
