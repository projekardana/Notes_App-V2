import React from 'react';
import NoteItem from './NoteItem';
import { showFormattedDate } from '../utils/index';
import PropTypes from 'prop-types';

function NoteList({ notes, onDelete, onArchived, status }) {
  const filtered = notes.filter((note) => note.archived === status);

  return (
    <div className="notes-list">
      {filtered.map(
        (note) =>
          note.archived === status && (
            <NoteItem
              key={note.id}
              onDelete={onDelete}
              onArchived={onArchived}
              createdAt={showFormattedDate(note.createdAt)}
              {...note}
            />
          )
      )}
    </div>
  );
}

NoteList.PropTypes = {
  notes: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchived: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

export default NoteList;
