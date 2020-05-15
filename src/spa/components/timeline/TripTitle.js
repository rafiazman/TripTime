/** @format */

import React, { useState } from 'react';
import styles from '../../css/trip-summary.module.css';
import PropTypes from 'prop-types';
import PeopleList from '../people/PeopleList';
import AddPeopleDialog from '../people/AddPeopleDialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '../Tooltip';

export default function TripTitle(props) {
  const [adding, setAdding] = useState(false);
  return (
    <div className={styles.tripTitleContainer}>
      <h1 className={styles.tripName}>{props.name}</h1>
      <p>{props.description}</p>
      <PeopleList
        people={props.people}
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
                tripID={props.id}
                onCancel={() => setAdding(false)}
              />
            )}
          </>
        }
      />
    </div>
  );
}

TripTitle.propTypes = {
  name: PropTypes.string.isRequired,
  people: PropTypes.array.isRequired,
  description: PropTypes.string,
  id: PropTypes.string.isRequired,
};
