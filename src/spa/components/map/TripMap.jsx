/** @format */

import React from 'react';
import { Map, TileLayer, Marker, withLeaflet } from 'react-leaflet';
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
  };

  componentDidMount() {
    this.setState({ inBrowser: true });
  }

  render() {
    if (!this.state.inBrowser) {
      return null;
    }
    //For each element in travels, store the from and to coordinates as objects.
    //For each element in travels, plot the from and to onto the map with <Markers>

    //For each element in activities, get the coordinates and plot markers

    //First trip [0]
    const from = this.props.travels[0].from; //from coordinates
    const to = this.props.travels[0].to; //to coordinates

    const activity_pos = this.props.activities[0].gps;
    let act_latlng = [];
    act_latlng[0] = activity_pos.latitude;
    act_latlng[1] = activity_pos.longitude;

    let from_latlng = [];
    from_latlng[0] = from.latitude;
    from_latlng[1] = from.longitude;

    let to_latlng = [];
    to_latlng[0] = to.latitude;
    to_latlng[1] = to.longitude;

    // console.log(from_latlng);
    // console.log(to_latlng);

    //const position = [-36.8485, 174.7633];
    const prov = OpenStreetMapProvider();
    const GeoSearchControlElement = withLeaflet(SearchControl);

    return (
      <Map center={from_latlng} zoom={13}>
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
        <Marker position={from_latlng} icon={MarkerIcon} />
        <Marker position={to_latlng} icon={RestIcon} />
        <Marker position={act_latlng} icon={ActivityIcon} />
      </Map>
    );
  }
}

TripMap.propTypes = {
  activities: PropTypes.array.isRequired,
  travels: PropTypes.array.isRequired,
};

export default TripMap;
