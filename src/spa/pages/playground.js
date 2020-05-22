/** @format */

import React from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import TravelDetailsDialog from '../components/cards/TravelDetailsDialog';

export default function Playground() {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <TravelDetailsDialog />
    </MuiPickersUtilsProvider>
  );
}
