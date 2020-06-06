/** @format */

import NotesCard from './NotesCard';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../../css/event-card.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
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
import ActivityDetailsDialog from './ActivityDetailsDialog';
import moment from 'moment';
import ErrorDialog from '../dialog/ErrorDialog';
import { ActivityIcon } from './ActivityIcon';
import { TripContext } from '../../contexts/TripContext';
import UpdateProcessing from './UpdateProcessing';
import JoinButton from './JoinButton';
import DeleteActivityButton from './DeleteActivityButton';

export default function ActivityCard(props) {
  const activity = props.activity;
  const activityID = props.activity.id;

  const [startChanging, setStartChanging] = useState(false);
  const [endChanging, setEndChanging] = useState(false);
  const [editing, setEditing] = useState(false);
  const [notePopped, setNotePopped] = useState(false);
  const [timeError, setTimeError] = useState(undefined);
  const [timeErrorDisplay, setTimeErrorDisplay] = useState(false);
  const [editProcessing, setEditProcessing] = useState(false);
  const [deleteProcessing, setDeleteProcessing] = useState(false);

  const toggleNotes = () => {
    setNotePopped(!notePopped);
  };

  const handleEdit = (activityPatch, updateOneActivity) => {
    if (checkTimeValid(activityPatch)) {
      setEditProcessing(true);
      updateOneActivity(activityPatch, activityID).then(() =>
        setEditProcessing(false),
      );
    } else {
      setTimeErrorDisplay(true);
    }
  };

  const handleDelete = deleteOneActivity => {
    return activityID => {
      setDeleteProcessing(true);
      deleteOneActivity(activityID).then(() => setDeleteProcessing(false));
    };
  };

  const checkTimeValid = ({ start, end }) => {
    if (start && moment(start).isBefore(moment())) {
      setTimeError('Activity plan should start in the future');
      return false;
    }

    if (end && moment(start ? start : activity.start).isAfter(moment(end))) {
      setTimeError('Activity should end after it starts!');
      return false;
    }
    if (start && moment(start).isAfter(moment(end ? end : activity.end))) {
      setTimeError('Activity should start before it ends!');
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
              {editProcessing || deleteProcessing ? (
                <UpdateProcessing
                  message={
                    deleteProcessing
                      ? 'Deleting Activity...'
                      : 'Updating Activity'
                  }
                />
              ) : (
                <TripContext.Consumer>
                  {({ updateOneActivity, deleteOneActivity }) => {
                    return (
                      <div className={onMap ? styles.cardOnMap : undefined}>
                        <strong>
                          <ActivityIcon type={activity.type} /> {activity.name}
                        </strong>
                        <PeopleList
                          people={activity.people}
                          addComponent={
                            currentUser &&
                            !activity.people.find(
                              person => person.id === currentUser.id,
                            ) && (
                              <JoinButton
                                eventType={'activity'}
                                eventID={activityID}
                              />
                            )
                          }
                        />

                        <div className={styles.startTime}>
                          <FontAwesomeIcon
                            icon={faClock}
                            style={{ verticalAlign: 'middle' }}
                            onClick={() => setStartChanging(true)}
                          />
                          <span
                            style={{ margin: '0 5px', verticalAlign: 'middle' }}
                          >
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
                            onChange={start => {
                              handleEdit({ start }, updateOneActivity);
                            }}
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
                            onChange={end =>
                              handleEdit({ end }, updateOneActivity)
                            }
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

                        <div style={{ margin: '15px 0' }}>
                          {activity.description}
                        </div>

                        <div className={styles.options}>
                          <span onClick={() => setEditing(true)}>
                            <Tooltip
                              text='Edit'
                              component={<FontAwesomeIcon icon={faPencilAlt} />}
                            />
                          </span>

                          {editing && (
                            <ActivityDetailsDialog
                              activity={activity}
                              onCancel={() => setEditing(false)}
                              open={editing}
                              onOk={activity => {
                                handleEdit(activity, updateOneActivity);
                                setEditing(false);
                              }}
                            />
                          )}

                          <span onClick={() => toggleNotes()}>
                            {notePopped ? (
                              <Tooltip
                                text={'Hide Notes'}
                                component={
                                  <FontAwesomeIcon icon={faChevronCircleUp} />
                                }
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
                          <DeleteActivityButton
                            activityId={activity.id}
                            onDelete={activityID =>
                              handleDelete(deleteOneActivity)(activityID)
                            }
                          />
                        </div>
                      </div>
                    );
                  }}
                </TripContext.Consumer>
              )}

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
};
