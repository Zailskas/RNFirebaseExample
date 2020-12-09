export const isLoggedINReducer = (state = {isLoggedIn: false}, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      console.log('Reducer: ' + action.payload);
      const newState = {
        isLoggedIn: action.payload,
      };
      return newState;
    default:
      return state;
  }
};

const initialState = {
  token: null,
  userID: null,
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      console.log('AuthReducer userID' + action.payload.userID);
      return {
        token: action.payload.token,
        userID: action.payload.userID,
      };
    case 'SIGN_UP':
      return {
        token: action.payload.token,
        userID: action.payload.userID,
      };
    default:
      return state;
  }
};
