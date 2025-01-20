import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation.jsx';
import NoteList from './components/NoteList.jsx';
import NoteItem from './components/NoteItem.jsx';
import { getAllNotes } from './utils/local-data.js';
import HomePage from './pages/HomePage.jsx';
import AddPage from './pages/AddPage.jsx';
import { Link } from 'react-router-dom';
import DetailPageWrapper from './pages/DetailPage.jsx';


class NotesApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getAllNotes(),
      searchQuery: '',
    };

    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onArchivedHandler = this.onArchivedHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onSearchChangeHandler = this.onSearchChangeHandler.bind(this);
  }

  onAddNoteHandler({title, body}) {
    this.setState((prevState) => {
      return {
        notes: [
          ...prevState.notes,
          {
            id: +new Date(),
            title,
            body,
            createdAt: new Date().toISOString(),
            archived: false,
          },
        ],
      };
    });
  }

  onArchivedHandler(id) {
    this.setState((prevState) => ({
      notes: prevState.notes.map((note) => 
        note.id === id ? { ...note, archived: !note.archived } : note
      ),
    }));
  }

  onDeleteHandler(id) {
    this.setState((prevState) => ({
      notes: prevState.notes.filter((note) => note.id !== id),
    }));
  }

  onSearchChangeHandler(event) {
    this.setState({ searchQuery: event.target.value });
  }

  render () {
    const filteredActiveNotes = this.state.notes.filter((note) => 
      note.title.toLowerCase().includes(this.state.searchQuery.toLowerCase())
    );

    return (
      <div className="app-container">
        <header className="notes-app__header">
          <h1><Link to="/">Aplikasi Kontak</Link></h1>
          <Navigation />
        </header>
        <main>
          <div className="search-bar">
            <h2>Catatan Aktif</h2>
            <HomePage />
          </div>
          {this.state.notes.filter((note) => !note.archived).length > 0 ? (
            <NoteList
            notes={filteredActiveNotes}
            status={false}
            onArchive={this.onArchivedHandler}
            onDelete={this.onDeleteHandler}
            />
          ) : (
            <div className="notes-list__empty">Tidak Ada Catatan.</div>
          )}
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/add' element={<AddPage />} />
            {/* <Route path='/arsives' element={<ArcivePage />} /> */}
            <Route path='/Detail/:id' element={<DetailPageWrapper />} />
          </Routes>
        </main>
      </div>
    );
  }
}

export default NotesApp;