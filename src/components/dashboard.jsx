import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Nav from './nav';
import Main from './main-pane';

const styles = () => ({
  root: {
    display: 'flex',
    background: '#fff',
    height: '100%',
    minHeight: '100vh',
  },
});

const paths = [
  { to: '/', text: 'All resources', exact: true, shortcut: 'shift + a' },
  { to: '/new', text: 'Create resource', shortcut: 'shift + n' },
];

const Dashboard = ({ classes }) => {
  return (
    <div className={classes.root}>
      <Nav paths={paths} />
      <Main>Application</Main>
    </div>
  );
};

export default withStyles(styles)(Dashboard);
