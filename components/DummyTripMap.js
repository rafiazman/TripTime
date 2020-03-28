import React from 'react';
import styles from '../css/map.module.css';
import PropTypes from 'prop-types';
import MapMarker from "./MapMarker";


function TripMap({activities}) {

  return <div className={styles.map}>
    <img  src="/dummy-img/fake-map.png" alt="map" width="1265px" height="560px"/>

    {/*{activities.map((activity, index) => <MapMarker key = {index} activity={activity}/>)}*/}
    <MapMarker key = {0} dummyKey = {0} activity={activities[0]}/>
    <MapMarker key = {1} dummyKey = {1} activity={activities[1]}/>
    <MapMarker key = {2} dummyKey = {2} activity={activities[2]}/>


  </div>

}

TripMap.propTypes = {
  activities: PropTypes.array.isRequired
};

export default TripMap;

