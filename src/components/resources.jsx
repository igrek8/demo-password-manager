import React, { useContext, useCallback } from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import cn from 'classnames';
import SessionContext from './session-context';
import Resource from './resource';
import sessionReducer from './session-reducer';
import { DESTROY_RESOURCE } from './resources-actions';
import { encryptData } from '../utils/cipher';
import promptForPasswordHash from '../utils/prompt-for-password-hash';

const styles = (theme) => ({
  root: {
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: 0,
    listStyle: 'none',
  },
  item: {
    '& + &': {
      marginTop: theme.spacing.unit,
    },
  },
});

const Resources = ({ classes }) => {
  // const { history } = useRouter();
  const { decryptedSession, persistSession } = useContext(SessionContext);
  const { resources } = decryptedSession;
  const destroyResource = useCallback(
    (id) => {
      const secret = promptForPasswordHash();
      if (secret === null) {
        // eslint-disable-next-line no-alert
        alert('Failed to destroy resource: Invalid password');
        return;
      }
      const payload = { payload: { id }, type: DESTROY_RESOURCE };
      const nextDecryptedSession = sessionReducer(decryptedSession, payload);
      const newSerializedSession = JSON.stringify(nextDecryptedSession);
      const encryptedSession = encryptData(secret, newSerializedSession);
      persistSession(encryptedSession, nextDecryptedSession);
    },
    [decryptedSession, persistSession],
  );
  return (
    <React.Fragment>
      <Typography variant='title' className={classes.item}>
        Resources
      </Typography>
      <ul className={cn(classes.root, classes.item)}>
        {resources.map((resource) => (
          <li key={resource.id} className={classes.item}>
            <Resource {...resource} destroyResource={destroyResource} />
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default withStyles(styles)(Resources);
