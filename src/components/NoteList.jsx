import React from "react";
import NoteItem from "./NoteItem";
import { showFormattedDate } from '../utils/index';

function NoteList ({ notes, onDelete, onArchive, status  }) {
    const filtered = notes.filter((note) => note.archived === status );

    return (
        <div className="note-list">
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

export default NoteList;