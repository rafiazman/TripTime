/** @format */

import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import TravelForm from './TravelForm';
import PropTypes from 'prop-types';

export default function TravelDetailsDialog({
  open,
  title,
  travel,
  onOk,
  onCancel,
}) {
  return (
    <Dialog
      open={open !== undefined ? open : true}
      onClose={onCancel}
      aria-labelledby='travel-dialog-title'
    >
      <DialogTitle id='travel-dialog-title'>
        {title ? title : 'Plan a Travel'}
      </DialogTitle>
      <DialogContent>
        <TravelForm onOk={onOk} onCancel={onCancel} travel={travel} />
      </DialogContent>
    </Dialog>
  );
}

TravelDetailsDialog.propTypes = {
  title: PropTypes.string,
  open: PropTypes.any,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  travel: PropTypes.object,
};
