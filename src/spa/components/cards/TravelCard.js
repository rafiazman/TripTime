/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../css/travel-card.module.css';
import JoinButton from './JoinButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWalking,
  faBus,
  faPlane,
  faCar,
  faShip,
  faMotorcycle,
  faBicycle,
  faTrain,
  faHorse,
  faChevronCircleUp,
  faChevronCircleDown,
  faPencilAlt,
} from '@fortawesome/free-solid-svg-icons';
import PeopleList from '../people/PeopleList';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import TimeDisplay from '../TimeDisplay';
import Tooltip from '../Tooltip';
import NotesCard from './NotesCard';
import { AuthContext } from '../../contexts/AuthContext';
import { DateTimePicker } from '@material-ui/pickers';
import DeleteTravelButton from './DeleteTravelButton';
import { TripContext } from '../../contexts/TripContext';
import UpdateProcessing from './UpdateProcessing';
import moment from 'moment';
import ErrorDialog from '../dialog/ErrorDialog';
import TravelDetailsDialog from './TravelDetailsDialog';

const travelModeIcons = {
  bus: faBus,
  plane: faPlane,
  car: faCar,
  ship: faShip,
  motorcycle: faMotorcycle,
  train: faTrain,
  bicycle: faBicycle,
  walk: faWalking,
  horse: faHorse,
};

