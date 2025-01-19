import React from "react";
import NoteItem from "./NoteItem";
import { showFormattedDate } from '../utils/index';
import PropTypes from "prop-types";

function NoteList ({ notes, onDelete, onArchive, status  }) {
    const filtered = notes.filter((note) => note.archived === status );

    return (
        <div className="notes-list">
            {filtered.map(
                (note) => 
                    note.archived == status && (
                        <NoteItem 
                        key={note.id}
                        onDelete={onDelete}
                        onArchive={onArchive}
                        createdAt={showFormattedDate(note.createdAt)}
                        {...note}
                        />
                    )
            )}
        </div>
    );
}

NoteList.propTypes = {
    notes: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onArchive: PropTypes.func.isRequired,
    status: PropTypes.bool.isRequired,
}

export default NoteList;