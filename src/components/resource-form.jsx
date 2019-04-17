/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/no-autofocus */

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
    display: 'block',
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

const Records = ({ fields, classes, readOnly }) =>
  fields.map((name, index) => {
    const nameKey = `${name}.name`;
    const dataKey = `${name}.data`;
    return (
      <fieldset key={name} className={cn(classes.item)}>
        <label htmlFor='resourceName' className={cn(classes.item)}>
          <span className={cn(classes.item)}>Record name:</span>
          <Field
            name={nameKey}
            component='input'
            required
            placeholder='Record name'
            disabled={readOnly}
            className={cn(classes.item, classes.input)}
          />
        </label>
        <label htmlFor='resourceName' className={cn(classes.item)}>
          <span className={cn(classes.item)}>Sensitive data:</span>
          <Field
            name={dataKey}
            required
            component='input'
            type={readOnly ? 'password' : 'text'}
            placeholder='Sensitive data'
            disabled={readOnly}
            className={cn(classes.item, classes.input)}
          />
        </label>
        {!readOnly && (
          <div className={cn(classes.item)}>
            <button
              type='button'
              disabled={readOnly}
              className={cn(classes.item)}
              onClick={() => fields.remove(index)}
            >
              Delete ✗
            </button>
          </div>
        )}
      </fieldset>
    );
  });

const ResourceForm = ({
  handleSubmit,
  form,
  classes,
  readOnly,
  initialValues,
  onEdit,
}) => {
  const { id } = initialValues;
  const addRecord = useCallback(() => {
    form.mutators.push('records', { name: '', data: '' });
  }, [form]);
  return (
    <form onSubmit={handleSubmit} onReset={form.reset} className={classes.root}>
      <Typography variant='title' className={cn(classes.item)}>
        {id ? `Edit resource ${id}` : 'New resource'}
      </Typography>
      <label htmlFor='resourceName' className={cn(classes.item)}>
        <span className={cn(classes.item)}>Resource name:</span>
        <Field
          name='name'
          id='resourceName'
          component='input'
          autoFocus
          placeholder='Resource name'
          disabled={readOnly}
          required
          className={cn(classes.input, classes.item)}
        />
      </label>
      <FieldArray
        name='records'
        readOnly={readOnly}
        component={Records}
        classes={classes}
      />
      {id === null && (
        <div className={cn(classes.item)}>
          <button type='submit' className={cn(classes.button)}>
            Save
          </button>
          <button
            type='reset'
            disabled={readOnly}
            className={cn(classes.button)}
          >
            Reset
          </button>
          <button
            type='button'
            className={cn(classes.button)}
            onClick={addRecord}
            disabled={readOnly}
          >
            Add record
          </button>
        </div>
      )}
      {id !== null && readOnly && (
        <div className={cn(classes.item)}>
          <React.Fragment>
            <button
              type='button'
              onClick={onEdit}
              autoFocus
              className={cn(classes.button)}
            >
              Edit resource
            </button>
          </React.Fragment>
        </div>
      )}
      {id !== null && !readOnly && (
        <div className={cn(classes.item)}>
          <button type='submit' className={cn(classes.button)}>
            Save
          </button>
          <button
            type='reset'
            disabled={readOnly}
            className={cn(classes.button)}
          >
            Reset
          </button>
          <button
            type='button'
            className={cn(classes.button)}
            onClick={addRecord}
            disabled={readOnly}
          >
            Add record
          </button>
        </div>
      )}
    </form>
  );
};

export default withStyles(styles)(ResourceForm);
