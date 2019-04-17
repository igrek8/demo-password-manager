/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import { Field } from 'react-final-form';
import cn from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
  item: {
    display: 'block',
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
  error: {
    color: 'tomato',
  },
});

const SignUpForm = ({
  title,
  submitError,
  submitFailed,
  submitButtonText,
  handleSubmit,
  form,
  classes,
  children,
}) => {
  return (
    <form onSubmit={handleSubmit} onReset={form.reset}>
      <fieldset>
        <legend>{title}</legend>
        {submitFailed && (
          <div className={cn(classes.item, classes.error)}>
            {submitError || 'Something went wrong'}
          </div>
        )}
        <label htmlFor='password' className={cn(classes.item)}>
          Password
          <Field
            id='password'
            name='password'
            type='password'
            autoFocus
            required
            placeholder='Type master password'
            component='input'
            className={cn(classes.input, classes.item)}
          />
        </label>
        <div className={cn(classes.item)}>
          <button type='submit' className={cn(classes.button)}>
            {submitButtonText}
          </button>
          {React.Children.map(children, (child) => (
            <span className={cn(classes.button)}>{child}</span>
          ))}
          <button type='reset' className={cn(classes.button)}>
            Reset
          </button>
        </div>
      </fieldset>
    </form>
  );
};

export default withStyles(styles)(SignUpForm);
