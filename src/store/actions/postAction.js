import * as actionTypes from './actionTypes';
const config = require('../../config/config');


export const getPostsAction = () => {
  return (dispatch, getState) => {
    fetch(config.BACKEND_URL + '/posts')
      .then(res => res.json())
      .then(function (posts) {
        dispatch({ type: actionTypes.RETRIEVE_POSTS_SUCCESS, posts: posts });
      })
      .catch(err => dispatch({ type: actionTypes.RETRIEVE_POSTS_ERROR, error: err }));
  }
}