import React from 'react';
import NoteItem from './NoteItem';
import { showFormattedDate } from '../utils/index';
import PropTypes from 'prop-types';
import { deleteNote, archiveNote } from '../utils/local-data';

function NoteList({ notes, deleteNote, archiveNote, status }) {
  const filtered = notes.filter((note) => note.archived === status);

  return (
    <div className="notes-list">
      {filtered.map(
        (note) =>
          note.archived === status && (
            <NoteItem
              key={note.id}
              deleteNote={deleteNote}
              archiveNote={archiveNote}
              createdAt={showFormattedDate(note.createdAt)}
              {...note}
            />
          )
      )}
    </div>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteNote: PropTypes.func,
  archiveNote: PropTypes.func,
  status: PropTypes.bool.isRequired,
};

export default NoteList;
