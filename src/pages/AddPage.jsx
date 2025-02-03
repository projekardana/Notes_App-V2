import React from 'react';
import { addNote } from '../utils/api.js';
import NoteInput from '../components/NoteInput';
import { useNavigate } from 'react-router-dom';

function AddPage() {
  const navigate = useNavigate();

  async function onAddNoteHandler(notes) {
    await addNote(notes);
    navigate('/');
  }

  return (
    <section>
      <NoteInput addNote={onAddNoteHandler} />;
    </section>
  );
}

export default AddPage;
