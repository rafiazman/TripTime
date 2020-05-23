/** @format */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '../Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function DeleteActivityButton(props) {
  const { onDelete } = props;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = () => {
    setOpen(false);
    onDelete(props.activityId);
  };

  return (
    <>
      <span onClick={handleClickOpen}>
        <Tooltip text='Delete' component={<FontAwesomeIcon icon={faTrash} />} />
      </span>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='delete-activity-dialog'
      >
        <DialogTitle id='delete-activity-dialog'>Delete Activity</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this activity?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleOk} color='primary'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

DeleteActivityButton.propTypes = {
  activityId: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};
