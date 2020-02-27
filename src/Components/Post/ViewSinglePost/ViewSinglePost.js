import React, { Component } from 'react'

import { connect } from 'react-redux';

import { getSinglePostAction } from '../../../store/actions/postAction';

class ViewSinglePost extends Component {
  componentDidMount () {
    const idOfPost = this.props.match.params.id;

    this.props.getSinglePost(idOfPost);
  }

  render() {

    const post = this.props.post ? (
      <div>
        <h1>
          {this.props.post.title}
        </h1>
        <p>
          {this.props.post.content}
        </p>
      </div>
    ) : (<p> loading </p>);

    return post;
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.posts.post,
    error: state.posts.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSinglePost: (id) => {
      return dispatch(getSinglePostAction(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewSinglePost);
