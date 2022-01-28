import React from 'react';
import { BrowserRouter as Router, Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import Products from 'views/';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Router>
          <Switch>
            <Route path='/' exact component={Products} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </BrowserRouter>
    </>
  );
}

export default App;