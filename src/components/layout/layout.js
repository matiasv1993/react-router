import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { userLogout } from '../../store'
import styles from './layout.module.css'

class Layout extends Component {
  render() {
    console.log('isAuth: ', this.props.isAuth)
    return (
      <div className={styles.container}>
        {
          this.props.isAuth
            ? (<div className={styles.navbar}>
                <NavLink
                  className={styles.navItem}
                  activeClassName={styles.active}
                  to={'/index'}
                >
                  Counter
                </NavLink>
                <NavLink
                  className={styles.navItem}
                  activeClassName={styles.active}
                  to={'/users'}
                >
                  Users
                </NavLink>
                <div
                  className={styles.navItem}
                  onClick={this.props.userLogout}
                >
                  Logout
                </div>
              </div>)
            : (<div className={styles.navbar}>
              <NavLink
                className={styles.navItem}
                activeClassName={styles.active}
                to={'/login'}
              >
                Login
              </NavLink>
            </div>)
        }
        <div className={styles.main}>
          { this.props.children }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userLogout: () => dispatch(userLogout()),
  }
}

export default connect(null, mapDispatchToProps)(Layout);