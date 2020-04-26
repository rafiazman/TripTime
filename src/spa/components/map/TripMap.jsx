/** @format */

import React, { createRef } from 'react';
import { Map, TileLayer, Marker, Popup, withLeaflet } from 'react-leaflet';
import { SearchControl, OpenStreetMapProvider } from 'react-leaflet-geosearch';
import {
  generateIcon,
  generateActivityIcon,
} from '../../app/leaflet/MarkerIcon';
import PropTypes from 'prop-types';
import MarkerSplitter from './MarkerSplitter';

function generateRandomColour() {
  return '#' + (Math.random().toString(16) + '000000').substring(2, 8);
}

//Options to set how date time is presented on the map popups.
const datetime_options = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
};

class TripMap extends React.Component {
  constructor(props) {
    super(props);
    this.map = createRef();
  }

  state = {
    inBrowser: false,
    markers: [],
  };

  componentDidMount() {
    this.setState({
      inBrowser: true,
    });

    // Set a colour for each trip
    this.props.travels.forEach(item => {
      item.trip_colour = generateRandomColour();
    });
  }

  //Function that on click, will pan to the origin or destination of the clicked marker's trip.
  handleClick = (latlng, e) => {
    e.type == 'click' ? this.map.current.leafletElement.panTo(latlng) : null;
  };

  render() {
    if (!this.state.inBrowser) {
      return null;
    }
    // All the markers in the starting points of a trip. Has popup with trip data
    const from_markers = this.props.travels.map((v, i) => (
      <Marker key={i} position={v.from} icon={generateIcon(v.trip_colour)}>
        <Popup>
          Description: {v.description}
          <br />
          Departure Date:{' '}
          {new Intl.DateTimeFormat('en-NZ', datetime_options).format(
            Date.parse(v.start),
          )}
          <br />
          Method of Travel: {v.mode}
          <br />
          <a href='#' onClick={e => this.handleClick(v.to, e)}>
            {' '}
            Go to destination point{' '}
          </a>
        </Popup>
      </Marker>
    ));

    //Markers in end points of a trip. Has popup with trip data
    const to_markers = this.props.travels.map((v, i) => (
      <Marker key={i} position={v.to} icon={generateIcon(v.trip_colour)}>
        <Popup>
          Description: {v.description}
          <br />
          Arrival Date:{' '}
          {new Intl.DateTimeFormat('en-NZ', datetime_options).format(
            Date.parse(v.end),
          )}
          <br />
          Method of Travel: {v.mode}
          <br />
          <a href='#' onClick={e => this.handleClick(v.from, e)}>
            {' '}
            Go to starting point{' '}
          </a>
        </Popup>
      </Marker>
    ));

    //Markers for activities.
    const activity_markers = this.props.activities.map((v, i) => (
      <Marker key={i} position={v.gps} icon={generateActivityIcon(v.type)}>
        <Popup>
          Event name: {v.name}
          <br />
          Description: {v.description}
          <br />
          Start Time:{' '}
          {new Intl.DateTimeFormat('en-NZ', datetime_options).format(
            Date.parse(v.start),
          )}
          <br />
          End Time:{' '}
          {new Intl.DateTimeFormat('en-NZ', datetime_options).format(
            Date.parse(v.end),
          )}
          <br />
        </Popup>
      </Marker>
    ));

    //Over NZ
    const center = [-40.3523, 175.6082];
    const prov = OpenStreetMapProvider();
    const GeoSearchControlElement = withLeaflet(SearchControl);

    return (
      <Map ref={this.map} center={center} zoom={6}>
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoSearchControlElement
          provider={prov}
          showPopup={false}
          showMarker={false}
          retainZoomLevel={false}
          animateZoom={true}
          autoClose={true}
          searchLabel={'Search for a location...'}
          keepResult={false}
        />
        <MarkerSplitter>
          {from_markers}
          {to_markers}
          {activity_markers}
        </MarkerSplitter>
      </Map>
    );
  }
}

TripMap.propTypes = {
  activities: PropTypes.array.isRequired,
  travels: PropTypes.array.isRequired,
};

export default TripMap;
