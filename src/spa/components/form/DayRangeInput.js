/** @format */

import React from 'react';
import moment from 'moment';
import { Helmet } from 'react-helmet';

import DayPickerInput from 'react-day-picker/DayPickerInput';

import { formatDate, parseDate } from 'react-day-picker/moment';
import PropTypes from 'prop-types';

export default class DayRangeInput extends React.Component {
  static propTypes = {
    fromChanged: PropTypes.func,
    toChanged: PropTypes.func,
    required: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.state = {
      from: undefined,
      to: undefined,
    };
  }

  showFromMonth() {
    const { from, to } = this.state;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), 'months') < 2) {
      this.to.getDayPicker().showMonth(from);
    }
  }

  handleFromChange(from) {
    // Change the from date and focus the "to" input field
    this.setState({ from });
    this.props.fromChanged(from);
  }

  handleToChange(to) {
    this.setState({ to }, this.showFromMonth);
    this.props.toChanged(to);
  }

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    const required = this.props.required;
    return (
      <div className='InputFromTo'>
        <DayPickerInput
          value={from}
          placeholder='From'
          format='LL'
          formatDate={formatDate}
          parseDate={parseDate}
          dayPickerProps={{
            selectedDays: [from, { from, to }],
            disabledDays: { after: to, before: new Date() },
            toMonth: to,
            modifiers,
            numberOfMonths: 2,
            onDayClick: () => this.to.getInput().focus(),
          }}
          onDayChange={this.handleFromChange}
          inputProps={{ required: required }}
        />{' '}
        —{' '}
        <span className='InputFromTo-to'>
          <DayPickerInput
            ref={el => (this.to = el)}
            value={to}
            placeholder='To'
            format='LL'
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              disabledDays: { before: from || new Date() },
              modifiers,
              month: from,
              fromMonth: from,
              numberOfMonths: 2,
            }}
            onDayChange={this.handleToChange}
            inputProps={{ required: required }}
          />
        </span>
        <Helmet>
          <style>{`
  .InputFromTo .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #fff8f0 !important;
    color: #ff6400;
  }
  .InputFromTo .DayPicker-Day {
    border-radius: 0 !important;
  }
  .InputFromTo .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }
  .InputFromTo .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
  .InputFromTo .DayPickerInput-Overlay {
    width: 550px;
  }
  .InputFromTo-to .DayPickerInput-Overlay {
    margin-left: -198px;
  }
  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside){
  background-color: #ff6400 !important;
  }
.DayPicker:not(.DayPicker--interactionDisabled)
  .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
  background-color: #ffF8f0;
}

`}</style>
        </Helmet>
      </div>
    );
  }
}
