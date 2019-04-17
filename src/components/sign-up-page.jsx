import React, { useCallback, useContext } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { FORM_ERROR } from 'final-form';
import { Form } from 'react-final-form';
import SignUpForm from './sign-up-form';
import SessionContext from './session-context';
import { encryptData, decryptDataSafe, INVALID_DATA } from '../utils/cipher';
import { createHash } from '../utils/password-manager';
import sessionReducer from './session-reducer';
import { INIT_SESSION } from './session-actions';

const styles = (theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    ...theme.typography.body1,
  },
  content: {
    width: 300,
    margin: 'auto',
  },
});

const initialValues = {
  password: '',
};

const getCheckValue = () =>
  Math.random()
    .toString()
    .substr(2, 4);

const confirmDestroy = () => {
  const checkValue = getCheckValue();
  // eslint-disable-next-line no-alert
  const value = prompt(`Enter ${checkValue} if you want to erase all data`);
  if (value === null) {
    // eslint-disable-next-line no-alert
    alert('Failed to destroy session');
    return false;
  }
  return `${value}`.trim().toLowerCase() === checkValue;
};

const SignUpPage = ({ classes }) => {
  const session = useContext(SessionContext);
  const onFormSubmit = useCallback(
    ({ password }, { reset }) => {
      const secret = createHash(password);
      if (session.encryptedSession) {
        const { encryptedSession } = session;
        const data = decryptDataSafe(secret, encryptedSession);
        if (data === INVALID_DATA) {
          return { [FORM_ERROR]: 'Invalid password' };
        }
        const decryptedSession = JSON.parse(data);
        session.updateSession(decryptedSession);
        return null;
      }
      const decryptedSession = sessionReducer(null, { type: INIT_SESSION });
      const newSerializedSession = JSON.stringify(decryptedSession);
      const encryptedSession = encryptData(secret, newSerializedSession);
      session.persistSession(encryptedSession, decryptedSession);
      reset();
      return null;
    },
    [session],
  );
  const onSessionDestoy = useCallback(() => {
    if (confirmDestroy()) {
      session.destroySession();
    }
  }, [session]);
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
            <button type='reset' onClick={onSessionDestoy}>
              Destroy session
            </button>
          )}
        </Form>
      </div>
    </div>
  );
};

export default withStyles(styles)(SignUpPage);
