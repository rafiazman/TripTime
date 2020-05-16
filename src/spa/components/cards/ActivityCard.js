/** @format */

import NotesCard from './NotesCard';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../../css/event-card.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faChevronCircleUp,
  faChevronCircleDown,
  faPencilAlt,
} from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import PeopleList from '../people/PeopleList';
import TimeDisplay from '../TimeDisplay';
import Tooltip from '../Tooltip';
import { AuthContext } from '../../contexts/AuthContext';
import { DateTimePicker } from '@material-ui/pickers';
import axios from 'axios';
import ActivityDetailsDialog from './ActivityDetailsDialog';
import moment from 'moment';
import ErrorDialog from '../dialog/ErrorDialog';
import { ActivityIcon } from './ActivityIcon';

export default function ActivityCard(props) {
  const [activity, setActivity] = useState(props.activity);
  const [startChanging, setStartChanging] = useState(false);
  const [endChanging, setEndChanging] = useState(false);
  const [editing, setEditing] = useState(false);
  const [notePopped, setNotePopped] = useState(false);
  const [timeError, setTimeError] = useState(undefined);
  const [timeErrorDisplay, setTimeErrorDisplay] = useState(false);
  const [requestError, setRequestError] = useState(undefined);
  const [requestErrorDisplay, setRequestErrorDisplay] = useState(false);
  const tripId = props.tripId;
  const activityId = props.activity.id;

  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  const toggleNotes = () => {
    setNotePopped(!notePopped);
  };

  const handleEdit = activityPatch => {
    if (checkTimeValid(activityPatch))
      axios
        .patch(`${process.env.API_HOSTNAME}/api/trip/${tripId}/activities`, {
          id: activityId,
          ...activityPatch,
        })
        .then(res => {
          setActivity(res.data.activity);
        })
        .catch(err => {
          setRequestError(
            `Sorry, we failed to update the activity ${
              activityPatch.name
            } ${err.response &&
              err.response.data &&
              err.response.data.message &&
              'because' + err.response.data.message}`,
          );
          setRequestErrorDisplay(true);
        });
    else {
      setTimeErrorDisplay(true);
    }
  };

  const checkTimeValid = ({ start, end }) => {
    if (start && moment(start).isBefore(moment())) {
      setTimeError('Activity plan should start in the future');
      return false;
    }

    if (end && moment(activity.start).isAfter(moment(end))) {
      setTimeError('Activity should end after it starts');
      return false;
    }
    return true;
  };

  const messageIfNoEvent = props.messageIfNoEvent;
  const onMap = props.onMap;
  if (activity) {
    return (
      <AuthContext.Consumer>
        {({ currentUser }) => {
          return (
            <div
              className={styles.eventCard}
              style={onMap ? { border: '0' } : {}}
            >
              <div className={onMap ? styles.cardOnMap : undefined}>
                <strong>
                  <ActivityIcon type={activity.type} /> {activity.name}
                </strong>
                <PeopleList people={activity.people} />

                <div className={styles.startTime}>
                  <FontAwesomeIcon
                    icon={faClock}
                    style={{ verticalAlign: 'middle' }}
                    onClick={() => setStartChanging(true)}
                  />
                  <span style={{ margin: '0 5px', verticalAlign: 'middle' }}>
                    From:
                  </span>
                  <TimeDisplay time={activity.start} />
                </div>

                <div
                  className={styles.endTime}
                  onClick={() => setEndChanging(true)}
                >
                  <FontAwesomeIcon
                    icon={faClock}
                    style={{ verticalAlign: 'middle' }}
                  />
                  <span
                    style={{
                      margin: '0 27px 0px 5px',
                      verticalAlign: 'middle',
                    }}
                  >
                    To:
                  </span>
                  <TimeDisplay time={activity.end} />
                </div>

                {startChanging && (
                  <DateTimePicker
                    value={activity.start}
                    ampm={false}
                    onChange={start => handleEdit({ start })}
                    open={startChanging}
                    onClose={() => setStartChanging(false)}
                    TextFieldComponent={() => null}
                    showTodayButton
                  />
                )}
                {endChanging && (
                  <DateTimePicker
                    value={activity.end}
                    ampm={false}
                    onChange={end => handleEdit({ end })}
                    open={endChanging}
                    onClose={() => setEndChanging(false)}
                    TextFieldComponent={() => null}
                    showTodayButton
                  />
                )}
                {timeErrorDisplay && (
                  <ErrorDialog
                    open={timeErrorDisplay}
                    message={timeError}
                    title={'Invalid Time'}
                    onClose={() => {
                      setTimeError(undefined);
                      setTimeErrorDisplay(false);
                    }}
                  />
                )}

                {requestErrorDisplay && (
                  <ErrorDialog
                    open={requestErrorDisplay}
                    message={requestError}
                    title={'Activity Update Failed'}
                    onClose={() => {
                      setRequestError(undefined);
                      setRequestErrorDisplay(false);
                    }}
                  />
                )}

                <div style={{ marginTop: '15px' }}>{activity.description}</div>

                <div className={onMap ? styles.optionsOnMap : styles.options}>
                  <span onClick={() => setEditing(true)}>
                    <Tooltip
                      text={'Edit Activity'}
                      component={<FontAwesomeIcon icon={faPencilAlt} />}
                    />
                  </span>
                  {editing && (
                    <ActivityDetailsDialog
                      activity={activity}
                      onCancel={() => setEditing(false)}
                      open={editing}
                      onOk={activity => {
                        handleEdit(activity);
                        setEditing(false);
                      }}
                    />
                  )}
                  {!onMap && (
                    <span>
                      <Tooltip
                        text={'Show on Map'}
                        component={<FontAwesomeIcon icon={faMapMarkerAlt} />}
                      />
                    </span>
                  )}
                  <span onClick={() => toggleNotes()}>
                    {notePopped ? (
                      <Tooltip
                        text={'Hide Notes'}
                        component={<FontAwesomeIcon icon={faChevronCircleUp} />}
                      />
                    ) : (
                      <Tooltip
                        text={'Show Notes'}
                        component={
                          <FontAwesomeIcon icon={faChevronCircleDown} />
                        }
                      />
                    )}
                  </span>
                </div>
              </div>
              {notePopped && (
                <NotesCard
                  type={{ name: 'activity', id: activity.id }}
                  notes={activity.notes}
                  me={currentUser}
                  onMap={onMap}
                />
              )}
            </div>
          );
        }}
      </AuthContext.Consumer>
    );
  } else {
    return <p>{messageIfNoEvent ? messageIfNoEvent : 'No upcoming events'}</p>;
  }
}

ActivityCard.propTypes = {
  activity: PropTypes.object,
  messageIfNoEvent: PropTypes.string,
  onMap: PropTypes.bool.isRequired,
  tripId: PropTypes.string,
};
