import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import NoteList from '../components/NoteList';
import { archiveNote, deleteNote, getAllNotes } from '../utils/local-data';
import { Link } from 'react-router-dom';
import { node } from 'prop-types';
import PropTypes from 'prop-types';
import SearchBar from '../components/SearchBar';

function ArchivedPageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get('keyword');

  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return (
    <ArchivedPage defaultKeyword={keyword} keywordChange={changeSearchParams} />
  );
}

class ArchivedPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getAllNotes(),
      keyword: props.defaultKeyword || '',
    };

    this.onSearchChangeHandler = this.onSearchChangeHandler.bind(this);
    this.onArchivedHandler = this.onArchivedHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
  }

  onSearchChangeHandler(keyword) {
    this.setState(() => {
      return {
        keyword,
      };
    });

    this.props.keywordChange(keyword);
  }

  onArchivedHandler(id) {
    archiveNote(props.id);
  }

  onDeleteHandler(id) {
    deleteNote(props.id);
  }

  render() {
    const filteredArchiveNotes = this.state.notes.filter(
      (note) =>
        note.archived === true &&
        note.title.toLowerCase().includes(this.state.keyword.toLowerCase())
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
            <SearchBar
              type="text"
              placeholder="Cari berdasarkan judul..."
              keyword={this.state.keyword}
              keywordChange={this.onSearchChangeHandler}
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

ArchivedPage.propTypes = {
  id: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
  defaultKeyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
};

export default ArchivedPageWrapper;
