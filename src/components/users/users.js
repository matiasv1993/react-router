import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchUsers, saveInputValue } from '../../store'
import filterUsers from '../../filterUsers'
import styles from './users.module.css'

class Users extends Component {
  componentDidMount() {
    // fetch users when mount component
    this.props.fetchUsers()

    // save name to filter in redux from query params
    const params = new URLSearchParams(this.props.location.search)
    const nameParam = params.get('name')
    nameParam && this.props.saveInputValue(nameParam)
  }

  render() {
    return (
      <div className={styles.container}>
        <h1>Users</h1>
        <input
          defaultValue={this.props.inputValue}
          placeholder={'Search user'}
          onChange={(e) => {
            this.props.saveInputValue(e.target.value)
          }}
        />
        {this.props.isFetching && <div>loading</div>}
        {this.props.error
          && (
            <div className={styles.error}>
              {this.props.error.message}
            </div>
          )}
        <div className={styles.userList}>
          {this.props.users.map(user => {
            return (
              <Link
                className={styles.user}
                key={user.id}
                to={`user/${user.id}`}
              >
                {user.name}
              </Link>
            )
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.error,
    isFetching: state.isFetching,
    users: filterUsers(state),
    inputValue: state.inputValue,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    saveInputValue: (text) => dispatch(saveInputValue(text))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);