import React, { Component } from 'react'

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getSinglePostAction } from '../../../store/actions/postAction';

import renderHTML from 'react-render-html';

import classes from './ViewSinglePost.module.css';

class ViewSinglePost extends Component {
  componentDidMount () {
    const idOfPost = this.props.match.params.id;

    this.props.getSinglePost(idOfPost);
  }

  render() {
    let LinkToBeAbleToEdit;

    if (localStorage.getItem('token')) {
      LinkToBeAbleToEdit = (
        <Link 
          className={classes['link']} 
          to={'/post/edit/' + this.props.match.params.id}> edit this page! </Link>
      )
    }

    let imageSrc;

    if (this.props.post) {
      imageSrc = require('../../../assets/' + this.props.post.character + '.png');
    }

    const Post = this.props.post ? (
      <div className={classes['contain-post']}>
        <header className={classes['header']}>
          <img className={classes['header__image']} src={imageSrc} alt={'image of ' + this.props.post.character} />
          <h1 className={classes['header__title']}>{this.props.post.title}</h1>
        </header>
        <div className={classes['content']}>
          {renderHTML(this.props.post.content)}
        </div>
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
