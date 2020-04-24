/** @format */
import React from 'react';
import styles from '../../css/chat-box.module.css';
import PropTypes from 'prop-types';

export default class ChatInputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
    const newMessage = {
      content: this.state.value,
      author: this.props.me,
      time: new Date(),
      id: null, // This needs to be generated when storing it into the database
    };
    this.props.newMessageHandler(newMessage);
    this.setState({ value: '' });
    event.preventDefault();
  }
  render() {
    return (
      <form className={styles.chatInputForm}>
        <input
          type='text'
          value={this.state.value}
          className={styles.chatInput}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleSubmit} disabled={!this.state.value}>
          Send
        </button>
      </form>
    );
  }
}

ChatInputForm.propTypes = {
  me: PropTypes.object.isRequired,
  newMessageHandler: PropTypes.func.isRequired,
};
