/** @format */

import React from 'react';
import styles from '../../css/chat-box.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';
import ChatMessageList from './ChatMessageList';
import ChatInputForm from './ChatInputForm';

import chatMessages from '../../app/dummy-data/chat-messages';

const headBackgroundStyle = {
  backgroundImage: `linear-gradient(to right, rgba(244,244,244,0.9), rgba(244,244,244,0.9)),
url('/img/menu-bg/chat-bar.jpg')`,
};

export default class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessageNum: 1,
      popUp: false,
      messages: [],
    };
    this.handleIncomingNewMessages = this.handleIncomingNewMessages.bind(this);
    this.handleMyNewMessage = this.handleMyNewMessage.bind(this);
  }

  togglePop() {
    this.setState(state => ({
      popUp: !state.popUp,
      newMessageNum: 0,
    }));
  }

  handleIncomingNewMessages(incomeMessages) {
    this.setState(state => ({
      newMessageNum: state.newMessageNum + incomeMessages.length,
      messages: state.messages.concat(incomeMessages),
    }));
  } // This is the method to take care of API call for new message

  handleMyNewMessage(myNewMessage) {
    this.setState(state => ({
      newMessageNum: 0,
      messages: [...state.messages, myNewMessage],
      // Also need to submit it to the backend here
    }));
  }

  getCurrentUser() {
    return {
      id: 1236,
      name: 'Bob',
      avatarPath: '/img/avatar/avatar2.jpg',
    };
  } // this is the method to figure out who's the current user

  componentDidMount() {
    this.handleIncomingNewMessages(chatMessages);
  }

  render() {
    const alerting = !this.state.popUp && this.state.newMessageNum > 0;
    const popUp = this.state.popUp;
    return (
      <div className={styles.chatBox}>
        <div
          className={styles.chatBoxHead}
          style={headBackgroundStyle}
          onClick={() => this.togglePop()}
        >
          {alerting ? (
            <div className={styles.chatBoxHeadAlert}>
              <FontAwesomeIcon icon={faComment} /> {this.state.newMessageNum}
            </div>
          ) : (
            <FontAwesomeIcon icon={popUp ? faChevronCircleDown : faComment} />
          )}
        </div>
        {this.state.popUp && (
          <div className={styles.chatBoxBody}>
            <ChatMessageList
              messages={this.state.messages}
              userID={this.getCurrentUser().id}
            />
            <ChatInputForm
              newMessageHandler={this.handleMyNewMessage}
              me={this.getCurrentUser()}
            />
          </div>
        )}
      </div>
    );
  }
}
