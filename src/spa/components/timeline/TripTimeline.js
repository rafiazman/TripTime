/** @format */

import React from 'react';
import styles from '../../css/timeline.module.css';
import ActivityCard from '../cards/ActivityCard';
import TravelCard from '../cards/TravelCard';
import ReactLoading from 'react-loading';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { TripContext } from '../../contexts/TripContext';

export default function TripTimeline() {
  const populateTimeline = (activities, travels, tripID) => {
    const events = [...activities, ...travels].sort((a, b) =>
      a.start.localeCompare(b.start),
    );
    let left = true;
    return events.map((event, index) => {
      if (event.type === 'travel')
        return (
          <div key={index} className={styles.travelCardContainer}>
            <div className={styles.travelCard}>
              <TravelCard travel={event} tripId={tripID} onMap={false} />
            </div>
          </div>
        );
      else {
        left = !left;
        return (
          <div
            key={index}
            className={left ? styles.timelineLeft : styles.timelineRight}
          >
            <ActivityCard onMap={false} activity={event} onClose={null} />
          </div>
        );
      }
    });
  };

  return (
    <TripContext.Consumer>
      {({
        activities,
        activitiesLoading,
        travels,
        travelsLoading,
        trip,
        tripLoading,
      }) => (
        <div className={styles.tripTimelineContainer}>
          <div className={styles.tripTimeline}>
            {activitiesLoading || travelsLoading || tripLoading ? (
              <div className={styles.timelineLoading}>
                <ReactLoading type='spinningBubbles' color='#ff4200' />
                <p> Loading the timeline...</p>
              </div>
            ) : (
              <MuiPickersUtilsProvider utils={MomentUtils}>
                {populateTimeline(
                  activities,
                  travels.map(travel => {
                    travel.type = 'travel';
                    return travel;
                  }),
                  trip.id,
                )}
              </MuiPickersUtilsProvider>
            )}
            <div className={styles.line} />
          </div>
        </div>
      )}
    </TripContext.Consumer>
  );
}
