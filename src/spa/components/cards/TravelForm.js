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
import { travelModes, TravelIcon } from './TravelIcon';

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

export default function TravelForm(props) {
  const classes = useStyles();
  const [travel, setTravel] = useState(
    props.travel
      ? { ...props.travel }
      : {
          name: '',
          description: '',
          start: moment()
            .add(1, 'hours')
            .toDate(),
          end: moment()
            .add(2, 'hours')
            .toDate(),
          mode: 'walk',
        },
  );
  const [errorOn, setErrorOn] = useState(false);
  const [error, setError] = useState(undefined);

  const [onClient, setOnClient] = useState(false);
  useEffect(() => {
    setOnClient(true);
  }, []);

  const handleChange = changes => {
    setTravel({ ...travel, ...changes });
  };

  const handleCancel = () => {
    const { onCancel } = props;
    onCancel && onCancel();
  };

  const checkError = () => {
    if (moment(travel.start).isBefore(moment())) {
      setError({
        title: 'Invalid start time',
        message: 'Travel should start in the future',
      });
      return true;
    }
    if (moment(travel.start).isAfter(moment(travel.end))) {
      setError({
        title: 'Invalid end time',
        message: 'Travel should end after it starts',
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
      onOk && onOk(travel);
    }
  };
  return (
    onClient && (
      <>
        <div className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={2}>
              <FormControl variant='outlined'>
                <InputLabel id='travel-mode-label'>Mode</InputLabel>
                <Select
                  labelId='travel-mode-label'
                  id='travel-mode-select'
                  value={travel.mode}
                  onChange={event => handleChange({ mode: event.target.value })}
                  label='Type'
                >
                  {Object.keys(travelModes).map((mode, index) => (
                    <MenuItem value={mode} key={index}>
                      <TravelIcon mode={mode} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={5}>
              <DateTimePicker
                label='From'
                required
                ampm={false}
                error={moment(travel.start).isBefore(moment())}
                helperText={
                  moment(travel.start).isBefore(moment()) &&
                  'Planned travel should start in the future'
                }
                showTodayButton
                inputVariant='outlined'
                value={travel.start}
                onChange={date => {
                  handleChange({ start: date.toDate() });
                  if (moment(travel.start).isAfter(moment(travel.end)))
                    setTravel({
                      ...travel,
                      end: moment(travel.start)
                        .add(1, 'hours')
                        .toDate(),
                    });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <DateTimePicker
                label='To'
                required
                ampm={false}
                error={moment(travel.start).isAfter(moment(travel.end))}
                helperText={
                  moment(travel.start).isAfter(moment(travel.end)) &&
                  'Travel should end after it starts!'
                }
                showTodayButton
                inputVariant='outlined'
                value={travel.end}
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
                value={travel.description}
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

TravelForm.propTypes = {
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  travel: PropTypes.object,
};
