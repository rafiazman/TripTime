/** @format */

import React from 'react';
import styles from '../css/chat-box.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment,
  faCaretSquareUp,
  faCaretSquareDown,
} from '@fortawesome/free-regular-svg-icons';

export default class ChatBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newMessageNum: 1,
      popUp: true,
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
    return (
      <div className={styles.chatBox}>
        <div className={styles.chatBoxHead} onClick={() => this.togglePop()}>
          <FontAwesomeIcon icon={faComment} />
          {!this.state.popUp && this.state.newMessageNum > 0 && (
            <span className={styles.newMessageNum}>
              {this.state.newMessageNum}
            </span>
          )}
          <FontAwesomeIcon
            icon={this.state.popUp ? faCaretSquareDown : faCaretSquareUp}
            className={styles.popButton}
          />
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
