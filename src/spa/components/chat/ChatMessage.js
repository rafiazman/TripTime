/** @format */
import React from 'react';
import styles from '../../css/chat-box.module.css';
import PropTypes from 'prop-types';
import moment from 'moment';
const messageTimeFormat = {
  sameDay: '[today ] LT',
  lastDay: '[yesterday ] LT',
  lastWeek: '[last] dddd LT',
  sameElse: 'DD/MM/YYYY [at] LT',
};
export default class ChatMessage extends React.Component {
  render() {
    const message = this.props.chatMessage;
    const messageTime = moment(message.time).calendar(null, messageTimeFormat);
    const isMine = this.props.isMine;

    return (
      <div
        className={
          isMine ? styles.myChatMessageContainer : styles.chatMessageContainer
        }
      >
        <img
          src={message.author.avatarPath}
          className={styles.chatAvatar}
          alt=' '
        />
        <div className={styles.messageInfo}>
          {isMine ? 'You' : message.author.name} · {messageTime}
        </div>
        <div
          className={isMine ? styles.myMessageContent : styles.messageContent}
        >
          {message.content}
        </div>
      </div>
    );
  }
}

ChatMessage.propTypes = {
  chatMessage: PropTypes.object.isRequired,
  isMine: PropTypes.bool.isRequired,
};
