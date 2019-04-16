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
  input: {
    width: '100%',
  },
});

const SignUpForm = ({ handleSubmit, form, classes }) => {
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
          <button type='submit'>Submit</button>
          <button type='reset'>Clear</button>
        </div>
      </fieldset>
    </form>
  );
};

export default withStyles(styles)(SignUpForm);
