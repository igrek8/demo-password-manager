import React, { useState, useMemo, useCallback } from 'react';
import SessionContext from './session-context';

const sessionKey = 'session';

const getEncryptedSession = () => {
  return localStorage.getItem(sessionKey);
};

const SessionProvider = ({ children }) => {
  const [encryptedSession, setEncryptedSession] = useState(getEncryptedSession);
  const [decryptedSession, setDecryptedSession] = useState(null);
  const destroySession = useCallback(() => {
    localStorage.removeItem(sessionKey);
    setEncryptedSession(null);
    setDecryptedSession(null);
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
      setDecryptedSession,
      destroySession,
    };
  }, [
    encryptedSession,
    decryptedSession,
    persistEncryptedSession,
    setDecryptedSession,
    destroySession,
  ]);
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

export default SessionProvider;
