/** @format */

import React, { createRef } from 'react';
import { Map, TileLayer, Marker, Popup, withLeaflet } from 'react-leaflet';
import { SearchControl, OpenStreetMapProvider } from 'react-leaflet-geosearch';
import {
  ActivityIcon,
  RestIcon,
  generateIcon,
} from '../../app/leaflet/MarkerIcon';
import PropTypes from 'prop-types';

function generateRandomColour() {
  return '#' + (Math.random().toString(16) + '000000').substring(2, 8);
}

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

    this.props.travels.forEach(item => {
      item.trip_colour = generateRandomColour();
    });
  }

  handleClick = (latlng, e) => {
    e.type == 'click' ? this.map.current.leafletElement.panTo(latlng) : null;
  };

  render() {
    if (!this.state.inBrowser) {
      return null;
    }

    const datetime_options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

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

    const activity_markers = this.props.activities.map((v, i) => (
      <Marker
        key={i}
        position={v.gps}
        icon={v.type == 'gathering' ? RestIcon : ActivityIcon}
      >
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

    const default_position = [-36.8485, 174.7633];
    const prov = OpenStreetMapProvider();
    const GeoSearchControlElement = withLeaflet(SearchControl);

    return (
      <Map ref={this.map} center={default_position} zoom={13}>
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
        {from_markers}
        {to_markers}
        {activity_markers}
      </Map>
    );
  }
}

TripMap.propTypes = {
  activities: PropTypes.array.isRequired,
  travels: PropTypes.array.isRequired,
};

export default TripMap;
