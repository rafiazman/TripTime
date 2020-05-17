/** @format */

import React, { useState, useEffect } from 'react';
import moment from 'moment';

import {
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  // FormControlLabel,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { DateTimePicker } from '@material-ui/pickers';

import PropTypes from 'prop-types';
import ErrorDialog from '../dialog/ErrorDialog';
import { ActivityIcon, activityTypes } from './ActivityIcon';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,

    '& .MuiGrid-item': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
    },
    '& .MuiGrid-item > *': {
      flexGrow: 1,
    },
    '& .MuiGrid-item > .MuiButton-root': {
      flexGrow: 0,
    },
  },
});

export default function ActivityForm(props) {
  const classes = useStyles();
  const [activity, setActivity] = useState(
    props.activity
      ? { ...props.activity }
      : {
          name: '',
          description: '',
          start: moment()
            .add(1, 'hours')
            .toDate(),
          end: moment()
            .add(2, 'hours')
            .toDate(),
          type: undefined,
          location: undefined,
        },
  );
  const [errorOn, setErrorOn] = useState(false);
  const [error, setError] = useState(undefined);

  const [onClient, setOnClient] = useState(false);
  useEffect(() => {
    setOnClient(true);
  }, []);

  const handleChange = changes => {
    setActivity({ ...activity, ...changes });
  };

  const handleCancel = () => {
    const { onCancel } = props;
    onCancel && onCancel();
  };

  const checkError = () => {
    if (!activity.name) {
      setError({
        title: 'A name is required',
        message: 'Please give your activity a time',
      });
      return true;
    }
    if (moment(activity.start).isBefore(moment())) {
      setError({
        title: 'Invalid start time',
        message: 'Activity should start in the future',
      });
      return true;
    }
    if (moment(activity.start).isAfter(moment(activity.end))) {
      setError({
        title: 'Invalid end time',
        message: 'Activity should end after it starts',
      });
      return true;
    }
    return false;
  };

  const handleOk = () => {
    if (checkError()) {
      setErrorOn(true);
    } else {
      const { onOk } = props;
      onOk && onOk(activity);
    }
  };
  return (
    onClient && (
      <>
        <div className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={10}>
              <TextField
                variant='outlined'
                required
                error={!activity.name}
                helperText={!activity.name && 'A name is required'}
                label='Name'
                placeholder='Give your activity a name'
                value={activity.name}
                onChange={event => handleChange({ name: event.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <FormControl variant='outlined'>
                <InputLabel id='activity-type-label'>Type</InputLabel>
                <Select
                  labelId='activity-type-label'
                  id='activity-type-select'
                  value={activity.type}
                  onChange={event => handleChange({ type: event.target.value })}
                  label='Type'
                >
                  {Object.keys(activityTypes).map((type, index) => (
                    <MenuItem value={type} key={index}>
                      <ActivityIcon type={type} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateTimePicker
                label='From'
                required
                ampm={false}
                error={moment(activity.start).isBefore(moment())}
                helperText={
                  moment(activity.start).isBefore(moment()) &&
                  'Planned activity should start in the future'
                }
                showTodayButton
                inputVariant='outlined'
                value={activity.start}
                onChange={date => {
                  handleChange({ start: date.toDate() });
                  if (moment(activity.start).isAfter(moment(activity.end)))
                    setActivity({
                      ...activity,
                      end: moment(activity.start)
                        .add(1, 'hours')
                        .toDate(),
                    });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateTimePicker
                label='To'
                required
                ampm={false}
                error={moment(activity.start).isAfter(moment(activity.end))}
                helperText={
                  moment(activity.start).isAfter(moment(activity.end)) &&
                  'Activity should end after it starts!'
                }
                showTodayButton
                inputVariant='outlined'
                value={activity.end}
                onChange={date => handleChange({ end: date.toDate() })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant='outlined'
                multiline
                rows={2}
                label='Description'
                placeholder="Enter any additional info you'd like to share with your friends."
                value={activity.description}
                onChange={event =>
                  handleChange({ description: event.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} sm={12} className={classes.buttonPanel}>
              <span style={{ flexGrow: 1 }} />
              <Button color='secondary' onClick={() => handleCancel()}>
                Cancel
              </Button>
              <Button color='primary' onClick={() => handleOk()}>
                OK
              </Button>
            </Grid>
          </Grid>
        </div>
        {errorOn && (
          <ErrorDialog
            open={errorOn}
            onClose={() => {
              setErrorOn(false);
              setError(undefined);
            }}
            title={error && error.title}
            message={error && error.message}
          />
        )}
      </>
    )
  );
}

ActivityForm.propTypes = {
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  activity: PropTypes.object,
};
