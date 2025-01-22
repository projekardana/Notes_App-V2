import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../utils/local-data';
import NoteInput from '../components/NoteInput';
import { FaPlus } from 'react-icons/fa';

function AddPage() {
  const navigate = useNavigate();
  async function onAddNoteHandler(notes) {
    await addNote(notes);
    navigate('/');
  }

  return (
    <section>
      <button>
        <FaPlus />
        <NoteInput addNote={onAddNoteHandler} />
      </button>
    </section>
  );
}

export default AddPage;
