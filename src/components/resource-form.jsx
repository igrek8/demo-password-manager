/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */

import React, { useCallback } from 'react';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import Typography from '@material-ui/core/Typography';
import cn from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
  root: {
    ...theme.typography.body1,
  },
  item: {
    '& + &': {
      marginTop: theme.spacing.unit,
    },
  },
  input: {
    ...theme.typography.body1,
    maxHeight: 120,
    width: '100%',
    resize: 'none',
  },
  button: {
    '& + &': {
      marginLeft: theme.spacing.unit,
    },
  },
});

const Records = ({ fields, classes }) =>
  fields.map((name, index) => {
    const typeDataKey = `${name}.data`;
    return (
      <div key={name} className={cn(classes.item)}>
        <Field
          name={typeDataKey}
          component='textarea'
          placeholder='Sensitive data'
          className={cn(classes.item, classes.input)}
        />
        <button type='button' onClick={() => fields.remove(index)}>
          Delete ✗
        </button>
      </div>
    );
  });

const ResourceForm = ({ handleSubmit, form, classes }) => {
  const addRecord = useCallback(() => {
    form.mutators.push('records', { data: '' });
  }, [form]);
  return (
    <form onSubmit={handleSubmit} onReset={form.reset} className={classes.root}>
      <Typography variant='title'>New resource</Typography>
      <br />
      <label htmlFor='resourceName' className={cn(classes.item)}>
        <span className={cn(classes.item)}>Name:</span>
        <Field
          name='name'
          id='resourceName'
          component='input'
          placeholder='Resource name'
          className={cn(classes.input, classes.item)}
        />
      </label>
      <FieldArray name='records' component={Records} classes={classes} />
      <div className={cn(classes.item)}>
        <button
          type='button'
          className={cn(classes.button)}
          onClick={addRecord}
        >
          Add record
        </button>
      </div>
      <div className={cn(classes.item)}>
        <button type='submit' className={cn(classes.button)}>
          Create resource
        </button>
        <button type='reset' className={cn(classes.button)}>
          Clear
        </button>
      </div>
    </form>
  );
};

export default withStyles(styles)(ResourceForm);
