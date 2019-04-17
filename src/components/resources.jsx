import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import SessionContext from './session-context';
import Resource from './resource';

const Resources = () => {
  const { decryptedSession } = useContext(SessionContext);
  const { resources } = decryptedSession;
  return (
    <React.Fragment>
      <Typography variant='title'>Resources</Typography>
      <ul>
        {resources.map((resource) => (
          <Resource {...resource} />
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Resources;
