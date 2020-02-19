import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getPostsAction } from '../../store/actions/postAction';

export class Home extends Component {
  componentDidMount () {
    this.props.getAllPosts();
  }

  render() {
    let posts = this.props.posts ? this.props.posts.map(function (post) {
      return (
        <div key={post._id}>
          <h3>
            { post.title }
          </h3>
          <p>
            { post.content }
          </p>
        </div>
      )
    }) : (<p>loading</p>)

    return (
      <div>
        { posts }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts,
    error: state.posts.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllPosts: () => {
      return dispatch(getPostsAction());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
