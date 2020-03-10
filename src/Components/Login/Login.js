import React, { Component } from 'react'

import {connect} from 'react-redux';
import { loginUserAction } from '../../store/actions/authAction';

import classes from './Login.module.css';

export class Login extends Component {
  state = {
    email: '',
    password: '',
    missingInformationError: ''
  }

  handleSubmit = (ev) => {
    ev.preventDefault();

    let errorMessage = '';

    if (!this.state.email.length) {
      errorMessage += 'Missing Email';
    }

    if (!this.state.password.length) {
      errorMessage += 'Missing Password';
    }

    if (errorMessage) {
      this.setState({
        missingInformationError: errorMessage
      });
    } else {
      let history = this.props.history;

      this.props.loginUser(this.state, history);

      this.setState({
        missingInformationError: ''
      });
    }

  }

  handleChange = (ev) => {
    this.setState({
      [ev.target.id]: ev.target.value
    });

    console.log(this.props)
  }

  render() {
    return (
      <div>
        <h1>
          Login
        </h1>

        <form
          onSubmit={this.handleSubmit}>

          <div className={classes['form__group']}>
            <label 
              className={classes['form__label']}
              htmlFor="email">
              email
            </label>
            <input
              className={classes['form__input']}
              type="email"
              id="email"
              name="email"
              placeholder='email'
              onChange={this.handleChange}
              value={this.state.email}/>
          </div>

          <div className={classes['form__group']}>
            <label
              className={classes['form__label']}
              htmlFor="password">
              password
            </label>
            <input
              className={classes['form__input']}
              type="password"
              id="password"
              name="password"
              placeholder='password'
              onChange={this.handleChange}
              value={this.state.password} />
          </div>

          <button
            className={classes['form__button']}>
            login
          </button>

          { this.state.missingInformationError ? (
            <p>
              {this.state.missingInformationError}
            </p>
          ) : (
              null
          )}

          {/* user information is incorrect error retrieve from backend */}
          { this.props.authError ? (
            <p>
              { this.props.authError }
            </p>
          ) : (
            null
          )}
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (credentials, history) => {
      dispatch(loginUserAction(credentials, history));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
