import * as actionTypes from '../actions/actionTypes';

const initState = {
  authError: ''
}

const authReducer = (state=initState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        authError: null
      }

    case actionTypes.LOGIN_ERROR:
      return {
        ...state,
        authError: action.error
      }

    case actionTypes.LOGOUT_USER_SUCCESS:
      return state;

    default:
      return state;
  }
}

export default authReducer;