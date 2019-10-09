import React from 'react';
import { connect } from 'react-redux'
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import PrivateRoute from './hoc/privateRoute'
import Father from './components/father/father';
import Users from './components/users/users';
import User from './components/user/user';
import Layout from './components/layout/layout';
import Login from './components/auth/login/login';
import NoMatch from './components/noMatch/noMatch';

const App = (props) => {
  return (
    <BrowserRouter>
      <Layout isAuth={props.isAuthenticated}>
        <Switch>
          <Route exact path='/login' component={Login} />
          <PrivateRoute
            path='/users'
            component={Users}
            isAuthenticated={props.isAuthenticated}
          />
          <PrivateRoute
            path='/user/:id'
            component={User}
            isAuthenticated={props.isAuthenticated}
          />
          <PrivateRoute
            path='/index'
            component={Father}
            isAuthenticated={props.isAuthenticated}
          />
          <Redirect from='/' to='/index' />
          <Route component={NoMatch} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth && state.auth.user
  }
}

export default connect(mapStateToProps)(App)