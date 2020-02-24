import React, { Component } from 'react'

import {connect} from 'react-redux';
import { loginUserAction } from '../../store/actions/authAction';

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
      this.props.loginUser(this.state);

      this.setState({
        missingInformationError: ''
      });
    }

  }

  handleChange = (ev) => {
    this.setState({
      [ev.target.id]: ev.target.value
    });
  }

  render() {
    return (
      <div>
        <h1>
          Login
        </h1>

        <form
          onSubmit={this.handleSubmit}>

          <div>
            <label htmlFor="email">
              email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={this.handleChange}
              value={this.state.email}/>
          </div>

          <div>
            <label
              htmlFor="password">
              password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password} />
          </div>

          <button>
            submit
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
    loginUser: (credentials) => {
      dispatch(loginUserAction(credentials));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
