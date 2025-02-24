import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/" exact component={Login} />
      </Switch>
    </Router>
  );
};

export default App;