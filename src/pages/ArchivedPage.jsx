import React from 'react';
import Navigation from '../components/Navigation';
import NoteList from '../components/NoteList';
import { Link } from 'react-router-dom';

class ArchivedPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      searchQuery: '',
    };

    this.onSearchHandler = this.onSearchChangeHandler.bind(this);
    this.onArchivedHandler = this.onArchivedHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
  }

  onSearchChangeHandler(event) {
    this.setState({ searchQuery: event.target.value });
  }
  onArchivedHandler(id) {
    this.setState((prevState) => ({
      prevState: prevState.notes.map((note) =>
        note.id === id ? (note.archived = !note.archived) : note
      ),
    }));
  }

  onDeleteHandler(id) {
    const notes = this.state.notes.filter((note) => note.id !== id);
    this.setState({ notes });
  }

  render() {
    const filteredArchiveNotes = this.state.notes.filter((note) =>
      note.title.toLowerCase().includes(this.state.searchQuery.toLowerCase())
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
            <h2>Catatan Aktif</h2>
            <input
              type="text"
              placeholder="Cari berdasarkan judul..."
              value={this.state.searchQuery}
              onChange={this.onSearchChangeHandler}
            />
          </div>
          {filteredArchiveNotes.length > 0 ? (
            <NoteList
              notes={filteredArchiveNotes}
              status={false}
              onArchive={this.onArchivedHandler}
              onDelete={this.onDeleteHandler}
            />
          ) : (
            <p>Tidak ada Catatan Aktif yang ditemukan</p>
          )}
        </main>
      </div>
    );
  }
}

export default ArchivedPage;
