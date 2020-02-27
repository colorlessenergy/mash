import React, { Component } from 'react'

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { getSinglePostAction } from '../../../../store/actions/postAction';


class EditSinglePost extends Component {
  state = {
    content: '',
    dataFilled: false
  }

  componentDidMount() {
    const idOfPost = this.props.match.params.id;

    this.props.getSinglePost(idOfPost);
  }

  /**
   * fills the form with the user data
   *
   * @param {Object} props - the current props
   * @param {Object} state - the current state
   */

  static getDerivedStateFromProps(props, state) {
    const { post } = props;

    if (post && !state.dataFilled) {
      return {
        content: post.content,
        dataFilled: true
      }
    } else {
      return state;
    }
  }

  handleChange = (ev) => {
    this.setState({ 
      content: ev.target.value
     });
  }

  handleSubmit = (ev) => {
    ev.preventDefault();

    // call dispatch here to edit a post

  }

  render() {
    if (!localStorage.getItem('token')) {
      return <Redirect to='/' />
    }


    return (
      <div>
        <h1>edit post</h1>

        <form onSubmit={this.handleSubmit}>
          <textarea onChange={this.handleChange}
            value={this.state.content} cols='60' rows='20' />

            <button>
              edit
            </button>
        </form>
      </div>
    )
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
    },

    editSinglePost: (updateContent) => {
      // dispatch action to edit a post
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditSinglePost);
