/** @format */
import React from 'react';
import * as L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import ActivityMarker from './ActivityMarker';
import TravelMarker from './TravelMarker';

export function generateActivityIcon(iconType) {
  const iconMarkup = renderToStaticMarkup(
    <ActivityMarker activityType={iconType} />,
  );
  return L.divIcon({
    iconSize: [30, 24],
    html: iconMarkup,
  });
}

export function generateTravelIcon(rgb, mode, isTo) {
  const iconMarkup = renderToStaticMarkup(
    <TravelMarker isTo={isTo} travelMode={mode} rgb={rgb} />,
  );
  return L.divIcon({
    iconSize: [30, 24],
    html: iconMarkup,
  });
}
