/** @format */

import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import ActivityForm from './ActivityForm';
import PropTypes from 'prop-types';

export default function ActivityDetailsDialog({
  open,
  title,
  activity,
  onOk,
  onCancel,
}) {
  return (
    <Dialog
      open={open !== undefined ? open : true}
      onClose={onCancel}
      aria-labelledby='todo-dialog-title'
    >
      <DialogTitle id='todo-dialog-title'>
        {title ? title : 'Plan an Activity'}
      </DialogTitle>
      <DialogContent>
        <ActivityForm onOk={onOk} onCancel={onCancel} activity={activity} />
      </DialogContent>
    </Dialog>
  );
}

ActivityDetailsDialog.propTypes = {
  title: PropTypes.string,
  open: PropTypes.any,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  activity: PropTypes.object,
};
