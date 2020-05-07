/** @format */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../css/note.module.css';
import TimeAgo from 'react-timeago/lib';
// import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import Tooltip from './Tooltip';

class NotesCard extends React.Component {
  render() {
    const notes = this.props.notes;
    return (
      <div className={styles.notesCard}>
        {notes.length < 1 ? (
          <div className={styles.noNote}>
            Your friends have not added notes to this activity yet...
          </div>
        ) : (
          <div className={styles.friendNotes}>
            {notes.map((note, index) => {
              if (note.author.id !== this.props.me.id)
                return <OneNote key={index} note={note} />;
            })}
          </div>
        )}
        <MyNote
          note={notes.find(note => note.author.id === this.props.me.id)}
          me={this.props.me}
        />
      </div>
    );
  }
}

NotesCard.propTypes = {
  notes: PropTypes.array.isRequired,
  me: PropTypes.object.isRequired,
};

class OneNote extends React.Component {
  render() {
    const note = this.props.note;
    return (
      <div className={styles.oneNote}>
        <div className={styles.authorField}>
          <img className='inline-avatar' src={note.author.avatarPath} alt='' />
          <span> &nbsp;{note.author.name}, </span>
          <TimeAgo
            date={note.updated}
            minPeriod={10}
            className={styles.timeUpdated}
          />
          :
        </div>
        <div>
          <p>{note.content}</p>
        </div>
      </div>
    );
  }
}

OneNote.propTypes = {
  note: PropTypes.object.isRequired,
};

function EditNote(props) {
  const [noteInput, setNoteInput] = useState(props.noteContent);
  return (
    <div className={styles.myNoteContainer}>
      <div className={styles.addNoteField}>
        <textarea
          rows={3}
          className={styles.noteInput}
          placeholder='Enter your note to friends here'
          value={noteInput}
          onChange={e => {
            setNoteInput(e.target.value);
          }}
        />
        <button
          className={styles.addNoteButton}
          onClick={() => props.noteHandler(noteInput)}
        >
          Update my note
        </button>
      </div>
    </div>
  );
}

EditNote.propTypes = {
  noteContent: PropTypes.string.isRequired,
  noteHandler: PropTypes.func.isRequired,
};

class MyNote extends React.Component {
  static propTypes = {
    note: PropTypes.object,
    me: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { myNote: this.props.note, editing: false };
  }

  render() {
    if (!this.state.myNote || this.state.editing)
      return (
        <EditNote
          noteContent={this.state.myNote ? this.state.myNote.content : ''}
          noteHandler={this.updateMyNote()}
        />
      );
    else
      return (
        <div className={styles.myNoteContainer}>
          <span> Your Note, </span>
          <TimeAgo
            date={this.state.myNote.updated}
            minPeriod={10}
            className={styles.timeUpdated}
          />
          <Tooltip
            text='Edit Note'
            component={
              <FontAwesomeIcon
                icon={faPencilAlt}
                onClick={e => {
                  this.startEditing(e);
                }}
                className={styles.editIcon}
              />
            }
          />
          <div>{this.state.myNote.content}</div>
        </div>
      );
  }

  startEditing() {
    this.setState(() => ({ editing: true }));
  }

  updateMyNote() {
    const that = this;
    return function(newContent) {
      that.setState(() => ({
        myNote: {
          content: newContent,
          updated: new Date(),
          author: that.props.me,
        },
        editing: false,
      }));
    };
  }
}

export default NotesCard;
