/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import { Field } from 'react-final-form';
import cn from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
  item: {
    '& + &': {
      marginTop: theme.spacing.unit,
    },
  },
  button: {
    '& + &': {
      marginLeft: theme.spacing.unit,
    },
  },
  input: {
    width: '100%',
  },
});

const SignUpForm = ({ handleSubmit, form, classes, children }) => {
  return (
    <form onSubmit={handleSubmit} onReset={form.reset}>
      <fieldset>
        <legend className={cn(classes.item)}>Sign up</legend>
        <label htmlFor='password' className={cn(classes.item)}>
          Password
          <Field
            id='password'
            name='password'
            type='password'
            autoFocus
            required
            component='input'
            className={cn(classes.input, classes.item)}
          />
        </label>
        <div className={cn(classes.item)}>
          <button type='submit' className={cn(classes.button)}>
            Sign in
          </button>
          <button type='reset' className={cn(classes.button)}>
            Clear
          </button>
          {React.Children.map(children, (child) => (
            <span className={cn(classes.button)}>{child}</span>
          ))}
        </div>
      </fieldset>
    </form>
  );
};

export default withStyles(styles)(SignUpForm);
