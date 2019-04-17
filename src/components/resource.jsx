import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import cn from 'classnames';

const styles = (theme) => ({
  root: {},
  item: {
    '& + &': {
      marginTop: theme.spacing.unit,
    },
  },
  code: {
    marginTop: 0,
    marginBottom: 0,
    padding: theme.spacing.unit,
    backgroundColor: 'bisque',
    fontSize: 11,
    borderRadius: 6,
  },
});

const Resource = ({ classes, ...props }) => {
  const { id, name } = props;
  return (
    <div className={classes.root}>
      <Link
        to={`/resources/${id}`}
        className={cn(classes.item)}
        component={RouterLink}
      >
        {name || id}
      </Link>
      <pre className={cn(classes.item, classes.code)}>
        {JSON.stringify(props, null, 2)}
      </pre>
    </div>
  );
};

export default withStyles(styles)(Resource);
