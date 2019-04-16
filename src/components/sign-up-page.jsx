import React, { useCallback } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Form } from 'react-final-form';
import SignUpForm from './sign-up-form';

const styles = (theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    ...theme.typography.body1,
  },
  content: {
    width: 320,
    margin: 'auto',
  },
});

const SignUpPage = ({ classes }) => {
  const onFormSubmit = useCallback(({ password }, { reset }) => {
    alert(password);
    reset();
  }, []);
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Form onSubmit={onFormSubmit} component={SignUpForm} />
      </div>
    </div>
  );
};

export default withStyles(styles)(SignUpPage);
