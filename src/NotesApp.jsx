import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import DetailPageWrapper from './pages/DetailPage.jsx';
import NoteInput from './components/NoteInput.jsx';

class NotesApp extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<NoteInput addNote={addNote} />} />
        {/* <Route path='/arsives' element={<ArcivePage />} /> */}
        <Route path="/detail/:id" element={<DetailPageWrapper />} />
      </Routes>
    );
  }
}

export default NotesApp;
