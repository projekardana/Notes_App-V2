import React from 'react';
import NoteList from '../components/NoteList';
import Navigation from '../components/Navigation';
import { getAllNotes } from '../utils/local-data';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      searchQuery: '',
    };

    this.onAddNoteChangeHandler = this.onAddNoteChangeHandler.bind(this);
    this.onSearchChangeHandler = this.onSearchChangeHandler.bind(this);
    this.onArchivedHandler = this.onArchivedHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
  }

  onAddNoteChangeHandler(newNote) {
    this.setState((prevState) => ({
      notes: [...prevState.notes, newNote],
    }));
  }

  onSearchChangeHandler(event) {
    this.setState({ searchQuery: event.target.value });
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

  render() {
    // Filter notes berdasarkan searchQuery
    const filteredActiveNotes = Array.isArray(this.state.notes)
      ? this.state.notes.filter(
          (note) =>
            !note.archived &&
            note.title
              .toLowerCase()
              .includes(this.state.searchQuery.toLowerCase())
        )
      : [];

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
            <h2>Catatan Aktif</h2>
            <input
              type="text"
              placeholder="Cari berdasarkan judul..."
              value={this.state.searchQuery}
              onChange={this.onSearchChangeHandler}
            />
          </div>
          {filteredActiveNotes.length > 0 ? (
            <NoteList
              notes={filteredActiveNotes}
              status={false}
              onArchive={this.onArchivedHandler}
              onDelete={this.onDeleteHandler}
            />
          ) : (
            <p>Tidak ada Catatan Aktif yang ditemukan</p>
          )}
        </main>
        <div className="homepage__action">
          <Link to="/add">
            <button className="action" type="button" title="Tambah">
              <FiPlus />
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default HomePage;
