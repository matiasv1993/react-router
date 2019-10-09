import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { userLogin } from '../../../store'
import styles from './login.module.css'

class Login extends Component {
  render() {
    const { userLogin, isAuthenticated } = this.props

    if (isAuthenticated) {
      return (
        <Redirect to={'/'}/>
      )
    }

    return (
      <>
        <h1>Welcome!</h1>
        <form onSubmit={(e) => {
          e.preventDefault()
          console.log('entro al login')
          userLogin(e.target.user.value, e.target.password.value)
        }}>
          <input name='user' type='text' placeholder='User'/>
          <input name='password' type='password' placeholder='Password'/>
            <button type='submit'>LOGIN</button>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth && state.auth.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: (userName, password) => dispatch(userLogin(userName, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)