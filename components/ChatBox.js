/** @format */

import React from 'react';
import styles from '../css/chat-box.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import {
  faChevronCircleUp,
  faChevronCircleDown,
} from '@fortawesome/free-solid-svg-icons';

export default class ChatBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newMessageNum: 1,
      popUp: false,
    };
  }

  togglePop() {
    this.setState(state => ({
      popUp: !state.popUp,
      newMessageNum: 1,
    }));
  }

  addNewMessage(incomeMessageNum) {
    this.setState(state => ({
      newMessageNum: state.newMessageNum + incomeMessageNum,
    }));
  }

  render() {
    const alerting = !this.state.popUp && this.state.newMessageNum > 0;
    const popUp = this.state.popUp;
    return (
      <div className={styles.chatBox}>
        <div className={styles.chatBoxHead} onClick={() => this.togglePop()}>
          {alerting ? (
            <div className={styles.chatBoxHeadAlert}>
              <FontAwesomeIcon icon={faComment} /> {this.state.newMessageNum}
            </div>
          ) : (
            <FontAwesomeIcon
              icon={popUp ? faChevronCircleDown : faChevronCircleUp}
            />
          )}
        </div>
        {this.state.popUp && (
          <div className={styles.chatBoxBody}>
            This is where the chat content comes in
          </div>
        )}
      </div>
    );
  }
}
