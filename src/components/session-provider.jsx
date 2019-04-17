import React, { useState, useMemo, useCallback } from 'react';
import SessionContext from './session-context';

const sessionKey = 'session';

const getEncryptedSession = () => {
  return localStorage.getItem(sessionKey);
};

const SessionProvider = ({ children }) => {
  const [encryptedSession, setEncryptedSession] = useState(getEncryptedSession);
  const [decryptedSession, updateSession] = useState(null);
  const destroySession = useCallback(() => {
    localStorage.removeItem(sessionKey);
    setEncryptedSession(null);
    updateSession(null);
  }, []);
  const persistSession = useCallback(
    (nextEncryptedSession, nextDecryptedSession) => {
      localStorage.setItem(sessionKey, nextEncryptedSession);
      setEncryptedSession(nextEncryptedSession);
      updateSession(nextDecryptedSession);
    },
    [updateSession, setEncryptedSession],
  );
  const value = useMemo(() => {
    return {
      encryptedSession,
      decryptedSession,
      persistSession,
      destroySession,
      updateSession,
    };
  }, [
    encryptedSession,
    decryptedSession,
    persistSession,
    destroySession,
    updateSession,
  ]);
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

export default SessionProvider;
