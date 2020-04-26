/** @format */
import React from 'react';
import * as L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';

//Different possible activity types and each respective font-awesome icon
const activityTypes = {
  outdoors: 'fas fa-hiking fa-2x',
  eating: 'fas fa-utensils fa-2x',
  scenery: 'fas fa-binoculars fa-2x',
  gathering: 'fas fa-glass-cheers fa-2x',
  music: 'fas fa-music fa-2x',
  gamble: 'fas fa-dice fa-2x',
  play: 'fas fa-democrat fa-2x',
  fantasy: 'fas fa-hat-wizard fa-2x',
  landmark: 'fas fa-landmark fa-2x',
  art: 'fas fa-palette fa-2x',
  animal: 'fas fa-paw fa-2x',
};

//This function generates an icon of colour which is passed in.
export function generateIcon(colour) {
  const markerHtmlStyles = `
    background-color: ${colour};
    width: 32px;
    height: 32px;
    display: block;
    left: -1.5rem;
    top: -1.5rem;
    position: relative;
    border-radius: 3rem 3rem 0;
    transform: rotate(45deg);
    border: 1px solid #FFFFFF`;

  return L.divIcon({
    className: 'my-custom-pin',
    iconAnchor: [0, 24],
    labelAnchor: [-6, 0],
    popupAnchor: [0, -36],
    html: `<span class="" style="${markerHtmlStyles}" />`,
  });
}

//This function generates an icon based on an activity type which is passed in.
export function generateActivityIcon(iconType) {
  const iconMarkup = renderToStaticMarkup(
    <i className={activityTypes[iconType]} />,
  );
  return L.divIcon({
    iconSize: [30, 24],
    html: iconMarkup,
  });
}
