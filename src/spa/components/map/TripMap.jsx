/** @format */

import React from 'react';
import { Map, TileLayer, Marker, Popup, withLeaflet } from 'react-leaflet';
import { SearchControl, OpenStreetMapProvider } from 'react-leaflet-geosearch';
import {
  MarkerIcon,
  ActivityIcon,
  RestIcon,
} from '../../app/leaflet/MarkerIcon';
import PropTypes from 'prop-types';

class TripMap extends React.Component {
  state = {
    inBrowser: false,
    markers: [],
  };

  componentDidMount() {
    this.setState({
      inBrowser: true,
    });
  }

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

    const travel_markers = this.props.travels.map((v, i) => (
      <Marker key={i} position={v.from && v.to} icon={MarkerIcon}>
        <Popup>
          Description: {v.description}
          <br />
          Departure Date:{' '}
          {new Intl.DateTimeFormat('en-NZ', datetime_options).format(
            Date.parse(v.start),
          )}
          <br />
          Arrival Date:{' '}
          {new Intl.DateTimeFormat('en-NZ', datetime_options).format(
            Date.parse(v.end),
          )}
          <br />
          Method of Travel: {v.mode}
          <br />
          Notes: {v.notes}
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
      <Map center={default_position} zoom={13}>
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
        {travel_markers}
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
