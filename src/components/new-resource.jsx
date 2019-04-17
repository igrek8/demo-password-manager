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
import encryptResource from '../utils/encrypt-resource';
import useRouter from '../hooks/use-router';

const initialValues = {
  id: null,
  name: '',
  records: [
    {
      name: '',
      data: '',
    },
  ],
};

const NewResource = (props) => {
  const { history } = useRouter();
  const { decryptedSession, persistSession } = useContext(SessionContext);
  const onSubmit = useCallback(
    (resource) => {
      const secret = promptForPasswordHash();
      if (secret === null) {
        return { [FORM_ERROR]: 'Invalid password' };
      }
      const id = v4();
      const newResource = encryptResource(secret, { ...resource, id });
      const action = { type: ADD_RESOURCE, payload: newResource };
      const nextDecryptedSession = sessionReducer(decryptedSession, action);
      const dataString = JSON.stringify(nextDecryptedSession);
      const encryptedSession = encryptData(secret, dataString);
      persistSession(encryptedSession, nextDecryptedSession);
      history.push(`/resources/${id}`);
      return newResource;
    },
    [decryptedSession, history, persistSession],
  );
  return (
    <Form
      {...props}
      initialValues={initialValues}
      onSubmit={onSubmit}
      mutators={arrayMutators}
      component={ResourceForm}
    />
  );
};

export default NewResource;
