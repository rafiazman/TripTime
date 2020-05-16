/** @format */

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

export default function ErrorDialog({ open, onClose, title, message }) {
  return (
    <Dialog
      open={open !== undefined ? open : true}
      onClose={onClose}
      aria-labelledby='name-required-dialog-title'
      aria-describedby='name-required-dialog-description'
    >
      <DialogTitle id='name-required-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='name-required-dialog-description'>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary' autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ErrorDialog.propTypes = {
  open: PropTypes.any,
  onClose: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
};
