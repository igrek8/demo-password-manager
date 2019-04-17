import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignUpPage from './sign-up-page';
import Dashboard from './dashboard';
import SessionContext from './session-context';

const App = () => {
  const { decryptedSession: session } = useContext(SessionContext);
  return (
    <React.Fragment>
      {session ? (
        <Route path='/' component={Dashboard} />
      ) : (
        <Switch>
          <Route exact path='/sign-up' component={SignUpPage} />
          <Redirect to='/sign-up' />
        </Switch>
      )}
    </React.Fragment>
  );
};

export default App;
