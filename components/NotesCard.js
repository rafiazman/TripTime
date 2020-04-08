/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import styles from '../css/note.module.css';
import TimeAgo from 'react-timeago/lib';

class NotesCard extends React.Component {
  render() {
    const notes = this.props.notes;
    return (
      <div className={styles.notesCard}>
        {notes.length < 1 ? (
          <div className={styles.noNote}>
            Nobody added notes to this activity yet...
          </div>
        ) : (
          notes.map((note, index) => <OneNote key={index} note={note} />)
        )}
        <AddNote />
      </div>
    );
  }
}

NotesCard.propTypes = {
  notes: PropTypes.array.isRequired,
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

class AddNote extends React.Component {
  render() {
    return (
      <div>
        <form className={styles.addNoteField}>
          <textarea
            rows={3}
            className={styles.noteInput}
            placeholder='Enter your note to friends here'
          />
          <button type='submit' className={styles.addNoteButton}>
            Add Note
          </button>
        </form>
      </div>
    );
  }
}

export default NotesCard;
