/** @format */

import { Text, View } from '@react-pdf/renderer';
import PropTypes from 'prop-types';
import React from 'react';
import _ from 'underscore';
import moment from 'moment';
import styled from '@react-pdf/styled-components';

function formatTimeString(time) {
  return moment(time).format('dddd[,] DD/MM/YYYY [at] LT');
}

export default function DayView(props) {
  const day = props.dailyRecord.day;
  const events = _.sortBy(props.dailyRecord.events, 'start');

  return (
    <View>
      <Text style={{ color: '#ff6400', fontSize: 16 }}>{day}</Text>
      {events.map((event, index) => {
        if (event.mode) return <TravelView travel={event} key={index} />;
        else return <ActivityView activity={event} key={index} />;
      })}
    </View>
  );
}

DayView.propTypes = {
  dailyRecord: PropTypes.object.isRequired,
};

const GrayText = styled.Text`
  color: #666;
`;

function ActivityView(props) {
  const activity = props.activity;
  return (
    <View style={{ fontSize: 14, margin: 5 }} wrap={false}>
      <Text>Activity: {activity.name}</Text>
      <View style={{ paddingLeft: 10, fontSize: 12 }}>
        <GrayText>{activity.description}</GrayText>
        {activity.address && (
          <Text>
            <GrayText>At:</GrayText> {activity.address}
          </Text>
        )}
        <Text>
          <GrayText>From:</GrayText> {formatTimeString(activity.start)}{' '}
          <GrayText>To:</GrayText> {formatTimeString(activity.end)}
        </Text>
        <Text>
          <GrayText>Location (Lat, Long):</GrayText>({activity.gps.lat},
          {activity.gps.lng})
        </Text>
      </View>
    </View>
  );
}

ActivityView.propTypes = {
  activity: PropTypes.object.isRequired,
};

function TravelView(props) {
  const travel = props.travel;
  return (
    <View style={{ fontSize: 14, margin: 5 }} wrap={false}>
      <Text>Travel: {travel.description}</Text>
      <View style={{ paddingLeft: 10, fontSize: 12 }}>
        <GrayText>Travel by {travel.mode}</GrayText>
        <Text>From {formatTimeString(travel.from)}</Text>
        <Text>
          <GrayText>From:</GrayText> {formatTimeString(travel.start)}{' '}
          <GrayText>To:</GrayText>
          {formatTimeString(travel.end)}
        </Text>
      </View>
    </View>
  );
}

TravelView.propTypes = {
  travel: PropTypes.object.isRequired,
};
