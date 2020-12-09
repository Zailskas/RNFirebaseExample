export const signup = (email, password, callback) => {
  return async (dispatch) => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDpoiH_hk2Ca78vyxWPGijd0gZWcTk180U',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      },
    );
    if (!response.ok) {
      const errorResData = await response.json();
      const errorID = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorID === 'EMAIL_EXISTS') {
        message = 'This email exists already!';
        console.log(message);
        dispatch({
          type: 'ERROR_MESSAGE',
          payload: {errorMessage: message, messageState: true},
        });
      }
    } else {
      const resData = await response.json();
      console.log(resData);
      dispatch({
        type: 'ERROR_MESSAGE',
        payload: {errorMessage: null, messageState: false},
      });
      dispatch({
        type: 'SIGN_UP',
        payload: {token: resData.idToken, userID: resData.localID},
      });
    }
    callback();
  };
};

export const signin = (email, password, callback) => {
  return async (dispatch) => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDpoiH_hk2Ca78vyxWPGijd0gZWcTk180U',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      },
    );
    const resData = await response.json();
    console.log(resData);
    if (resData.registered === true) {
      dispatch({type: 'LOGIN_SUCCESS', payload: true});
      dispatch({
        type: 'SIGN_IN',
        payload: {token: resData.idToken, userID: resData.localId},
      });
    } else {
      dispatch({type: 'LOGIN_SUCCESS', payload: false});
    }
    callback();
  };
};
