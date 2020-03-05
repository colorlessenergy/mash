import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPostsAction } from '../../store/actions/postAction';

export class Home extends Component {
  state = {
    character: '',
    filteredPost: []
  }

  componentDidMount () {
    this.props.getAllPosts();
  }

  /**
   * on initial load put all post in filteredPost and
   * when the input is empty put all post in filteredPost
   * 
   * @param {Object} props - latests props
   * @param {Object} state - latests state
   */

  static getDerivedStateFromProps(props, state) {
    if (state.character === '') {
      return {
        filteredPost: props.posts
      }
    }
    return null;
  }

  /**
   * sort the post by the value of the input
   * 
   * @param {Object} ev.target.value - the current value of the input
   */


  handleChange = (ev) => {
    let filteredPost = this.props.posts.filter((post) => {
      return post.character.toLowerCase().includes(ev.target.value);
    });

    this.setState({
      character: ev.target.value,
      filteredPost: filteredPost
    });
  }

  render() {
    let posts = this.state.filteredPost ? this.state.filteredPost.map(function (post) {
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
        <form>
          <label htmlFor="character"></label>
          <input type="text"
            onChange={this.handleChange}
            id="character"
            placeholder="search for a character"
            value={this.state.character} />
        </form>
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
