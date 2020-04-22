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
    //let from_markers = this.props.travels.map(v => new LatLng(v.from.latitude, v.from.longitude));
    //let to_markers = this.props.travels.map(v => new LatLng(v.to.latitude, v.to.longitude));

    this.setState({
      inBrowser: true,
      //markers: from_markers.concat(to_markers),
    });
  }

  render() {
    if (!this.state.inBrowser) {
      return null;
    }

    //Make three empty markers. Loop through the travels and populate the coordinates of each marker,
    // Check if coordinates remain afterwards.

    //For each element in activities, get the coordinates and plot markers

    //First trip [0]
    //this.props.travels.forEach(item => console.log(Object.values(item.from)));

    const activity_pos = this.props.activities[0].gps;

    let act_latlng = [];
    act_latlng[0] = activity_pos.latitude;
    act_latlng[1] = activity_pos.longitude;

    const from_markers = this.props.travels.map((v, i) => (
      <Marker key={i} position={v.from} icon={MarkerIcon}>
        <Popup>Test</Popup>
      </Marker>
    ));

    const to_markers = this.props.travels.map((v, i) => (
      <Marker key={i} position={v.to} icon={RestIcon}>
        <Popup>Test</Popup>
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
        {from_markers}
        {to_markers}
        <Marker position={act_latlng} icon={ActivityIcon} />
      </Map>
    );
  }
}

TripMap.propTypes = {
  activities: PropTypes.array.isRequired,
  travels: PropTypes.array.isRequired,
};

// <Marker position={from} icon={MarkerIcon} />
// <Marker position={to} icon={RestIcon} />

export default TripMap;
