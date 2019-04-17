import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing.unit * 2,
  },
});

const MainPane = ({ classes, children }) => {
  return <main className={classes.root}>{children}</main>;
};

export default withStyles(styles)(MainPane);
