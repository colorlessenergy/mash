import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPostsAction } from '../../store/actions/postAction';

export class Home extends Component {
  componentDidMount () {
    this.props.getAllPosts();
  }

  render() {
    let posts = this.props.posts ? this.props.posts.map(function (post) {
      const image = require('../../assets/' + post.character + '.png')
      return (
        <div key={post._id}>
          <Link to={'/post/' + post._id}>
            <img width="100px" height="100px;" src={image} alt={post.title} />
          </Link>
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
