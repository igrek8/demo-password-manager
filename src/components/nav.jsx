/* eslint-disable react/no-array-index-key */

import React from 'react';
import { NavLink } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
  root: {
    ...theme.typography.body1,
    height: '100%',
    marginTop: 0,
    marginBottom: 0,
    listStyle: 'none',
    paddingLeft: 0,
    overflow: 'hidden',
    backgroundColor: '#3e3e3e',
    color: '#fff',
  },
  item: {
    [theme.breakpoints.up('md')]: {
      width: 245,
      '&:first-child': {
        marginTop: theme.spacing.unit * 2,
      },
      '& + &': {
        marginTop: theme.spacing.unit,
      },
    },
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    color: 'inherit',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'space-between',
      paddingRight: theme.spacing.unit * 5,
    },
    padding: theme.spacing.unit,
    textDecoration: 'none',
  },
  activeLink: {
    background: '#909090',
  },
  shortcut: {
    color: '#fff',
    fontWeight: 'bold',
    background: 'orchid',
    borderRadius: 6,
    lineHeight: 1.3,
    fontSize: 10,
    display: 'block',
    padding: theme.spacing.unit / 2,
    marginRight: theme.spacing.unit,
  },
});

const Nav = ({ classes, paths }) => {
  return (
    <nav>
      <ul className={classes.root}>
        {paths.map(({ text, shortcut, ...link }, index) => (
          <li key={index} className={classes.item}>
            <NavLink
              {...link}
              className={classes.link}
              activeClassName={classes.activeLink}
            >
              <code className={classes.shortcut}>{shortcut}</code>
              {text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default withStyles(styles)(Nav);
