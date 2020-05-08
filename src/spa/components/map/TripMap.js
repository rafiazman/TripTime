/** @format */

import React, { createRef } from 'react';
import { Map, TileLayer, Marker, Popup, withLeaflet } from 'react-leaflet';
import { SearchControl, OpenStreetMapProvider } from 'react-leaflet-geosearch';
import { generateActivityIcon, generateTravelIcon } from './MarkerIcon';
import PropTypes from 'prop-types';
import MarkerSplitter from './MarkerSplitter';
import ActivityCard from '../cards/ActivityCard';
import TravelCard from '../cards/TravelCard';
import styles from '../../css/map.module.css';
import axios from 'axios';
import ReactLoading from 'react-loading';

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
              return { ...travel, travel_rgb: generateRandomRGB() };
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

  render() {
    if (!this.state.inBrowser) {
      return null;
    }

    const activity_markers = this.state.activities.map((v, i) => (
      <Marker key={i} position={v.gps} icon={generateActivityIcon(v.type)}>
        <Popup>
          <ActivityCard onMap={true} activity={v} messageIfNoEvent={''} />
        </Popup>
      </Marker>
    ));

    const travelMarkers = this.state.travels.map((travel, i) => (
      <TravelMarkerPair travel={travel} key={i} />
    ));

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
          <MarkerSplitter>
            {travelMarkers}
            {activity_markers}
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

function generateRandomRGB() {
  const goldenRatioConjugate = 0.618033988749895;
  let h = Math.random();
  h += goldenRatioConjugate;
  h %= 1;
  return HSVtoRGB(h, 0.95, 0.7);
}

class TravelMarkerPair extends React.Component {
  static propTypes = {
    travel: PropTypes.object.isRequired,
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

  render() {
    const travel = this.props.travel;
    return (
      <>
        <Marker
          position={travel.to}
          icon={generateTravelIcon(travel.travel_rgb, travel.mode, true)}
          ref={this.toMarker}
        >
          <Popup>
            <TravelCard travel={travel} />
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
        >
          <Popup>
            <TravelCard travel={travel} />
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
