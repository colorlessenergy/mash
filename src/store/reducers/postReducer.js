import * as actionTypes from '../actions/actionTypes';


let initState = {
  posts: [],
  error: ''
}

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.RETRIEVE_POSTS_SUCCESS:
      return {
        posts: action.posts,
        error: ''
      }

    case actionTypes.RETRIEVE_POSTS_ERROR:
      return {
        error: action.error
      }

    case actionTypes.RETRIEVE_SINGLE_POST_SUCCESS:
      return {
        post: action.post,
        error: ''
      }
    
    case actionTypes.RETRIEVE_SINGLE_POSTS_ERROR:
      return {
        error: action.error
      }

    case actionTypes.UPDATE_SINGLE_POST_SUCCESS:
      return state;

    case actionTypes.UPDATE_SINGLE_POST_ERROR:
      return {
        error: action.error
      }
  
    default:
      return state;
  }
} 

export default postReducer;