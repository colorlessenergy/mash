import * as actionTypes from'./actionTypes';
const config = require('../../config/config');

export const loginUserAction = (credentials) => {
  return (dispatch, getState) => {
    fetch(config.BACKEND_URL + '/auth', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(credentials)
    })
    .then(response => {
      if (!response.ok) {
        return dispatch({ type: actionTypes.LOGIN_ERROR, error: 'Email or Password incorrect' });
      }
      
      return response
        .json()
        .then(token => {
          localStorage.setItem('token', token.token);
          dispatch({ type: actionTypes.LOGIN_SUCCESS });
      });
    })
    .catch(err => dispatch({type: actionTypes.LOGIN_ERROR, error: err}));
  }
}

/**
 * this will be used when a user tries to make a request and a error.status 403 is returned
 */

export const unauthorizedUser = () => {
  localStorage.removeItem('token');
}