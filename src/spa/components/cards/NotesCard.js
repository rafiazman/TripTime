/** @format */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../../css/note.module.css';
import TimeAgo from 'react-timeago/lib';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '../Tooltip';
import axios from 'axios';

export default class NotesCard extends React.Component {
  render() {
    const notes = this.props.notes;
    const onMap = this.props.onMap;

    const myNote = notes.find(note => note.author.id === this.props.me.id);
    const otherNotes = notes.filter(x => x.author.id !== this.props.me.id);

    if (onMap) {
      return (
        <div className={styles.notesOnMap}>
          {otherNotes.length < 1 ? (
            <div className={styles.noNote}>
              Your friends have not added notes to this activity yet...
            </div>
          ) : (
            <div className={styles.friendNotes}>
              {otherNotes.map((note, i) => (
                <OneNote key={i} note={note} />
              ))}
            </div>
          )}
          <MyNote note={myNote} me={this.props.me} type={this.props.type} />
        </div>
      );
    } else {
      return (
        <div className={styles.notesCard}>
          {otherNotes.length < 1 ? (
            <div className={styles.noNote}>
              Your friends have not added notes to this activity yet...
            </div>
          ) : (
            <div className={styles.friendNotes}>
              {otherNotes.map((note, i) => (
                <OneNote key={i} note={note} />
              ))}
            </div>
          )}
          <MyNote note={myNote} me={this.props.me} type={this.props.type} />
        </div>
      );
    }
  }
}

NotesCard.propTypes = {
  notes: PropTypes.array.isRequired,
  me: PropTypes.object.isRequired,
  onMap: PropTypes.bool,
  type: PropTypes.object,
};

class OneNote extends React.Component {
  render() {
    const note = this.props.note;

    return (
      <div className={styles.oneNote}>
        <div className={styles.authorField}>
          <img
            className='inline-avatar'
            src={note.author.avatarPath}
            alt={note.author.name}
          />
          <span style={{ margin: '0 10px' }}>{note.author.name}</span>
          <TimeAgo
            date={note.updated}
            minPeriod={10}
            className={styles.timeUpdated}
          />
          :
        </div>

        <div style={{ margin: '10px 0' }}>{note.content}</div>
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
        {props.noteContent ? (
          <button
            className={styles.addNoteButton}
            onClick={() => props.onCancel()}
          >
            Cancel
          </button>
        ) : null}
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
  onCancel: PropTypes.func,
};

class MyNote extends React.Component {
  static propTypes = {
    note: PropTypes.object,
    me: PropTypes.object.isRequired,
    type: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = { myNote: this.props.note, editing: false };
  }

  componentDidMount() {
    axios.defaults.withCredentials = true;
  }

  render() {
    if (!this.state.myNote || this.state.editing)
      return (
        <EditNote
          noteContent={this.state.myNote ? this.state.myNote.content : ''}
          noteHandler={this.updateMyNote}
          onCancel={() => this.startEditing()}
        />
      );
    else
      return (
        <div className={styles.myNoteContainer} style={{ marginLeft: '5px' }}>
          <div className='note-user-detail' style={{ marginTop: '5px' }}>
            <img
              className='inline-avatar'
              src={this.props.me.avatarPath}
              alt={this.props.me.name}
            />
            <span style={{ margin: '5px 10px' }}>You</span>
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
          </div>

          <div style={{ margin: '10px 0' }}>{this.state.myNote.content}</div>
        </div>
      );
  }

  startEditing() {
    this.setState(() => ({ editing: !this.state.editing }));
  }

  updateMyNote = newContent => {
    const vm = this;
    const type = this.props.type.name;
    const id = this.props.type.id;

    axios
      .post(`${process.env.API_HOSTNAME}/api/${type}/${id}/notes`, {
        content: newContent,
      })
      .then(({ data }) => {
        vm.setState(() => ({
          myNote: {
            content: data.note.content,
            updated: data.note.updated,
            author: data.note.author,
          },
          editing: false,
        }));
      })
      .catch(() => {
        alert('Error: Failed to update note.');
      });
  };
}
