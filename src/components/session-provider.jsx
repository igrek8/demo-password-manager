import React, { useState, useReducer, useMemo, useCallback } from 'react';
import SessionContext from './session-context';
import SessionReducer from './session-reducer';
import { DESTROY_SESSION } from './session-reducer-actions';

const sessionKey = 'session';

const getEncryptedSession = () => {
  return localStorage.getItem(sessionKey);
};

const SessionProvider = ({ children }) => {
  const [encryptedSession, setEncryptedSession] = useState(getEncryptedSession);
  const [decryptedSession, dispatchDecryptedSession] = useReducer(
    SessionReducer,
    null,
  );
  const destroySession = useCallback(() => {
    localStorage.removeItem(sessionKey);
    setEncryptedSession(null);
    dispatchDecryptedSession({ type: DESTROY_SESSION });
  }, []);
  const persistEncryptedSession = useCallback((newEncryptedSession) => {
    localStorage.setItem(sessionKey, newEncryptedSession);
    setEncryptedSession(newEncryptedSession);
  }, []);
  const value = useMemo(() => {
    return {
      encryptedSession,
      decryptedSession,
      setEncryptedSession: persistEncryptedSession,
      dispatchDecryptedSession,
      destroySession,
    };
  }, [
    encryptedSession,
    decryptedSession,
    persistEncryptedSession,
    dispatchDecryptedSession,
    destroySession,
  ]);
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

export default SessionProvider;
