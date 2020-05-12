/** @format */

import React from 'react';
import { Page, Text, View, Document, Link } from '@react-pdf/renderer';
import PropTypes from 'prop-types';
import _ from 'underscore';
import moment from 'moment';
import DayView from './DayView';

export default class TripDocument extends React.Component {
  static propTypes = {
    activities: PropTypes.array.isRequired,
    travels: PropTypes.array.isRequired,
    trip: PropTypes.object.isRequired,
  };

  groupByDay(events) {
    const occurrenceDay = function(event) {
      return moment(event.start)
        .startOf('day')
        .format('dddd Do MMMM, YYYY');
    };
    const groupToDay = function(group, day) {
      return {
        day: day,
        events: group,
      };
    };
    return _.chain(events)
      .groupBy(occurrenceDay)
      .map(groupToDay)
      .sortBy('day')
      .value();
  }

  render() {
    const trip = this.props.trip;
    const activities = this.props.activities;
    const travels = this.props.travels;
    const eventsByDay = this.groupByDay([...activities, ...travels]);

    return (
      <Document>
        <Page size='A4' wrap style={{ padding: 15 }}>
          <View fixed>
            <Text
              style={{
                fontSize: 10,
                textAlign: 'right',
                margin: 5,
                color: '#ff4200',
              }}
            >
              Presented to you by{' '}
              <Link src={'http://triptime.cc'}>TripTime</Link>
            </Text>
          </View>
          <View style={{ borderBottom: '1px solid #555', marginBottom: 10 }}>
            <Text style={{ fontWeight: 700, fontSize: 22 }}>{trip.name}</Text>
            <Text style={{ fontSize: 12, color: '#555' }}>
              {trip.description}
            </Text>
          </View>
          {eventsByDay.map((record, index) => (
            <DayView dailyRecord={record} key={index} />
          ))}
        </Page>
      </Document>
    );
  }
}
