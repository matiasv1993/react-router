import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchUsers, saveInputValue } from '../../store'
import filterUsers from '../../filterUsers'
import styles from './users.module.css'

class Users extends Component {
  render() {
    return (
      <div className={styles.container}>
        <button onClick={this.props.fetchUsers}>
          Fetch Users
        </button>
        <input
          defaultValue={this.props.inputValue}
          placeholder={'Search user'}
          onChange={(e) => {
            this.props.saveInputValue(e.target.value)
          }}
        />
        {this.props.isFetching ? <div>loading</div> : null}
        {this.props.error
          ? (
            <div className={styles.error}>
              {this.props.error.message}
            </div>
          ) : null}
        <div>
          {this.props.users.map(user => {
            return (
              <div
                className={styles.user}
                key={user.id}
              >
                {user.name}
              </div>
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