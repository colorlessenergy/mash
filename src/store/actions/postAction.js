import * as actionTypes from './actionTypes';
import { unauthorizedUser } from './authAction';

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

export const getSinglePostAction = (id) => {
  return (dispatch, getState) => {
    fetch(config.BACKEND_URL + '/posts/'+ id)
      .then(res => res.json())
      .then(function (post) {
        dispatch({ type: actionTypes.RETRIEVE_SINGLE_POST_SUCCESS, post: post})
      })
      .catch(err => dispatch({ type: actionTypes.RETRIEVE_POSTS_ERROR, error: err }));      ;
  }
}

export const updateSinglePostAction = (id, content, history) => {
  return (dispatch, getState) => {
    fetch(config.BACKEND_URL + '/posts/' + id, {
      headers: { 'Content-Type': 'application/json', 'authorization': localStorage.getItem('token') },
      method: 'PUT',
      body: JSON.stringify(content)
    })
    .then(function (res) {
      if (res.status === 403) {
        unauthorizedUser();
        history.push('/');

        return dispatch({ type: actionTypes.UNAUTHORIZED_USER })
      }

      history.push('/post/' + id);
      dispatch({ type: actionTypes.UPDATE_SINGLE_POST_SUCCESS })
    })
    .catch(err => dispatch({ type: actionTypes.UPDATE_SINGLE_POST_ERROR, error: err }))
  }
}