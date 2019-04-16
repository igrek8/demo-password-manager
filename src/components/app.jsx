import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignUpPage from './sign-up-page';

const App = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path='/sign-up' component={SignUpPage} />
      </Switch>
    </React.Fragment>
  );
};

export default App;
