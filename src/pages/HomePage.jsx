import React from 'react';
import { useSearchParams } from 'react-router-dom';
import NoteList from '../components/NoteList';
import Navigation from '../components/Navigation';
import { getAllNotes } from '../utils/local-data';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import SearchBar from '../components/SearchBar';

function HomePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get('keyword');

  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return (
    <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
  );
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getAllNotes(),
      keyword: props.defaultKeyword || '',
    };

    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onSearchChangeHandler = this.onSearchChangeHandler.bind(this);
    this.onArchivedHandler = this.onArchivedHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
  }

  onAddNoteHandler({ title, body }) {
    this.setState((prevState) => {
      return {
        notes: [
          ...prevState.notes,
          {
            id: +new Date(),
            title,
            body,
            createdAt: new Date().toLocaleDateString(),
            archived: false,
          },
        ],
      };
    });
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
    archiveNote(id);
  }

  onDeleteHandler(id) {
    deleteNote(id);
  }

  render() {
    const filteredActiveNotes = this.state.notes.filter((note) =>
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
            <h2>Catatan Aktif</h2>
            <SearchBar
              type="text"
              placeholder="Cari berdasarkan judul..."
              keyword={this.state.keyword}
              keywordChange={this.onSearchChangeHandler}
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
            <div className="notes-list-empty">
              <p>Tidak ada Catatan Aktif yang ditemukan</p>
            </div>
          )}
        </main>
        <div className="homepage__action">
          <Link to="/add">
            <button className="action" type="btn" title="Tambah">
              <FiPlus />
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default HomePageWrapper;
