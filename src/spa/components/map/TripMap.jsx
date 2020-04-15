/** @format */

import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import ReactLeafletSearch from 'react-leaflet-search';

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
    return (
      <Map center={position} zoom={13}>
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        //Add values here to change properties of the search functionality
        <ReactLeafletSearch
          position='topleft'
          inputPlaceholder='Search for a location...'
          showMarker={true}
          openSearchOnLoad={false}
          provider='OpenStreetMap'
          providerOptions={{ region: 'nz' }}
        />
      </Map>
    );
  }
}

// TripMap.propTypes = {
//   activities: PropTypes.array.isRequired,
// };

export default TripMap;
