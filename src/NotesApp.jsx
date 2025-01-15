import React from 'react';
import NotesList from './components/NoteList.jsx';
import { getAllNotes } from './utils/local-data.js';
import NoteInput from './components/NoteInput.jsx';


class NotesApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getAllNotes(),
    }

    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
  }
}

export default NotesApp;