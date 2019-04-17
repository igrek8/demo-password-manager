/* eslint-disable no-alert */
import React, { useState, useContext, useCallback } from 'react';
import { Form } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import arrayMutators from 'final-form-arrays';
import SessionContext from './session-context';
import ResourceForm from './resource-form';
import { encryptData } from '../utils/cipher';
import sessionReducer from './session-reducer';
import { PUT_RESOURCE } from './resources-actions';
import promptForPasswordHash from '../utils/prompt-for-password-hash';
import encryptResource from '../utils/encrypt-resource';
import decryptResource from '../utils/decrypt-resource';

const EditResource = (props) => {
  const { match } = props;
  const { params } = match;
  const { id } = params;
  const { decryptedSession, persistSession } = useContext(SessionContext);
  const [resource, setResource] = useState(() => {
    return decryptedSession.resources.find((r) => r.id === id);
  });
  const [readOnly, setReadOnly] = useState(Boolean(resource));
  const onSubmit = useCallback(
    (values) => {
      const secret = promptForPasswordHash();
      if (secret === null) {
        // eslint-disable-next-line
        alert('Invalid password');
        return { [FORM_ERROR]: 'Invalid password' };
      }
      const updatedResource = encryptResource(secret, values);
      const action = { type: PUT_RESOURCE, payload: updatedResource };
      const nextDecryptedSession = sessionReducer(decryptedSession, action);
      const dataString = JSON.stringify(nextDecryptedSession);
      const encryptedSession = encryptData(secret, dataString);
      persistSession(encryptedSession, nextDecryptedSession);
      setResource(updatedResource);
      setReadOnly(true);
      return updatedResource;
    },
    [decryptedSession, persistSession],
  );

  const onEdit = useCallback(() => {
    const secret = promptForPasswordHash();
    if (secret === null) {
      alert('Invalid password');
      return;
    }
    const decryptedResource = decryptResource(secret, resource);
    setResource(decryptedResource);
    setReadOnly(false);
  }, [resource]);
  return (
    <Form
      {...props}
      onSubmit={onSubmit}
      mutators={arrayMutators}
      component={ResourceForm}
      readOnly={readOnly}
      onEdit={onEdit}
      initialValues={resource}
    />
  );
};

export default EditResource;
