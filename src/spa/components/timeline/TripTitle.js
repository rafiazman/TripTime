/** @format */

import React, { useState } from 'react';
import styles from '../../css/trip-summary.module.css';
import PeopleList from '../people/PeopleList';
import AddPeopleDialog from '../people/AddPeopleDialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '../Tooltip';
import { TripContext } from '../../contexts/TripContext';

export default function TripTitle() {
  const [adding, setAdding] = useState(false);
  return (
    <TripContext.Consumer>
      {({ tripLoading, trip }) => {
        return (
          !tripLoading && (
            <div className={styles.tripTitleContainer}>
              <h1 className={styles.tripName}>{trip.name}</h1>
              <p>{trip.description}</p>
              <PeopleList
                people={trip.participants}
                addComponent={
                  <>
                    <Tooltip
                      component={
                        <div
                          className={styles.addButton}
                          onClick={() => setAdding(true)}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </div>
                      }
                      text={'add new participant'}
                    />
                    {adding && (
                      <AddPeopleDialog
                        tripID={trip.id}
                        onCancel={() => setAdding(false)}
                      />
                    )}
                  </>
                }
              />
            </div>
          )
        );
      }}
    </TripContext.Consumer>
  );
}
