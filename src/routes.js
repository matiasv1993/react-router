import React from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import Father from './components/father/father';
import Users from './components/users/users';
import User from './components/user/user';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/index' component={Father} />
        <Route exact path='/users' component={Users} />
        <Route path='/user/:id' component={User} />
        <Redirect from='/' to='/index' />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
