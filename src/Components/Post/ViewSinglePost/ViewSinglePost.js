import React, { Component } from 'react'

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getSinglePostAction } from '../../../store/actions/postAction';

class ViewSinglePost extends Component {
  componentDidMount () {
    const idOfPost = this.props.match.params.id;

    this.props.getSinglePost(idOfPost);
  }

  render() {
    let LinkToBeAbleToEdit;

    if (localStorage.getItem('token')) {
      LinkToBeAbleToEdit = (
        <Link to={'/post/edit/' + this.props.match.params.id}> edit this page! </Link>
      )
    }

    const Post = this.props.post ? (
      <div>
        <h1>
          {this.props.post.title}
        </h1>
        <p>
          {this.props.post.content}
        </p>
      </div>
    ) : (<p> loading </p>);

    return (
      <div>
        { LinkToBeAbleToEdit }
        { Post }

        {this.props.error ? (
          <p>
            {this.props.error}
          </p>
        ) : (null)}
      </div>
    );
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