export default class TravelCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startTimeChanging: false,
      endTimeChanging: false,
      notePopped: false,
      unreadNote: false,
      deleteProcessing: false,
      editProcessing: false,
      timeError: undefined,
      timeErrorDisplay: false,
      editing: false,
    };
  }

  toggleNotes() {
    this.setState(state => ({
      notePopped: !state.notePopped,
    }));
  }

  handleDelete(deleteOneTravel) {
    return travelID => {
      this.setState(() => ({ deleteProcessing: true }));
      deleteOneTravel(travelID).then(() =>
        this.setState(() => ({ deleteProcessing: false })),
      );
    };
  }

  handleTravelEdit(travelPatch, updateOneTravel) {
    if (this.checkTimeValid(travelPatch)) {
      this.setState(() => ({ editProcessing: true }));
      updateOneTravel(
        {
          ...travelPatch,
          to: { time: travelPatch.end },
          from: { time: travelPatch.start },
        },
        this.props.travel.id,
      ).then(() => this.setState(() => ({ editProcessing: false })));
    } else {
      this.setState(() => ({ timeErrorDisplay: true }));
    }
  }

  checkTimeValid({ start, end }) {
    if (start && moment(start).isBefore(moment())) {
      this.setState(() => ({
        timeError: 'Travel plan should start in the future',
      }));
      return false;
    }

    if (
      end &&
      moment(start ? start : this.props.travel.start).isAfter(moment(end))
    ) {
      this.setState(() => ({
        timeError: 'Travel should end after it starts!',
      }));
      return false;
    }
    if (
      start &&
      moment(start).isAfter(moment(end ? end : this.props.travel.end))
    ) {
      this.setState(() => ({
        timeError: 'Travel should start before it ends!',
      }));
      return false;
    }
    return true;
  }

  render() {
    const travel = this.props.travel;

    return (
      <AuthContext.Consumer>
        {({ currentUser }) => {
          return (
            <TripContext.Consumer>
              {({ deleteOneTravel, updateOneTravel }) =>
                this.state.deleteProcessing || this.state.editProcessing ? (
                  <UpdateProcessing
                    message={
                      this.state.deleteProcessing
                        ? 'Deleting Travel...'
                        : 'Updating Travel...'
                    }
                  />
                ) : (
                  <div className={styles.travelCard}>
                    <div className={styles.travelTitle}>
                      <FontAwesomeIcon
                        icon={travelModeIcons[travel.mode]}
                        style={{ verticalAlign: 'middle', margin: '0 5px 0 0' }}
                      />
                      <span style={{ verticalAlign: 'middle' }}>
                        {travel.description}
                      </span>
                    </div>

                    <PeopleList
                      people={travel.people}
                      addComponent={
                        currentUser &&
                        !travel.people.find(
                          person => person.id === currentUser.id,
                        ) && (
                          <JoinButton
                            eventType={'travel'}
                            eventID={travel.id}
                          />
                        )
                      }
                    />
                    <div
                      className={styles.time}
                      style={{ marginBottom: '10px', marginTop: '5px' }}
                    >
                      <div>
                        <FontAwesomeIcon
                          icon={faClock}
                          style={{ verticalAlign: 'middle' }}
                          onClick={() =>
                            this.setState(() => ({ startTimeChanging: true }))
                          }
                        />
                        <span
                          style={{ margin: '0 5px', verticalAlign: 'middle' }}
                        >
                          Departs:
                        </span>
                        <TimeDisplay time={travel.start} />
                      </div>

                      <div>
                        <FontAwesomeIcon
                          icon={faClock}
                          style={{ verticalAlign: 'middle' }}
                          onClick={() =>
                            this.setState(() => ({ endTimeChanging: true }))
                          }
                        />
                        <span
                          style={{ margin: '0 5px', verticalAlign: 'middle' }}
                        >
                          Arrives:
                        </span>
                        <TimeDisplay time={travel.end} />
                      </div>
                    </div>
                    {this.state.timeErrorDisplay && (
                      <ErrorDialog
                        open={this.state.timeErrorDisplay}
                        message={this.state.timeError}
                        title={'Invalid Time'}
                        onClose={() =>
                          this.setState(() => ({
                            timeError: undefined,
                            timeErrorDisplay: false,
                          }))
                        }
                      />
                    )}
                    {this.state.startTimeChanging && (
                      <DateTimePicker
                        value={travel.start}
                        ampm={false}
                        onChange={start => {
                          this.handleTravelEdit({ start }, updateOneTravel);
                        }}
                        open={this.state.startTimeChanging}
                        onClose={() =>
                          this.setState(() => ({ startTimeChanging: false }))
                        }
                        TextFieldComponent={() => null}
                        showTodayButton
                      />
                    )}
                    {this.state.endTimeChanging && (
                      <DateTimePicker
                        value={travel.end}
                        ampm={false}
                        onChange={end =>
                          this.handleTravelEdit({ end }, updateOneTravel)
                        }
                        open={this.state.endTimeChanging}
                        onClose={() =>
                          this.setState(() => ({ endTimeChanging: false }))
                        }
                        TextFieldComponent={() => null}
                        showTodayButton
                      />
                    )}

                    <div className={styles.options}>
                      <span
                        onClick={() => this.setState(() => ({ editing: true }))}
                      >
                        <Tooltip
                          text={'Edit'}
                          component={<FontAwesomeIcon icon={faPencilAlt} />}
                        />
                      </span>

                      {this.state.editing && (
                        <TravelDetailsDialog
                          travel={travel}
                          onCancel={() =>
                            this.setState(() => ({ editing: false }))
                          }
                          open={this.state.editing}
                          onOk={travel => {
                            this.handleTravelEdit(travel, updateOneTravel);
                            this.setState(() => ({ editing: false }));
                          }}
                        />
                      )}

                      <span onClick={() => this.toggleNotes()}>
                        {this.state.notePopped ? (
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

                      <DeleteTravelButton
                        travelId={travel.id}
                        onDelete={travelID => {
                          this.handleDelete(deleteOneTravel)(travelID);
                        }}
                      />
                    </div>

                    {this.state.notePopped && (
                      <NotesCard
                        type={{ name: 'travel', id: travel.id }}
                        notes={travel.notes}
                        me={currentUser}
                        className={styles.noteCard}
                      />
                    )}
                  </div>
                )
              }
            </TripContext.Consumer>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}

TravelCard.propTypes = {
  travel: PropTypes.object.isRequired,
  tripId: PropTypes.number,
  onMap: PropTypes.bool.isRequired,
};
