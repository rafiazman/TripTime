/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import styles from '../css/note.module.css';

function NotesCard({ notes }) {
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

NotesCard.propTypes = {
  notes: PropTypes.array.isRequired,
};

function OneNote({ note }) {
  return (
    <div className={styles.oneNote}>
      <div className={styles.authorField}>
        <img className='inline-avatar' src={note.authorAvatarPath} alt='' />
        <span>{note.authorName}:</span>
      </div>
      <div className={styles.contentFiled}>
        <p>{note.content}</p>
      </div>
    </div>
  );
}

OneNote.propTypes = {
  note: PropTypes.object.isRequired,
};

function AddNote() {
  return (
    <div>
      <form>
        <textarea
          className={styles.noteInput}
          placeholder='Enter your note to friends here'
        />
        <button type='submit'>Add note</button>
      </form>
    </div>
  );
}
export default NotesCard;
