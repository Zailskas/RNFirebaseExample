const initialState = {
  errorMessage: null,
  messageState: false,
};
export const messageErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ERROR_MESSAGE':
      console.log('State: ' + action.payload.messageState);
      return {
        errorMessage: action.payload.errorMessage,
        messageState: action.payload.messageState,
      };
    default:
      return state;
  }
};
