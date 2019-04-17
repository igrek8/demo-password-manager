import React from 'react';
import { Switch, Route } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Nav from './nav';
import Main from './main-pane';
import Resources from './resources';
import NewResource from './new-resource';
import EditResource from './edit-resource';

const styles = (theme) => ({
  root: {
    background: '#fff',
    height: '100%',
    minHeight: '100vh',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
});

const paths = [
  { to: '/', text: 'All resources', exact: true, shortcut: 'shift + a' },
  { to: '/resources/new', text: 'Create resource', shortcut: 'shift + n' },
];

const Dashboard = ({ classes }) => {
  return (
    <div className={classes.root}>
      <Nav paths={paths} />
      <Main>
        <Switch>
          <Route exact path='/resources/new' component={NewResource} />
          <Route exact path='/resources/:id' component={EditResource} />
          <Route component={Resources} />
        </Switch>
      </Main>
    </div>
  );
};

export default withStyles(styles)(Dashboard);
