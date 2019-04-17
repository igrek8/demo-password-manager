import React, { useCallback, useContext } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Form } from 'react-final-form';
import SignUpForm from './sign-up-form';
import SessionContext from './session-context';
import { encryptData } from '../utils/cipher';
import { createHash } from '../utils/password-manager';

const styles = (theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    ...theme.typography.body1,
  },
  content: {
    width: 320,
    margin: 'auto',
  },
});

const SignUpPage = ({ classes }) => {
  const session = useContext(SessionContext);
  const onFormSubmit = useCallback(
    ({ password }, { reset }) => {
      const secret = createHash(password);
      const newSession = {};
      const newSerializedSession = JSON.stringify(newSession);
      const newEncryptedSession = encryptData(secret, newSerializedSession);
      session.setDecryptedSession(newSession);
      session.setEncryptedSession(newEncryptedSession);
      reset();
    },
    [session],
  );
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Form onSubmit={onFormSubmit} component={SignUpForm}>
          {session.encryptedSession && (
            <button type='button' onClick={session.destroySession}>
              Destroy session
            </button>
          )}
        </Form>
      </div>
    </div>
  );
};

export default withStyles(styles)(SignUpPage);
