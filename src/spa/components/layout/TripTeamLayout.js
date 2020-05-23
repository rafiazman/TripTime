/** @format */

import React from 'react';
import styles from '../../css/layout.module.css';
import SideBar from './SideBar';
import ChatBox from '../chat/ChatBox';
import PropTypes from 'prop-types';
import { AuthContext } from '../../contexts/AuthContext';

import axios from '../../app/axios';
import Echo from 'laravel-echo';
// eslint-disable-next-line no-unused-vars
import Pusher from 'pusher-js'; // required to be in scope for Laravel Echo

export default class TripTeamLayout extends React.Component {
  componentDidMount() {
    // Create connection to backend Laravel Echo
    window.laravelEcho = new Echo({
      broadcaster: 'pusher',
      key: process.env.PUSHER_APP_KEY,
      cluster: process.env.PUSHER_APP_CLUSTER,
      encrypted: true,
      authorizer: channel => {
        return {
          authorize: (socketId, callback) => {
            axios
              .post('/broadcasting/auth', {
                socket_id: socketId,
                channel_name: channel.name,
              })
              .then(response => {
                callback(false, response.data);
              })
              .catch(error => {
                callback(true, error);
              });
          },
        };
      },
    });
  }

  render() {
    return (
      <div className={styles.tripTeamContainer}>
        <SideBar activeLink={this.props.activeLink} />
        <main>
          {this.props.children}
          <AuthContext.Consumer>
            {({ currentUser }) =>
              currentUser && <ChatBox tripId={this.props.tripID} />
            }
          </AuthContext.Consumer>
        </main>
      </div>
    );
  }
}

TripTeamLayout.propTypes = {
  children: PropTypes.node.isRequired,
  activeLink: PropTypes.string.isRequired,
  tripID: PropTypes.string.isRequired,
};
