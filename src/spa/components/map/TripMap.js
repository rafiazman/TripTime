/** @format */

import React, { createRef } from 'react';
import { Map, TileLayer, Marker, Popup, withLeaflet } from 'react-leaflet';
import { SearchControl, OpenStreetMapProvider } from 'react-leaflet-geosearch';
import Control from 'react-leaflet-control';
import { IconButton, Button } from '@material-ui/core';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import SaveIcon from '@material-ui/icons/Save';
import { generateActivityIcon, generateTravelIcon } from './MarkerIcon';
import PropTypes from 'prop-types';
import MarkerSplitter from './MarkerSplitter';
import ActivityCard from '../cards/ActivityCard';
import TravelCard from '../cards/TravelCard';
import styles from '../../css/map.module.css';
import axios from 'axios';
import ReactLoading from 'react-loading';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import TravelMarkerPair from './TravelMarkerPair';

export default class TripMap extends React.Component {
  constructor(props) {
    super(props);
    this.map = createRef();
  }

  state = {
    inBrowser: false,
    markers: [],
    activities: [],
    travels: [],
    activityLoading: true,
    travelLoading: true,
  };

  center = [-40.3523, 175.6082];
  zoom = 6;
  centerUpdated = false;

  componentDidMount() {
    this.setState({
      inBrowser: true,
    });
    const hostName = process.env.API_HOSTNAME;
    const tripID = this.props.tripID;

    axios.defaults.withCredentials = true;
    axios
      .get(`${hostName}/api/trip/${tripID}/activities`)
      .then(
        res => this.setState(() => ({ activities: res.data })),
        () => this.setState(() => ({ activities: [] })),
      )
      .then(() => {
        if (this.state.activities.length > 0) {
          this.center = this.state.activities[0].gps;
          this.centerUpdated = true;
          this.zoom = 8;
        }
      })
      .then(() => {
        this.setState(() => ({ activityLoading: false }));
      });

    axios
      .get(`${hostName}/api/trip/${tripID}/travels`)
      .then(
        res =>
          this.setState(() => ({
            travels: res.data.map(travel => {
              return {
                ...travel,
                travel_rgb: generateRandomRGB(),
                isDraggable: false,
              };
            }),
          })),
        () => this.setState(() => ({ travels: [] })),
      )
      .then(() => {
        if (!this.centerUpdated)
          if (this.state.travels.length > 0) {
            this.center = this.state.travels[0].from.gps;
            this.zoom = 8;
          }
      })
      .then(() => {
        this.setState(() => ({ travelLoading: false }));
      });
  }

  onClickAddTravel() {
    this.setState(() => ({ isSaved: false }));
    let travelToAdd = createNewTravel();

    this.setState(prevState => ({
      travels: [...prevState.travels, travelToAdd],
    }));
  }

  render() {
    if (!this.state.inBrowser) {
      return null;
    }

    const activity_markers = this.state.activities.map((v, i) => (
      <Marker key={i} position={v.gps} icon={generateActivityIcon(v.type)}>
        <Popup>
          <ActivityCard
            onMap={true}
            activity={v}
            messageIfNoEvent={''}
            tripId={this.props.tripID}
          />
        </Popup>
      </Marker>
    ));

    const travel_markers = this.state.travels.map((travel, i) => {
      return (
        <TravelMarkerPair travel={travel} key={i} tripId={this.props.tripID} />
      );
    });

    const prov = OpenStreetMapProvider();
    const GeoSearchControlElement = withLeaflet(SearchControl);

    return (
      <>
        <Map ref={this.map} center={this.center} zoom={this.zoom}>
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
          <Control position='topleft'>
            <IconButton
              onClick={() => alert('Local activity button was clicked!')}
            >
              <LocalActivityIcon />
            </IconButton>

            <IconButton onClick={() => this.onClickAddTravel()}>
              <AddLocationIcon />
            </IconButton>
          </Control>
          <MarkerSplitter>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <>
                {travel_markers}
                {activity_markers}
              </>
            </MuiPickersUtilsProvider>
          </MarkerSplitter>
        </Map>
        {(this.state.activityLoading || this.state.travelLoading) && (
          <MapPlanLoading />
        )}
      </>
    );
  }
}

TripMap.propTypes = {
  activities: PropTypes.array,
  travels: PropTypes.array,
  tripID: PropTypes.string.isRequired,
};

function createNewTravel() {
  //Create new travel with required fields to be set by user (WHAT FIELDS ARE IN A TRAVEL AND HOW CAN I GET THEM INPUT BY USER NOW?)
  //Pass in this travel into TravelMarkerPair as a prop
  let date = new Date();
  let from_date = date.toJSON();
  date.setHours(date.getHours() + 1);
  let to_date = date.toJSON();

  const myTravel = {
    mode: 'bus',
    description: 'Enter a description..',
    from: {
      time: from_date,
      lat: '-38.1368',
      lng: '176.2497',
    },
    to: {
      time: to_date,
      lat: '-38.6857',
      lng: '176.0702',
    },
    travel_rgb: generateRandomRGB(),
  };

  return myTravel;
}

function generateRandomRGB() {
  const goldenRatioConjugate = 0.618033988749895;
  let h = Math.random();
  h += goldenRatioConjugate;
  h %= 1;
  return HSVtoRGB(h, 0.95, 0.7);
}

function HSVtoRGB(h, s, v) {
  let r, g, b, i, f, p, q, t;
  const rd = Math.round;
  if (arguments.length === 1) {
    (s = h.s), (v = h.v), (h = h.h);
  }
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      (r = v), (g = t), (b = p);
      break;
    case 1:
      (r = q), (g = v), (b = p);
      break;
    case 2:
      (r = p), (g = v), (b = t);
      break;
    case 3:
      (r = p), (g = q), (b = v);
      break;
    case 4:
      (r = t), (g = p), (b = v);
      break;
    case 5:
      (r = v), (g = p), (b = q);
      break;
  }
  return [rd(r * 255), rd(g * 255), rd(b * 255)];
}

function MapPlanLoading() {
  return (
    <div className={styles.loading}>
      <div>
        <ReactLoading type='spinningBubbles' color='#ff4200' />
        <p> Loading your trip plan...</p>
      </div>
    </div>
  );
}
