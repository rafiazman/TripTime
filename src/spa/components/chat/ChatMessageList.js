/** @format */
import React from 'react';
import styles from '../../css/chat-box.module.css';
import PropTypes from 'prop-types';
import ChatMessage from './ChatMessage';
import ScrollToBottom from 'react-scroll-to-bottom';

export default class ChatMessageList extends React.Component {
  render() {
    const messages = this.props.messages;
    return (
      <ScrollToBottom className={styles.messageListContainer}>
        {messages.map((message, index) => (
          <ChatMessage
            chatMessage={message}
            key={index}
            isMine={message.author.id === this.props.userID}
          />
        ))}
      </ScrollToBottom>
    );
  }
}

ChatMessageList.propTypes = {
  messages: PropTypes.array.isRequired,
  userID: PropTypes.number.isRequired,
};
