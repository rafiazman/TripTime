/** @format */

import React from 'react';
import { Map, TileLayer, withLeaflet } from 'react-leaflet';
import { SearchControl, OpenStreetMapProvider } from 'react-leaflet-geosearch';
//import MarkerIcon from '../../css/images/marker-icon.png';

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

    const position = [-36.8485, 174.7633];
    const prov = OpenStreetMapProvider();
    const GeoSearchControlElement = withLeaflet(SearchControl);
    //GeoSearchControlElement.marker.icon = {MarkerIcon};
    return (
      <Map center={position} zoom={13}>
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoSearchControlElement
          provider={prov}
          showMarker={true}
          showPopup={false}
          maxMarkers={3}
          retainZoomLevel={false}
          animateZoom={true}
          autoClose={false}
          searchLabel={'Enter address, please'}
          keepResult={true}
        />
      </Map>
    );
  }
}

// TripMap.propTypes = {
//   activities: PropTypes.array.isRequired,
// };

export default TripMap;
