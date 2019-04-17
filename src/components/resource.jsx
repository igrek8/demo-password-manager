import React, { useCallback } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import cn from 'classnames';

const styles = (theme) => ({
  root: {
    display: 'flex',
    ...theme.typography.body2,
    background: '#eee',
    padding: theme.spacing.unit,
    '&:hover': {
      textDecoration: 'none',
      background: '#c7c7c7',
    },
  },
  item: {
    '& + &': {
      marginTop: theme.spacing.unit,
    },
  },
  destroyButton: {
    marginLeft: 'auto',
    color: 'tomato',
    background: 'transparent',
    border: 0,
    lineHeight: 0,
    cursor: 'pointer',
    fontSize: 18,
  },
});

const Resource = ({ classes, destroyResource, ...props }) => {
  const { id, name, records } = props;
  const handleDestroy = useCallback(
    (event) => {
      event.preventDefault();
      destroyResource(id);
    },
    [id, destroyResource],
  );
  return (
    <Link
      to={`/resources/${id}`}
      className={cn(classes.item, classes.root)}
      component={RouterLink}
    >
      {`${name} / ${records.length} items`}
      <button
        type='button'
        onClick={handleDestroy}
        className={classes.destroyButton}
      >
        ✗
      </button>
    </Link>
  );
};

export default withStyles(styles)(Resource);
