import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddPage from './pages/AddPage.jsx';
import DetailPageWrapper from './pages/DetailPage.jsx';
import NoteFoundPage from './pages/NoteFoundPage.jsx';
import HomePageWrapper from './pages/HomePage.jsx';
import ArchivedPageWrapper from './pages/ArchivedPage.jsx';

class NotesApp extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<HomePageWrapper />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/arsives" element={<ArchivedPageWrapper />} />
        <Route path="/detail/:id" element={<DetailPageWrapper />} />
        <Route path="*" element={<NoteFoundPage />} />
      </Routes>
    );
  }
}

export default NotesApp;
