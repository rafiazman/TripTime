/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import { Marker, Popup } from 'react-leaflet';
import { generateTravelIcon } from './MarkerIcon';
import TravelCard from '../cards/TravelCard';
import styles from '../../css/map.module.css';
import axios from '../../app/axios';

class TravelMarkerPair extends React.Component {
  static propTypes = {
    travel: PropTypes.object.isRequired,
    tripId: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.fromMarker = React.createRef();
    this.toMarker = React.createRef();
  }

  toggleFocus(clickTo) {
    clickTo
      ? this.fromMarker.current.fireLeafletEvent('click')
      : this.toMarker.current.fireLeafletEvent('click');
  }

  submitUpdatedLocation(event, isFrom) {
    const tripId = this.props.tripId;
    const travel = this.props.travel;
    const { lat, lng } = event.target.getLatLng();

    if (!travel.id) {
      // TODO: POST new travel from addTravel() in TripMap.js
      alert('Dragged created travel, send a POST');
    } else {
      if (isFrom)
        axios.patch(`/trip/${tripId}/travels`, {
          id: travel.id,
          from: {
            lat: lat.toString(),
            lng: lng.toString(),
          },
        });
      else
        axios.patch(`/trip/${tripId}/travels`, {
          id: travel.id,
          to: {
            lat: lat.toString(),
            lng: lng.toString(),
          },
        });
    }
  }

  render() {
    const travel = this.props.travel;
    return (
      <>
        <Marker
          position={travel.to}
          icon={generateTravelIcon(travel.travel_rgb, travel.mode, true)}
          ref={this.toMarker}
          draggable={true}
          onDragEnd={e => this.submitUpdatedLocation(e, false)}
        >
          <Popup>
            <TravelCard
              travel={travel}
              tripId={this.props.tripId}
              onMap={true}
            />
            <span className={styles.travelExplain}>
              Arrive here.
              <a href='#' onClick={() => this.toggleFocus(true)}>
                Go to departure point
              </a>
            </span>
          </Popup>
        </Marker>

        <Marker
          position={travel.from}
          icon={generateTravelIcon(travel.travel_rgb, travel.mode, false)}
          ref={this.fromMarker}
          draggable={true}
          onDragend={e => this.submitUpdatedLocation(e, true)}
        >
          <Popup>
            <TravelCard travel={travel} onMap={true} />
            <span className={styles.travelExplain}>
              Depart from here.
              <a href='#' onClick={() => this.toggleFocus(false)}>
                Go to destination point
              </a>
            </span>
          </Popup>
        </Marker>
      </>
    );
  }
}

export default TravelMarkerPair;
