const AUTH_REDUCER_ACTION = {
  LOGIN: 'LOGIN',
};
const authReducer = (action, state) => {
  switch (action.type) {
    case AUTH_REDUCER_ACTION.LOGIN: {
      return {
        ...state,
        auth: {
          ...action.payload,
        },
      };
    }
    default:
      return state;
  }
};
export { AUTH_REDUCER_ACTION };
export default authReducer;
