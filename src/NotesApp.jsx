import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import DetailPageWrapper from './pages/DetailPage.jsx';
import AddPage from './pages/AddPage.jsx';
import ArchivedPage from './pages/ArchivedPage.jsx';

class NotesApp extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/arsive" element={<ArchivedPage />} />
        <Route path="/detail/:id" element={<DetailPageWrapper />} />
      </Routes>
    );
  }
}

export default NotesApp;
