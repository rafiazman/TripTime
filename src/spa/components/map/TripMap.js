/** @format */

import React, { createRef } from 'react';
import { Map, TileLayer, Marker, Popup, withLeaflet } from 'react-leaflet';
import { SearchControl, OpenStreetMapProvider } from 'react-leaflet-geosearch';
import Control from 'react-leaflet-control';
import { IconButton } from '@material-ui/core';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import { generateActivityIcon } from './MarkerIcon';
import PropTypes from 'prop-types';
import MarkerSplitter from './MarkerSplitter';
import ActivityCard from '../cards/ActivityCard';
import styles from '../../css/map.module.css';
import axios from '../../app/axios';
import ReactLoading from 'react-loading';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import TravelMarkerPair from './TravelMarkerPair';

export default class TripMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      map: {
        instance: createRef(),
        center: [-40.3523, 175.6082],
        zoom: 6,
      },
      inBrowser: false,
      activities: [],
      travels: [],
      activityLoading: true,
      travelLoading: true,
    };
  }

  componentDidMount() {
    const tripID = this.props.tripID;
    if (!tripID) return;

    this.setState({
      inBrowser: true,
    });

    axios
      .get(`/trip/${tripID}/activities`)
      .then(res => {
        const activities = res.data;
        this.setState(state => ({
          map: {
            ...state.map,
            center: [activities[0].gps.lat, activities[0].gps.lng],
            zoom: 8,
          },
          activities: activities,
        }));
      })
      .then(() => {
        this.setState(() => ({ activityLoading: false }));
      });

    axios
      .get(`/trip/${tripID}/travels`)
      .then(res => {
        const travels = res.data;

        this.setState(state => ({
          map: {
            ...state.map,
            center: [travels[0].from.lat, travels[0].from.lng],
            zoom: 8,
          },
          travels: travels.map(t => {
            return {
              ...t,
              travel_rgb: generateRandomRGB(),
            };
          }),
        }));
      })
      .then(() => {
        this.setState(() => ({ travelLoading: false }));
      });
  }

  addTravel() {
    function createNewTravel() {
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

    let travelToAdd = createNewTravel();

    this.setState(prevState => ({
      travels: [...prevState.travels, travelToAdd],
    }));
  }

  submitUpdatedActivity(e, id) {
    const tripId = this.props.tripID;
    const { lat, lng } = e.target.getLatLng();

    axios.patch(`/trip/${tripId}/activities`, {
      id: id,
      location: {
        lat: lat.toString(),
        lng: lng.toString(),
      },
    });
  }

  render() {
    if (!this.state.inBrowser) {
      return null;
    }

    const activity_markers = this.state.activities.map((a, i) => (
      <Marker
        key={i}
        position={a.gps}
        icon={generateActivityIcon(a.type)}
        draggable={true}
        onDragEnd={e => this.submitUpdatedActivity(e, a.id)}
      >
        <Popup>
          <ActivityCard
            onMap={true}
            activity={a}
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

    const prov = new OpenStreetMapProvider();
    const GeoSearchControlElement = withLeaflet(SearchControl);

    return (
      <>
        <Map
          ref={this.state.map.instance}
          center={this.state.map.center}
          zoom={this.state.map.zoom}
        >
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

            <IconButton onClick={() => this.addTravel()}>
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

function generateRandomRGB() {
  const goldenRatioConjugate = 0.618033988749895;
  let h = Math.random();
  h += goldenRatioConjugate;
  h %= 1;

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

  return HSVtoRGB(h, 0.95, 0.7);
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
