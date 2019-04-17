import React, { useContext, useCallback } from 'react';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import v4 from 'uuid/v4';
import SessionContext from './session-context';
import { ADD_RESOURCE } from './resources-actions';
import ResourceForm from './resource-form';

const ResourcePreview = (props) => {
  const { dispatchDecryptedSession } = useContext(SessionContext);
  const onSubmit = useCallback(
    (resource) => {
      const newResource = {
        id: v4(),
        records: resource.records,
      };
      dispatchDecryptedSession({
        type: ADD_RESOURCE,
        payload: newResource,
      });
    },
    [dispatchDecryptedSession],
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
