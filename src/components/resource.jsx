import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
  root: {
    marginTop: 0,
    marginBottom: 0,
    padding: theme.spacing.unit,
    backgroundColor: 'bisque',
    fontSize: 11,
    borderRadius: 6,
  },
});

const Resource = ({ classes, ...props }) => {
  return <pre className={classes.root}>{JSON.stringify(props, null, 2)}</pre>;
};

export default withStyles(styles)(Resource);
