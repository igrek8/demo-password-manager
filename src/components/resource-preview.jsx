import React, { useContext, useCallback } from 'react';
import { Form } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import arrayMutators from 'final-form-arrays';
import v4 from 'uuid/v4';
import SessionContext from './session-context';
import ResourceForm from './resource-form';
import { encryptData } from '../utils/cipher';
import sessionReducer from './session-reducer';
import { ADD_RESOURCE } from './resources-actions';
import promptForPasswordHash from '../utils/prompt-for-password-hash';

const encryptRecords = (secret, records) => {
  return records.map((record) => {
    return {
      ...record,
      data: encryptData(secret, record.data),
    };
  });
};

const ResourcePreview = (props) => {
  const { decryptedSession, persistSession } = useContext(SessionContext);
  const onSubmit = useCallback(
    (values) => {
      const secret = promptForPasswordHash();
      if (secret === null) {
        return { [FORM_ERROR]: 'Invalid password' };
      }
      const records = encryptRecords(secret, values.records);
      const resource = { id: v4(), records };
      const action = { type: ADD_RESOURCE, payload: resource };
      const nextDecryptedSession = sessionReducer(decryptedSession, action);
      const dataString = JSON.stringify(nextDecryptedSession);
      const encryptedSession = encryptData(secret, dataString);
      persistSession(encryptedSession, nextDecryptedSession);
      return resource;
    },
    [decryptedSession, persistSession],
  );
  return (
    <Form
      {...props}
      onSubmit={onSubmit}
      mutators={arrayMutators}
      component={ResourceForm}
    />
  );
};

export default ResourcePreview;
