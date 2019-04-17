import React, { useCallback, useContext } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { FORM_ERROR } from 'final-form';
import { Form } from 'react-final-form';
import SignUpForm from './sign-up-form';
import SessionContext from './session-context';
import { encryptData, decryptDataSafe, INVALID_DATA } from '../utils/cipher';
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

const initialValues = {
  password: '',
};

const SignUpPage = ({ classes }) => {
  const session = useContext(SessionContext);
  const onFormSubmit = useCallback(
    ({ password }, { reset }) => {
      const secret = createHash(password);
      if (session.encryptedSession) {
        const { encryptedSession } = session;
        const decryptedSession = decryptDataSafe(secret, encryptedSession);
        if (decryptedSession === INVALID_DATA) {
          return { [FORM_ERROR]: 'Invalid password' };
        }
        session.setDecryptedSession(decryptedSession);
        return null;
      }
      const newSession = {};
      const newSerializedSession = JSON.stringify(newSession);
      const newEncryptedSession = encryptData(secret, newSerializedSession);
      session.setDecryptedSession(newSession);
      session.setEncryptedSession(newEncryptedSession);
      reset();
      return null;
    },
    [session],
  );
  const { encryptedSession } = session;
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Form
          destroyOnUnregister
          onSubmit={onFormSubmit}
          component={SignUpForm}
          initialValues={initialValues}
          submitButtonText={encryptedSession ? 'Open' : 'Create'}
          title={encryptedSession ? 'Open MasterVault' : 'Create MasterVault'}
        >
          {encryptedSession && (
            <button type='reset' onClick={session.destroySession}>
              Destroy session
            </button>
          )}
        </Form>
      </div>
    </div>
  );
};

export default withStyles(styles)(SignUpPage);
