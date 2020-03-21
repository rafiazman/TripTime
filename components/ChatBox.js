/** @format */

import React from 'react';
import styles from '../css/chat-box.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class ChatBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newMessage: 0,
      popUp: true,
    };
  }

  togglePop() {
    this.setState(state => ({
      popUp: !state.popUp,
      newMessage: 0,
    }));
  }

  addNewMessage(messageNum) {
    this.setState(state => ({
      newMessage: state.newMessage + messageNum,
    }));
  }

  render() {
    return (
      <div style={styles.chatBox}>
        <div style={styles.chatBoxHead} onClick={() => this.togglePop()}>
          <FontAwesomeIcon icon={['far', 'comment']} />
        </div>
        {this.state.popUp && (
          <div style={styles.chatBoxBody}>
            This is where the chat content comes in
          </div>
        )}
      </div>
    );
  }
}
