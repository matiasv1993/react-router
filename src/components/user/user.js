import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUsers, saveInputValue } from '../../store'
import getUser from '../../getUser'
import styles from './user.module.css'

class User extends Component {
  componentDidMount() {
    this.props.fetchUsers()
  }

  handleBackClick(history) {
    history.goBack()
  }

  render() {
    const { user, history } = this.props
    console.log('history: ', this.props)
    return (
      <>
        { history.length > 1 && <div onClick={() => this.handleBackClick(history)}>Go back</div> }
        <h1>User: { user && user.name }</h1>
        {
          this.props.isFetching
            ? (<div>loading</div>)
            : (
                user && (<div>
                  <p>ID: { user.id }</p>
                  <p>EMAIL: { user.email }</p>
                  <p>PHONE: { user.phone }</p>
                  <p>WEBSITE: { user.website }</p>
                </div>)
              )
        }
        {this.props.error
          && (
            <div className={styles.error}>
              {this.props.error.message}
            </div>
          )}
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    error: state.error,
    isFetching: state.isFetching,
    user: getUser(state, ownProps.match.params.id)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    saveInputValue: (text) => dispatch(saveInputValue(text))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)