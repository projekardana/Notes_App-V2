import React from 'react';
import Navigation from '../components/Navigation';
import NoteList from '../components/NoteList';
import { getAllNotes } from '../utils/local-data';
import { Link } from 'react-router-dom';
import { node } from 'prop-types';

class ArchivedPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getAllNotes().filter((note) => note.archived === true),
      searchQuery: '',
    };

    this.onSearchChangeHandler = this.onSearchChangeHandler.bind(this);
    this.onArchivedHandler = this.onArchivedHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
  }

  onSearchChangeHandler(event) {
    this.setState({ searchQuery: event.target.value });
  }

  onArchivedHandler(id) {
    archiveNote(id);

    // Arahkan ke Halaman ArchivedPage setelah mengarsipkan catatan
    navigate('/arsives');
  }

  onDeleteHandler(id) {
    deleteNote(id);
    // Arahkan ke Halaman HomePage setelah menghapus catatan
    navigate('/');
  }

  render() {
    const { searchQuery, notes } = this.state;

    const filteredArchiveNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="app-container">
        <header className="notes-app__header">
          <h1>
            <Link to={'/'}>Aplikasi Catatan</Link>
          </h1>
          <Navigation />
        </header>
        <main>
          <div className="search-bar">
            <h2>Catatan Arsip</h2>
            <input
              type="text"
              placeholder="Cari berdasarkan judul..."
              value={searchQuery}
              onChange={this.onSearchChangeHandler}
            />
          </div>
          {filteredArchiveNotes.length > 0 ? (
            <NoteList
              notes={filteredArchiveNotes}
              status={true}
              onArchive={this.onArchivedHandler}
              onDelete={this.onDeleteHandler}
            />
          ) : (
            <div className="notes-list-empty">
              <p>Tidak ada Catatan yang ditemukan</p>
            </div>
          )}
        </main>
      </div>
    );
  }
}

export default ArchivedPage;
