import React, {Component} from 'react'

import { connect } from 'react-redux';

import { logoutUserAction } from '../store/actions/authAction';

import { Link, withRouter } from 'react-router-dom';

class Layout extends Component {
  render () {
    return (
      <div>
        <nav>
          <h1>
            <Link to='/'>
              mash
            </Link>
          </h1>

          { localStorage.token ? (
            <p onClick={this.logoutUser}>
              logout
            </p>
          ) : (null)}
        </nav>
        {this.props.children}
      </div>
    )
  }

  logoutUser = () => {
    this.props.logoutUser();
    localStorage.removeItem('token');
    this.props.history.push('/');
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: function () {
      dispatch(logoutUserAction());
    }
  }
}


export default connect(null, mapDispatchToProps)(withRouter(Layout));