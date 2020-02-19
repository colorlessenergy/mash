import * as actionTypes from '../actions/actionTypes';


let initState = {
  posts: [],
  error: ''
}

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.RETRIEVE_POSTS_SUCCESS:
      console.log(action)
      return {
        posts: action.posts,
        error: ''
      }

    case actionTypes.RETRIEVE_POSTS_ERROR:
      return {
        error: action.error
      }
  
    default:
      return state;
  }
} 

export default postReducer;