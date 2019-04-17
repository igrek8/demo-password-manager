import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import cn from 'classnames';
import SessionContext from './session-context';
import Resource from './resource';

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
  const { decryptedSession } = useContext(SessionContext);
  const { resources } = decryptedSession;
  return (
    <React.Fragment>
      <Typography variant='title' className={classes.item}>
        Resources
      </Typography>
      <ul className={cn(classes.root, classes.item)}>
        {resources.map((resource) => (
          <li key={resource.id} className={classes.item}>
            <Resource {...resource} />
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default withStyles(styles)(Resources);
