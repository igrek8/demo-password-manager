import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import SignUpPage from './sign-up-page';
import Dashboard from './dashboard';
import SessionContext from './session-context';

const styles = (theme) => ({
  '@global': {
    input: {
      ...theme.typography.body1,
      padding: theme.spacing.unit,
      width: '100%',
      borderWidth: 1,
      borderColor: '#ccc',
      borderStyle: 'solid',
    },
    label: {
      fontWeight: 'bold',
    },
    legend: {
      padding: 0,
      ...theme.typography.title,
    },
    fieldset: {
      margin: 0,
      borderWidth: 1,
      borderColor: '#ccc',
      borderStyle: 'solid',
      padding: theme.spacing.unit * 3,
    },
    button: {
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#da9e39',
      fontWeight: 500,
      background: 'moccasin',
      padding: theme.spacing.unit,
    },
  },
});

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

export default withStyles(styles)(App);
